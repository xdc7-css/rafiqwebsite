<?php

declare(strict_types=1);

/**
 * Rafiq Asset Delivery API - Bootstrap
 *
 * Initializes error handling, CORS, maintenance check, and loads configuration.
 * Every API endpoint must require this file as its first action.
 *
 * @package Rafiq\Api\Config
 */

error_reporting(E_ERROR | E_PARSE);
ini_set('display_errors', '0');
ini_set('log_errors', '1');
ini_set('error_log', sys_get_temp_dir() . '/rafiq_api_errors.log');

header_remove('X-Powered-By');

$config = require __DIR__ . '/config.php';

if ($config['maintenance_mode'] === true) {
    header('Content-Type: application/json; charset=utf-8');
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: DENY');
    header('Referrer-Policy: no-referrer');
    header('Cache-Control: no-store');
    http_response_code(503);
    header('Retry-After: 3600');
    echo json_encode([
        'success' => false,
        'error'   => [
            'code'    => 'MAINTENANCE',
            'message' => $config['maintenance_message'],
        ],
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET' && $_SERVER['REQUEST_METHOD'] !== 'OPTIONS') {
    header('Content-Type: application/json; charset=utf-8');
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: DENY');
    header('Referrer-Policy: no-referrer');
    header('Cache-Control: no-store');
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'error'   => [
            'code'    => 'METHOD_NOT_ALLOWED',
            'message' => 'Only GET method is accepted.',
        ],
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Referrer-Policy: no-referrer');
header('Strict-Transport-Security: max-age=63072000; includeSubDomains; preload');
header('Cache-Control: no-store');
header('Access-Control-Allow-Origin: ' . $config['allow_cross_origin']);
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, If-None-Match');
