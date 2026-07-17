<?php

declare(strict_types=1);

/**
 * Rafiq Asset Delivery API - Cache Helper
 *
 * Handles HTTP caching via ETag for API responses.
 * Returns true when the client already has the current version.
 *
 * @package Rafiq\Api\Helpers
 */
final class Cache
{
    /**
     * Apply ETag headers for a JSON API response based on a version string.
     *
     * @param string $versionKey The version identifier to hash.
     * @return bool True if client cache is still valid.
     */
    public static function applyVersionEtag(string $versionKey): bool
    {
        $etag = '"' . md5($versionKey) . '"';

        header('ETag: ' . $etag);

        if (isset($_SERVER['HTTP_IF_NONE_MATCH'])) {
            if (trim($_SERVER['HTTP_IF_NONE_MATCH']) === $etag) {
                return true;
            }
        }

        return false;
    }
}
