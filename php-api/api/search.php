<?php

declare(strict_types=1);

/**
 * Rafiq Asset Delivery API - Search Endpoint
 *
 * GET /api/search?q={query}
 *
 * Searches Quran metadata only:
 * - Surah names (Arabic and English)
 * - Surah meanings
 * - Returns matching surahs and related page numbers
 *
 * Never searches inside SVG or JSON asset content.
 *
 * @package Rafiq\Api\Endpoints
 */

require_once dirname(__DIR__) . '/config/bootstrap.php';
require_once dirname(__DIR__) . '/helpers/Response.php';
require_once dirname(__DIR__) . '/helpers/Validator.php';
require_once dirname(__DIR__) . '/helpers/Security.php';
require_once dirname(__DIR__) . '/helpers/File.php';

$query = Validator::requireString('q', $config['search_min_length'], $config['search_max_length']);
$query = Security::sanitizeSearchQuery($query);

$surahsPath = $config['meta_path'] . '/surahs.json';
$surahs = File::readJson($surahsPath);

$lowerQuery = mb_strtolower($query);
$maxResults = $config['search_max_results'];

$matchedSurahs = [];

$searchFields = ['name', 'english_name', 'meaning'];

foreach ($surahs as $surah) {
    $matched = false;
    $matchField = '';

    foreach ($searchFields as $field) {
        $value = mb_strtolower((string) ($surah[$field] ?? ''));

        if ($value !== '' && str_contains($value, $lowerQuery)) {
            $matched = true;
            $matchField = $field;
            break;
        }
    }

    if ($matched) {
        $matchedSurahs[] = [
            'number'          => (int) $surah['number'],
            'name'            => $surah['name'],
            'arabic_name'     => $surah['name'],
            'english_name'    => $surah['english_name'],
            'meaning'         => $surah['meaning'],
            'revelation_type' => $surah['revelation_type'],
            'total_ayahs'     => (int) $surah['total_ayahs'],
            'start_page'      => (int) $surah['start_page'],
            'end_page'        => (int) $surah['end_page'],
            'juz'             => (int) $surah['juz'],
            'matched_field'   => $matchField,
        ];

        if (count($matchedSurahs) >= $maxResults) {
            break;
        }
    }
}

$pageSet = [];
$relatedPages = [];

foreach ($matchedSurahs as $surah) {
    for ($p = $surah['start_page']; $p <= $surah['end_page']; $p++) {
        if (!isset($pageSet[$p])) {
            $pageSet[$p] = true;
            $relatedPages[] = $p;
        }
    }
}

sort($relatedPages, SORT_NUMERIC);

Response::success([
    'query'          => $query,
    'total_surahs'   => count($matchedSurahs),
    'total_pages'    => count($relatedPages),
    'matched_surahs' => $matchedSurahs,
    'related_pages'  => $relatedPages,
]);
