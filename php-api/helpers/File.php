<?php

declare(strict_types=1);

/**
 * Rafiq Asset Delivery API - File Helper
 *
 * Safe file system operations with consistent error handling.
 * Never exposes internal filesystem paths to clients.
 *
 * @package Rafiq\Api\Helpers
 */
final class File
{
    /**
     * Read and decode a JSON file into an associative array.
     *
     * Uses static caching so each file is read from disk only once per request.
     *
     * @param string $path Absolute path to the JSON file.
     * @return array Decoded data.
     */
    public static function readJson(string $path): array
    {
        static $cache = [];

        if (isset($cache[$path])) {
            return $cache[$path];
        }

        if (!is_file($path)) {
            Response::error('Data file not found.', 500, 'INTERNAL_ERROR');
        }

        $content = file_get_contents($path);

        if ($content === false) {
            Response::error('Unable to read data file.', 500, 'INTERNAL_ERROR');
        }

        $data = json_decode($content, true, 512, JSON_THROW_ON_ERROR);

        if (!is_array($data)) {
            Response::error('Invalid data format.', 500, 'INTERNAL_ERROR');
        }

        $cache[$path] = $data;

        return $data;
    }

    /**
     * Format a byte count into a human-readable string.
     *
     * @param int $bytes File size in bytes.
     * @return string Formatted size (e.g., "42.1 KB").
     */
    public static function humanSize(int $bytes): string
    {
        if ($bytes <= 0) {
            return '0 B';
        }

        $units = ['B', 'KB', 'MB', 'GB'];
        $i = (int) floor(log($bytes, 1024));
        $i = min($i, count($units) - 1);

        return round($bytes / (1024 ** $i), 2) . ' ' . $units[$i];
    }

    /**
     * Resolve which Juz a page belongs to.
     *
     * Builds a page→juz lookup map on first call for O(1) access.
     *
     * @param int    $page   Page number (1-604).
     * @param string $juzPath Absolute path to juz.json.
     * @return int Juz number (1-30).
     */
    public static function resolveJuz(int $page, string $juzPath): int
    {
        static $pageMap = null;

        if ($pageMap === null) {
            $pageMap = [];
            $juzData = is_file($juzPath)
                ? json_decode(file_get_contents($juzPath), true)
                : [];

            foreach ($juzData as $juz) {
                $start = (int) $juz['start_page'];
                $end   = (int) $juz['end_page'];
                $num   = (int) $juz['number'];

                for ($p = $start; $p <= $end; $p++) {
                    $pageMap[$p] = $num;
                }
            }
        }

        return $pageMap[$page] ?? 1;
    }
}
