<?php

declare(strict_types=1);

/**
 * Rafiq Asset Delivery API - Version Endpoint
 *
 * GET /api/version
 *
 * Returns all version identifiers the Flutter application needs
 * to determine whether a manifest refresh or app update is required.
 *
 * @package Rafiq\Api\Endpoints
 */

require_once dirname(__DIR__) . '/config/bootstrap.php';
require_once dirname(__DIR__) . '/helpers/Response.php';

Response::success([
    'api_version'        => $config['api_version'],
    'quran_version'      => $config['quran_version'],
    'manifest_version'   => $config['manifest_version'],
    'latest_app_version' => $config['latest_app_version'],
]);
