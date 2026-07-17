<?php

declare(strict_types=1);

/**
 * Rafiq Asset Delivery API - Validator
 *
 * Validates and sanitizes all incoming request parameters.
 * Prevents injection, malformed input, and out-of-range values.
 *
 * @package Rafiq\Api\Helpers
 */
final class Validator
{
    /**
     * Retrieve a validated integer query parameter.
     *
     * @param string $key Parameter name.
     * @param int    $min Minimum allowed value (inclusive).
     * @param int    $max Maximum allowed value (inclusive).
     * @return int Validated integer.
     */
    public static function requireInt(string $key, int $min = 1, int $max = PHP_INT_MAX): int
    {
        if (!isset($_GET[$key]) || $_GET[$key] === '') {
            Response::error("Missing required parameter: {$key}", 400, 'MISSING_PARAMETER');
        }

        $raw = trim($_GET[$key]);

        if (!preg_match('/^-?\d+$/', $raw)) {
            Response::error("Parameter '{$key}' must be an integer.", 400, 'INVALID_PARAMETER');
        }

        $value = (int) $raw;

        if ($value < $min || $value > $max) {
            Response::error(
                "Parameter '{$key}' must be between {$min} and {$max}.",
                400,
                'INVALID_PARAMETER'
            );
        }

        return $value;
    }

    /**
     * Retrieve a validated string query parameter.
     *
     * @param string $key       Parameter name.
     * @param int    $minLength Minimum character length.
     * @param int    $maxLength Maximum character length.
     * @return string Sanitized string.
     */
    public static function requireString(string $key, int $minLength = 1, int $maxLength = 255): string
    {
        if (!isset($_GET[$key]) || $_GET[$key] === '') {
            Response::error("Missing required parameter: {$key}", 400, 'MISSING_PARAMETER');
        }

        $value = trim($_GET[$key]);

        if (mb_strlen($value) < $minLength) {
            Response::error(
                "Parameter '{$key}' must be at least {$minLength} characters.",
                400,
                'INVALID_PARAMETER'
            );
        }

        if (mb_strlen($value) > $maxLength) {
            Response::error(
                "Parameter '{$key}' must not exceed {$maxLength} characters.",
                400,
                'INVALID_PARAMETER'
            );
        }

        return $value;
    }

    /**
     * Validate that a raw query parameter exists.
     *
     * @param string $key Parameter name.
     * @return string Trimmed value.
     */
    public static function requireParam(string $key): string
    {
        if (!isset($_GET[$key]) || $_GET[$key] === '') {
            Response::error("Missing required parameter: {$key}", 400, 'MISSING_PARAMETER');
        }

        return trim($_GET[$key]);
    }

    /**
     * Get an optional integer with a default fallback.
     *
     * @param string $key     Parameter name.
     * @param int    $default Fallback value.
     * @param int    $min     Minimum allowed.
     * @param int    $max     Maximum allowed.
     * @return int Validated value or default.
     */
    public static function optionalInt(string $key, int $default = 0, int $min = 0, int $max = PHP_INT_MAX): int
    {
        if (!isset($_GET[$key]) || $_GET[$key] === '') {
            return $default;
        }

        $raw = trim($_GET[$key]);

        if (!preg_match('/^\d+$/', $raw)) {
            return $default;
        }

        $value = (int) $raw;

        return ($value >= $min && $value <= $max) ? $value : $default;
    }

    /**
     * Get an optional string with a default fallback.
     *
     * @param string $key     Parameter name.
     * @param string $default Fallback value.
     * @return string Value or default.
     */
    public static function optionalString(string $key, string $default = ''): string
    {
        if (!isset($_GET[$key]) || $_GET[$key] === '') {
            return $default;
        }

        return trim($_GET[$key]);
    }
}
