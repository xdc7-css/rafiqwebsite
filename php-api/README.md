# Rafiq Asset Delivery API

Production-grade, read-only REST API for delivering Quran assets to the Flutter application.

**PHP only returns metadata. Static assets are served directly by Apache.**

## Requirements

- PHP 8.2+
- Apache with mod_rewrite
- No frameworks, no composer, no database

## Architecture

```
Flutter App
    │
    ├── GET /api/version          → PHP returns JSON metadata
    ├── GET /api/manifest         → PHP returns manifest with checksums + URLs
    ├── GET /api/surah?id=2       → PHP returns surah metadata
    ├── GET /api/page?id=12       → PHP returns page metadata
    ├── GET /api/search?q=...     → PHP returns search results
    │
    ├── GET /assets/svg/12.svg    → Apache serves SVG directly (no PHP)
    └── GET /assets/json/12.json  → Apache serves JSON directly (no PHP)
```

**PHP never streams SVG or JSON file content.** PHP returns only metadata. Flutter downloads static assets directly from Apache.

## Quick Start

1. Upload `php-api/` to your server
2. Set document root to the `php-api/` directory
3. Ensure `mod_rewrite` is enabled
4. Run: `php scripts/setup.php`
5. Test: `GET /api/health`

## Directory Structure

```
php-api/
├── .htaccess                 # URL routing + compression + security
├── .gitignore                # Git ignore rules
├── LICENSE                   # MIT License
├── CHANGELOG.md              # Version history
├── api/                      # API endpoints (metadata only)
│   ├── health.php
│   ├── version.php
│   ├── manifest.php
│   ├── surah.php
│   ├── page.php
│   └── search.php
├── config/
│   ├── bootstrap.php         # Error handling, CORS, maintenance
│   └── config.php            # All configuration
├── helpers/
│   ├── Response.php          # JSON response handler
│   ├── Validator.php         # Input validation
│   ├── Security.php          # Input sanitization
│   ├── File.php              # Safe file operations + caching
│   ├── Cache.php             # ETag / 304 handling
│   └── Manifest.php          # Manifest loader + O(1) index
├── quran/
│   ├── manifest.json         # Pre-built asset manifest
│   └── meta/
│       ├── surahs.json       # 114 surah metadata
│       ├── pages.json        # 604 page metadata
│       └── juz.json          # 30 juz metadata
├── public/
│   └── assets/
│       ├── svg/              # 604 SVG page images (Apache serves directly)
│       └── json/             # 604 JSON page data (Apache serves directly)
├── scripts/
│   └── setup.php             # One-time setup script
└── README.md
```

## API Endpoints

### GET /api/health

```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "api_version": "1.0.0",
    "timestamp": "2026-07-18T00:00:00Z"
  }
}
```

### GET /api/version

```json
{
  "success": true,
  "data": {
    "api_version": "1.0.0",
    "quran_version": "1.0.0",
    "manifest_version": "1.0.0",
    "latest_app_version": "1.0.0"
  }
}
```

### GET /api/manifest

Returns the complete manifest with all downloadable assets.

```json
{
  "success": true,
  "data": {
    "version": "1.0.0",
    "generated_at": "2026-07-18T00:00:00Z",
    "total_assets": 604,
    "total_svg": 604,
    "total_json": 0,
    "total_size": 365054331,
    "assets": [
      {
        "id": 12,
        "type": "svg",
        "filename": "12.svg",
        "url": "https://rafiqart.tech/assets/svg/12.svg",
        "size": 42131,
        "etag": "82dba91-12345",
        "sha256": "ebdc753a...",
        "last_modified": "2026-07-17T18:00:00Z"
      }
    ]
  }
}
```

### GET /api/surah?id=2

```json
{
  "success": true,
  "data": {
    "number": 2,
    "name": "البقرة",
    "arabic_name": "البقرة",
    "english_name": "Al-Baqarah",
    "meaning": "The Cow",
    "revelation_type": "Medinan",
    "total_ayahs": 286,
    "start_page": 2,
    "end_page": 49,
    "total_pages": 48,
    "page_list": [2, 3, 4, 49],
    "juz": 1,
    "estimated_size": 15728640,
    "estimated_size_human": "15 MB",
    "pages": [
      {
        "page_number": 2,
        "juz": 1,
        "svg": { "filename": "2.svg", "size": 196289, "url": "...", "sha256": "..." },
        "json": null
      }
    ]
  }
}
```

### GET /api/page?id=12

```json
{
  "success": true,
  "data": {
    "page_number": 12,
    "juz": 1,
    "surahs": [{ "number": 2, "name": "البقرة", "arabic_name": "البقرة", "english_name": "Al-Baqarah" }],
    "surahs_starting_here": [],
    "svg": { "filename": "12.svg", "size": 42131, "url": "...", "sha256": "..." },
    "json": null,
    "total_size": 42131,
    "total_size_human": "41.14 KB"
  }
}
```

### GET /api/search?q=رحمن

Searches surah metadata only (names, meanings).

## Flutter Download Flow

```
APP START
    │
    ├── GET /api/version
    │   └── Compare manifest_version with local
    │
    ├── If changed → GET /api/manifest
    │   └── Store manifest locally
    │
    ├── User opens Surah → GET /api/surah?id=X
    │   └── Get page_list + per-page checksums
    │
    ├── For each page in page_list:
    │   ├── Check local cache (by SHA-256)
    │   └── Download only if missing from /assets/svg/{id}.svg
    │
    ├── Display immediately
    │
    └── Prefetch next 3 pages in background
```

## Performance

- **Apache serves static assets** - zero PHP overhead for SVG/JSON delivery
- **O(1) asset lookups** - manifest indexed by page ID
- **Per-request JSON caching** - each file read from disk at most once
- **O(1) juz resolution** - pre-built page→juz lookup map
- **Cache-Control: immutable** - 1-year browser cache for assets
- **ETag + 304** - zero-bandwidth revalidation
- **Gzip + Brotli** - compressed transfer
- **Content-Length** - no chunked encoding overhead
- **Accept-Ranges** - byte-range request support
- **No PHP memory usage** - assets never loaded into PHP memory

## Security

- Directory listing disabled everywhere
- config/, helpers/, scripts/, quran/ blocked from direct access
- Hidden files (.htaccess, .env) blocked
- Input validation on all parameters
- Path traversal prevention
- PHP version hidden from all responses
- No internal filesystem paths exposed
- CORS headers for cross-origin access
- HSTS header (2-year max-age, includeSubDomains, preload)
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- Referrer-Policy: no-referrer
- Cache-Control: no-store on API responses

## Configuration

Edit `config/config.php`:

| Key | Description |
|-----|-------------|
| `base_url` | Public API domain |
| `api_version` | Bump on API changes |
| `quran_version` | Bump when Quran data changes |
| `manifest_version` | Bump to force Flutter manifest refresh |
| `latest_app_version` | Minimum supported app version |
| `maintenance_mode` | Enable to return 503 for all requests |

## Versioning

- **MAJOR**: Breaking API contract changes (endpoint removal, field renames)
- **MINOR**: New endpoints or response fields (backward-compatible)
- **PATCH**: Bug fixes, performance improvements, internal changes

Bump versions in `config/config.php`:
- `api_version`: Any API behavior change
- `manifest_version`: Any change to manifest.json structure
- `quran_version`: Any change to Quran data files

## Deployment

### Apache

Ensure `mod_rewrite` is enabled:
```bash
a2enmod rewrite
systemctl restart apache2
```

Set document root to the `php-api/` directory.

### nginx

Translate `.htaccess` rules to nginx config:
```nginx
location /api/ {
    try_files $uri $uri/ =404;
}

location /assets/ {
    alias /path/to/php-api/public/assets/;
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

## License

MIT
