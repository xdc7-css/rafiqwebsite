const RELEASE_API_URL = 'https://api.github.com/repos/xdc7-css/rafiqwebsite/releases/latest';
const APK_EXTENSION_REGEX = /\.apk$/i;

const ARCHITECTURE_PATTERNS = [
  { pattern: /arm64-v8a/i, value: 'arm64-v8a' },
  { pattern: /armeabi-v7a/i, value: 'armeabi-v7a' },
  { pattern: /x86_64/i, value: 'x86_64' },
];

const ARCHITECTURE_LABELS = {
  'arm64-v8a': 'arm64-v8a',
  'armeabi-v7a': 'armeabi-v7a',
  x86_64: 'x86_64',
};

const PRIMARY_ASSET_PRIORITY = ['arm64-v8a', 'armeabi-v7a', 'x86_64'];

export function formatSizeInMb(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return '—';
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatPublishedDate(isoDate, locale = 'en-US') {
  if (!isoDate) return '—';
  const parsedDate = new Date(isoDate);
  if (Number.isNaN(parsedDate.getTime())) return '—';

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(parsedDate);
}

export function detectArchitecture(assetName = '') {
  const detected = ARCHITECTURE_PATTERNS.find(({ pattern }) => pattern.test(assetName));
  if (detected) return detected.value;

  return assetName
    .replace(APK_EXTENSION_REGEX, '')
    .replace(/^app[-_.]?/i, '')
    .replace(/[-_.]?release$/i, '')
    .trim() || 'unknown';
}

export function normalizeApkAssets(assets = []) {
  return assets
    .filter(asset => APK_EXTENSION_REGEX.test(asset?.name || ''))
    .map((asset, index) => {
      const architecture = detectArchitecture(asset.name || '');
      return {
        id: asset.id || `${asset.name || 'apk'}-${index}`,
        name: asset.name || 'APK',
        architecture,
        architectureLabel: ARCHITECTURE_LABELS[architecture] || architecture,
        downloadUrl: asset.browser_download_url || '',
        sizeBytes: asset.size || 0,
        sizeLabel: formatSizeInMb(asset.size || 0),
      };
    });
}

export function getPrimaryApkAsset(apkAssets = []) {
  for (const architecture of PRIMARY_ASSET_PRIORITY) {
    const matchedAsset = apkAssets.find(asset => asset.architecture === architecture);
    if (matchedAsset) return matchedAsset;
  }
  return apkAssets[0] || null;
}

export function normalizeReleaseData(release) {
  const apkAssets = normalizeApkAssets(release?.assets || []);
  const primaryApkAsset = getPrimaryApkAsset(apkAssets);

  return {
    tagName: release?.tag_name || '—',
    releaseNotes: (release?.body || '').trim() || 'No release notes available.',
    publishedAt: release?.published_at || '',
    publishedAtLabel: formatPublishedDate(release?.published_at),
    apkAssets,
    primaryApkAsset,
  };
}

export { RELEASE_API_URL };
