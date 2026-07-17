# Changelog

All notable changes to the Rafiq Asset Delivery API.

## [2.0.0] - 2026-07-18

### Changed
- **Architecture**: PHP no longer streams SVG/JSON files. PHP returns metadata only. Static assets served directly by Apache from `/assets/`.
- **Performance**: Manifest assets indexed by page ID for O(1) lookups (was O(n) per request).
- **Performance**: `File::readJson()` now caches per request — each file read at most once.
- **Performance**: `File::resolveJuz()` builds a complete page→juz map on first call for O(1) access (was O(30) per call).
- **Security**: Removed `php_version` from `/api/health` response (fingerprinting vector).
- **Security**: Removed `maintenance_mode` from `/api/version` response (info leak).
- **Security**: Added `Strict-Transport-Security` header (HSTS) with 2-year max-age.
- **Security**: Bootstrap now sets headers after config load, before maintenance/error exits.

### Removed
- Dead code: `File::metadata()`, `File::listNumericIds()` (never called).
- Dead code: `Cache::applyFileHeaders()`, `Cache::fileSha256()`, `Cache::fileEtag()` (never called).
- Dead code: `Security::resolvePath()`, `Security::sanitizeFileName()`, `Security::resolveAssetPath()` (no asset endpoint).
- Dead code: `Manifest::filterByType()`, `Manifest::filterByIdRange()` (never called).
- Unused config: `allowed_asset_types`, `mime_types`, `cache_metadata`, `max_id_value`.
- 722 duplicate root-level SVG files (~348 MB freed).

## [1.0.0] - 2026-07-17

### Added
- Initial release with PHP-streaming architecture (deprecated in 2.0.0).
