<?php

declare(strict_types=1);

/**
 * Rafiq Asset Delivery API - Response Helper
 *
 * Centralized JSON response handling for all API endpoints.
 * Ensures consistent response envelope across the entire API.
 *
 * @package Rafiq\Api\Helpers
 */
final class Response
{
    /**
     * Send a successful JSON response.
     *
     * @param mixed  $data    Response payload.
     * @param int    $status  HTTP status code.
     * @param string $message Optional human-readable message.
     * @return never
     */
    public static function success(mixed $data, int $status = 200, ?string $message = null): never
    {
        $body = [
            'success' => true,
            'data'    => $data,
        ];

        if ($message !== null) {
            $body['message'] = $message;
        }

        self::send($body, $status);
    }

    /**
     * Send an error JSON response.
     *
     * @param string $message Error description (safe for clients).
     * @param int    $status  HTTP status code.
     * @param string $code    Application-level error code.
     * @return never
     */
    public static function error(string $message, int $status = 400, string $code = 'ERROR'): never
    {
        $body = [
            'success' => false,
            'error'   => [
                'code'    => $code,
                'message' => $message,
            ],
        ];

        self::send($body, $status);
    }

    /**
     * Send a 304 Not Modified response with empty body.
     *
     * @return never
     */
    public static function notModified(): never
    {
        http_response_code(304);
        header('Content-Length: 0');
        exit;
    }

    /**
     * Send the final JSON response.
     *
     * @param array $body   Encoded response body.
     * @param int   $status HTTP status code.
     * @return never
     */
    private static function send(array $body, int $status): never
    {
        http_response_code($status);
        echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR);
        exit;
    }
}
