import { createContext, useEffect, useMemo, useState } from 'react';
import { RELEASE_API_URL, normalizeReleaseData } from '../utils/githubRelease';

const ReleaseContext = createContext(null);
const RELEASE_FETCH_ERROR = 'Unable to fetch latest release.';

export function ReleaseProvider({ children }) {
  const [release, setRelease] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchLatestRelease = async () => {
      try {
        // Fetch once on app load and reuse across all download surfaces.
        const response = await fetch(RELEASE_API_URL, {
          signal: controller.signal,
          headers: {
            Accept: 'application/vnd.github+json',
          },
        });

        if (!response.ok) throw new Error('Release request failed');

        const data = await response.json();
        const normalizedRelease = normalizeReleaseData(data);
        setRelease(normalizedRelease);
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(RELEASE_FETCH_ERROR);
          setRelease(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestRelease();
    return () => controller.abort();
  }, []);

  const value = useMemo(() => {
    const apkAssets = release?.apkAssets || [];
    const primaryAsset = release?.primaryApkAsset || null;
    return {
      release,
      apkAssets,
      primaryAsset,
      primaryAssetUrl: primaryAsset?.downloadUrl || '',
      isLoading,
      error,
    };
  }, [release, isLoading, error]);

  return <ReleaseContext.Provider value={value}>{children}</ReleaseContext.Provider>;
}

export { ReleaseContext };
