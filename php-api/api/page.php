<?php

declare(strict_types=1);

/**
 * Rafiq Asset Delivery API - Page Endpoint
 *
 * GET /api/page?id={page_number}
 *
 * Returns metadata for a specific Mushaf page:
 * - Which surahs appear on this page
 * - Which surahs start on this page
 * - Juz number
 * - SVG and JSON asset metadata with checksums and URLs
 *
 * Never returns SVG or JSON page content. Only metadata.
 *
 * @package Rafiq\Api\Endpoints
 */

require_once dirname(__DIR__) . '/config/bootstrap.php';
require_once dirname(__DIR__) . '/helpers/Response.php';
require_once dirname(__DIR__) . '/helpers/Validator.php';
require_once dirname(__DIR__) . '/helpers/File.php';
require_once dirname(__DIR__) . '/helpers/Manifest.php';

$pageNumber = Validator::requireInt('id', 1, $config['total_pages']);

$surahsPath = $config['meta_path'] . '/surahs.json';
$surahs = File::readJson($surahsPath);

$pageSurahs = [];
$surahsStartingHere = [];

foreach ($surahs as $surah) {
    $startPage = (int) $surah['start_page'];
    $endPage   = (int) $surah['end_page'];

    if ($pageNumber >= $startPage && $pageNumber <= $endPage) {
        $pageSurahs[] = [
            'number'       => (int) $surah['number'],
            'name'         => $surah['name'],
            'arabic_name'  => $surah['name'],
            'english_name' => $surah['english_name'],
            'start_page'   => $startPage,
            'end_page'     => $endPage,
        ];
    }

    if ($startPage === $pageNumber) {
        $surahsStartingHere[] = [
            'number'       => (int) $surah['number'],
            'name'         => $surah['name'],
            'arabic_name'  => $surah['name'],
            'english_name' => $surah['english_name'],
        ];
    }
}

$juzNumber = File::resolveJuz($pageNumber, $config['meta_path'] . '/juz.json');

$manifestPath = $config['quran_path'] . '/manifest.json';
Manifest::load($manifestPath);

$pageAssets = Manifest::getAssetsForPage($pageNumber);

$svgMeta = null;
$jsonMeta = null;
$totalSize = 0;

if (isset($pageAssets['svg'])) {
    $a = $pageAssets['svg'];
    $svgMeta = [
        'filename'      => $a['filename'],
        'size'          => $a['size'],
        'size_human'    => File::humanSize((int) $a['size']),
        'etag'          => $a['etag'],
        'sha256'        => $a['sha256'],
        'last_modified' => $a['last_modified'],
        'url'           => $a['url'],
    ];
    $totalSize += (int) $a['size'];
}

if (isset($pageAssets['json'])) {
    $a = $pageAssets['json'];
    $jsonMeta = [
        'filename'      => $a['filename'],
        'size'          => $a['size'],
        'size_human'    => File::humanSize((int) $a['size']),
        'etag'          => $a['etag'],
        'sha256'        => $a['sha256'],
        'last_modified' => $a['last_modified'],
        'url'           => $a['url'],
    ];
    $totalSize += (int) $a['size'];
}

if ($svgMeta === null && $jsonMeta === null) {
    Response::error('Page not found.', 404, 'NOT_FOUND');
}

Response::success([
    'page_number'          => $pageNumber,
    'juz'                  => $juzNumber,
    'surahs'               => $pageSurahs,
    'surahs_starting_here' => $surahsStartingHere,
    'svg'                  => $svgMeta,
    'json'                 => $jsonMeta,
    'total_size'           => $totalSize,
    'total_size_human'     => File::humanSize($totalSize),
]);
