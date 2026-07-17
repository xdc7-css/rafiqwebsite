<?php

declare(strict_types=1);

/**
 * Rafiq Asset Delivery API - Health Endpoint
 *
 * GET /api/health
 *
 * Lightweight health check for uptime monitoring, load balancers,
 * and client connectivity verification.
 *
 * @package Rafiq\Api\Endpoints
 */

require_once dirname(__DIR__) . '/config/bootstrap.php';
require_once dirname(__DIR__) . '/helpers/Response.php';

Response::success([
    'status'      => 'healthy',
    'api_version' => $config['api_version'],
    'timestamp'   => gmdate('c'),
]);
