<?php

declare(strict_types=1);

/**
 * Rafiq Asset Delivery API - Manifest Helper
 *
 * Loads the pre-built manifest.json, provides in-memory caching,
 * and builds an O(1) asset index keyed by page ID.
 *
 * @package Rafiq\Api\Helpers
 */
final class Manifest
{
    /** @var array|null In-memory cache for the current request. */
    private static ?array $cache = null;

    /**
     * Load the manifest from disk with in-memory caching.
     *
     * @param string $manifestPath Absolute path to manifest.json.
     * @return array Complete manifest data.
     */
    public static function load(string $manifestPath): array
    {
        if (self::$cache !== null) {
            return self::$cache;
        }

        if (!is_file($manifestPath)) {
            Response::error('Manifest not found. Run setup script.', 500, 'MANIFEST_MISSING');
        }

        $raw = file_get_contents($manifestPath);

        if ($raw === false) {
            Response::error('Unable to read manifest.', 500, 'INTERNAL_ERROR');
        }

        $data = json_decode($raw, true, 512, JSON_THROW_ON_ERROR);

        if (!is_array($data) || !isset($data['assets'])) {
            Response::error('Manifest is corrupted.', 500, 'CORRUPT_MANIFEST');
        }

        self::$cache = $data;
        self::buildIndex();

        return self::$cache;
    }

    /**
     * Get asset metadata for a specific page ID.
     *
     * Returns ['svg' => [...], 'json' => [...]] for the given page.
     * O(1) lookup via pre-built index.
     *
     * @param int $pageId Page number (1-604).
     * @return array Associative array keyed by asset type.
     */
    public static function getAssetsForPage(int $pageId): array
    {
        return self::$cache['assets_by_id'][$pageId] ?? [];
    }

    /**
     * Build the assets_by_id index from the flat assets array.
     *
     * Structure: $index[$pageId][$type] = $asset
     * Example:   $index[12]['svg'] = ['id' => 12, 'type' => 'svg', ...]
     */
    private static function buildIndex(): void
    {
        $index = [];

        foreach (self::$cache['assets'] as $asset) {
            $id = (int) $asset['id'];
            $index[$id][$asset['type']] = $asset;
        }

        self::$cache['assets_by_id'] = $index;
    }
}
