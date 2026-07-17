<?php

declare(strict_types=1);

/**
 * Rafiq Asset Delivery API - Surah Endpoint
 *
 * GET /api/surah?id={surah_number}
 *
 * Returns comprehensive metadata for a specific Surah:
 * - Arabic and English names, meaning, revelation type
 * - Page range and page list
 * - Juz mapping
 * - Estimated download size
 * - Per-page asset references with checksums
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

$surahNumber = Validator::requireInt('id', 1, $config['total_surahs']);

$surahsPath = $config['meta_path'] . '/surahs.json';
$surahs = File::readJson($surahsPath);

$surah = null;
foreach ($surahs as $entry) {
    if ((int) $entry['number'] === $surahNumber) {
        $surah = $entry;
        break;
    }
}

if ($surah === null) {
    Response::error('Surah not found.', 404, 'NOT_FOUND');
}

$manifestPath = $config['quran_path'] . '/manifest.json';
Manifest::load($manifestPath);

$pages = [];
$pageIds = [];
$totalSize = 0;
$juzPath = $config['meta_path'] . '/juz.json';

for ($p = (int) $surah['start_page']; $p <= (int) $surah['end_page']; $p++) {
    $pageIds[] = $p;
    $pageAssets = Manifest::getAssetsForPage($p);

    $svgMeta = null;
    $jsonMeta = null;

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
        $totalSize += (int) ($a['size'] ?? 0);
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
        $totalSize += (int) ($a['size'] ?? 0);
    }

    $pages[] = [
        'page_number' => $p,
        'juz'         => File::resolveJuz($p, $juzPath),
        'svg'         => $svgMeta,
        'json'        => $jsonMeta,
    ];
}

Response::success([
    'number'               => (int) $surah['number'],
    'name'                 => $surah['name'],
    'arabic_name'          => $surah['name'],
    'english_name'         => $surah['english_name'],
    'meaning'              => $surah['meaning'],
    'revelation_type'      => $surah['revelation_type'],
    'total_ayahs'          => (int) $surah['total_ayahs'],
    'start_page'           => (int) $surah['start_page'],
    'end_page'             => (int) $surah['end_page'],
    'total_pages'          => count($pageIds),
    'page_list'            => $pageIds,
    'juz'                  => (int) $surah['juz'],
    'estimated_size'       => $totalSize,
    'estimated_size_human' => File::humanSize($totalSize),
    'pages'                => $pages,
]);
