<?php

declare(strict_types=1);

/**
 * Rafiq Asset Delivery API - Security Helper
 *
 * Sanitizes user input to prevent injection and XSS.
 * Never exposes internal filesystem paths to clients.
 *
 * @package Rafiq\Api\Helpers
 */
final class Security
{
    /**
     * Sanitize a search query string.
     *
     * @param string $query Raw search input.
     * @return string Sanitized query safe for metadata matching.
     */
    public static function sanitizeSearchQuery(string $query): string
    {
        $query = trim($query);
        $query = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F]/', '', $query);
        $query = strip_tags($query);
        $query = htmlspecialchars($query, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

        return $query;
    }
}
