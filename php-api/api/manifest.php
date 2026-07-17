<?php

declare(strict_types=1);

/**
 * Rafiq Asset Delivery API - Manifest Endpoint
 *
 * GET /api/manifest
 *
 * Returns the complete asset manifest.json.
 * Flutter downloads this only when manifest_version changes.
 * The manifest contains every downloadable asset with checksums and URLs.
 *
 * @package Rafiq\Api\Endpoints
 */

require_once dirname(__DIR__) . '/config/bootstrap.php';
require_once dirname(__DIR__) . '/helpers/Response.php';
require_once dirname(__DIR__) . '/helpers/Cache.php';
require_once dirname(__DIR__) . '/helpers/Manifest.php';

$manifestPath = $config['quran_path'] . '/manifest.json';
$manifest = Manifest::load($manifestPath);

$etagKey = $config['manifest_version'] . '-' . ($manifest['generated_at'] ?? '');
$isNotModified = Cache::applyVersionEtag($etagKey);

if ($isNotModified) {
    Response::notModified();
}

header('Cache-Control: ' . $config['cache_manifest']);

Response::success($manifest);
