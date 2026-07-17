<?php

declare(strict_types=1);

/**
 * Rafiq Asset Delivery API - Setup Script
 *
 * Run once after uploading to organize assets and build the manifest.
 *
 * Usage:  php scripts/setup.php
 *
 * What it does:
 *   1. Verifies directory structure
 *   2. Moves zero-padded SVGs (001.svg → 1.svg) into public/assets/svg/
 *   3. Generates pages.json from surahs.json + juz.json
 *   4. Builds manifest.json with SHA-256 hashes for all assets
 *
 * @package Rafiq\Api\Scripts
 */

echo "==============================================\n";
echo "  Rafiq API Setup Script v1.0.0\n";
echo "==============================================\n\n";

$root = dirname(__DIR__);
$config = require $root . '/config/config.php';

// ─── Step 1: Verify directories ──────────────────────────────
echo "[1/4] Verifying directory structure...\n";

$requiredDirs = [
    'api',
    'config',
    'helpers',
    'quran',
    'quran/meta',
    'public',
    'public/assets',
    'public/assets/svg',
    'public/assets/json',
    'scripts',
];

$allGood = true;
foreach ($requiredDirs as $dir) {
    $fullPath = $root . '/' . $dir;
    if (!is_dir($fullPath)) {
        mkdir($fullPath, 0755, true);
        echo "  Created: {$dir}/\n";
    } else {
        echo "  Exists:  {$dir}/\n";
    }
}

// ─── Step 2: Organize SVG files ──────────────────────────────
echo "\n[2/4] Organizing SVG files...\n";

$svgDest = $root . '/public/assets/svg';
$moved = 0;
$skipped = 0;

$rootSvgs = glob($root . '/[0-9][0-9][0-9].svg');

if (!empty($rootSvgs)) {
    foreach ($rootSvgs as $file) {
        $basename = basename($file);
        $base = pathinfo($basename, PATHINFO_FILENAME);
        $numericId = (int) $base;
        $destName = $numericId . '.svg';
        $dest = $svgDest . '/' . $destName;

        if (!is_file($dest)) {
            copy($file, $dest);
            $moved++;
        } else {
            $skipped++;
        }
    }
    echo "  Moved: {$moved} | Skipped: {$skipped}\n";
} else {
    $existing = glob($svgDest . '/*.svg');
    echo "  No root SVGs to move. Found " . count($existing) . " files in public/assets/svg/\n";
}

// ─── Step 3: Generate pages.json ─────────────────────────────
echo "\n[3/4] Generating pages.json...\n";

$surahs = json_decode(file_get_contents($root . '/quran/meta/surahs.json'), true);
$juzData = json_decode(file_get_contents($root . '/quran/meta/juz.json'), true);

$juzRanges = [];
foreach ($juzData as $juz) {
    $juzRanges[] = [
        'number' => (int) $juz['number'],
        'start'  => (int) $juz['start_page'],
        'end'    => (int) $juz['end_page'],
    ];
}

$pages = [];
for ($p = 1; $p <= 604; $p++) {
    $juzNumber = 1;
    foreach ($juzRanges as $jr) {
        if ($p >= $jr['start'] && $p <= $jr['end']) {
            $juzNumber = $jr['number'];
            break;
        }
    }

    $pageSurahs = [];
    $startingHere = [];

    foreach ($surahs as $surah) {
        $startPage = (int) $surah['start_page'];
        $endPage = (int) $surah['end_page'];

        if ($p >= $startPage && $p <= $endPage) {
            $pageSurahs[] = [
                'number'       => (int) $surah['number'],
                'name'         => $surah['name'],
                'english_name' => $surah['english_name'],
            ];
        }

        if ($startPage === $p) {
            $startingHere[] = [
                'number'       => (int) $surah['number'],
                'name'         => $surah['name'],
                'english_name' => $surah['english_name'],
            ];
        }
    }

    $pages[] = [
        'page'                  => $p,
        'juz'                   => $juzNumber,
        'surahs'                => $pageSurahs,
        'surahs_starting_here'  => $startingHere,
    ];
}

file_put_contents(
    $root . '/quran/meta/pages.json',
    json_encode($pages, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
);
echo "  Generated " . count($pages) . " page entries\n";

// ─── Step 4: Build manifest.json ─────────────────────────────
echo "\n[4/4] Building manifest.json...\n";

$baseUrl = $config['base_url'];
$assets = [];
$totalSize = 0;

$svgFiles = glob($svgDest . '/[0-9]*.svg');
usort($svgFiles, function (string $a, string $b): int {
    return (int) basename($a, '.svg') <=> (int) basename($b, '.svg');
});

foreach ($svgFiles as $file) {
    $id = (int) basename($file, '.svg');
    $hash = hash_file('sha256', $file);
    $mtime = filemtime($file);
    $size = filesize($file);

    $assets[] = [
        'id'            => $id,
        'type'          => 'svg',
        'filename'      => $id . '.svg',
        'url'           => $baseUrl . '/assets/svg/' . $id . '.svg',
        'size'          => $size,
        'etag'          => dechex($mtime) . '-' . dechex($size),
        'sha256'        => $hash,
        'last_modified' => gmdate('c', $mtime),
    ];

    $totalSize += $size;
}

$jsonDir = $root . '/public/assets/json';
if (is_dir($jsonDir)) {
    $jsonFiles = glob($jsonDir . '/[0-9]*.json');
    foreach ($jsonFiles as $file) {
        $id = (int) basename($file, '.json');
        $hash = hash_file('sha256', $file);
        $mtime = filemtime($file);
        $size = filesize($file);

        $assets[] = [
            'id'            => $id,
            'type'          => 'json',
            'filename'      => $id . '.json',
            'url'           => $baseUrl . '/assets/json/' . $id . '.json',
            'size'          => $size,
            'etag'          => dechex($mtime) . '-' . dechex($size),
            'sha256'        => $hash,
            'last_modified' => gmdate('c', $mtime),
        ];

        $totalSize += $size;
    }
}

usort($assets, static function (array $a, array $b): int {
    if ($a['id'] === $b['id']) {
        return strcmp($a['type'], $b['type']);
    }
    return $a['id'] <=> $b['id'];
});

$manifest = [
    'version'      => $config['manifest_version'],
    'generated_at' => gmdate('c'),
    'total_assets' => count($assets),
    'total_svg'    => count(array_filter($assets, static fn(array $a) => $a['type'] === 'svg')),
    'total_json'   => count(array_filter($assets, static fn(array $a) => $a['type'] === 'json')),
    'total_size'   => $totalSize,
    'assets'       => $assets,
];

file_put_contents(
    $root . '/quran/manifest.json',
    json_encode($manifest, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)
);

$humanSize = number_format($totalSize / 1024 / 1024, 2) . ' MB';
echo "  Built manifest: {$manifest['total_assets']} assets ({$humanSize})\n";

// ─── Summary ─────────────────────────────────────────────────
echo "\n==============================================\n";
echo "  Setup Complete!\n";
echo "==============================================\n\n";

echo "Summary:\n";
echo "  SVG assets:   {$manifest['total_svg']}\n";
echo "  JSON assets:  {$manifest['total_json']}\n";
echo "  Total size:   {$humanSize}\n";
echo "  Base URL:     {$config['base_url']}\n";
echo "  API version:  {$config['api_version']}\n\n";

echo "Deployment:\n";
echo "  1. Set document root to php-api/ directory\n";
echo "  2. Ensure mod_rewrite is enabled (Apache)\n";
echo "  3. Edit config/config.php if needed\n";
echo "  4. Test: {$config['base_url']}/api/health\n";
echo "  5. Test: {$config['base_url']}/api/manifest\n\n";
