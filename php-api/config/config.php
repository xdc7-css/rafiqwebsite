<?php

declare(strict_types=1);

/**
 * Rafiq Asset Delivery API - Configuration
 *
 * Central configuration for all API settings.
 * Edit values below to match your deployment.
 *
 * @package Rafiq\Api\Config
 */
return [

    // ─── API Meta ───────────────────────────────────────────
    'api_version'           => '1.0.0',
    'quran_version'         => '1.0.0',
    'manifest_version'      => '1.0.0',
    'latest_app_version'    => '1.0.0',
    'maintenance_mode'      => false,
    'maintenance_message'   => 'Service temporarily unavailable for maintenance.',

    // ─── Paths ──────────────────────────────────────────────
    'base_url'              => 'https://rafiqart.tech',
    'root_path'             => dirname(__DIR__),
    'quran_path'            => dirname(__DIR__) . '/quran',
    'meta_path'             => dirname(__DIR__) . '/quran/meta',
    'svg_path'              => dirname(__DIR__) . '/public/assets/svg',
    'json_path'             => dirname(__DIR__) . '/public/assets/json',

    // ─── Quran Limits ───────────────────────────────────────
    'total_surahs'          => 114,
    'total_pages'           => 604,
    'total_juz'             => 30,

    // ─── Cache Settings ─────────────────────────────────────
    'cache_manifest'        => 'public, max-age=3600, must-revalidate',

    // ─── Search Settings ────────────────────────────────────
    'search_min_length'     => 2,
    'search_max_length'     => 100,
    'search_max_results'    => 50,

    // ─── Security ───────────────────────────────────────────
    'allow_cross_origin'    => '*',
];
