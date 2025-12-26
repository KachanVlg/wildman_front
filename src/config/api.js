const runtimeBaseUrl =
  typeof window !== 'undefined' && window.__ENV && window.__ENV.API_BASE_URL
    ? window.__ENV.API_BASE_URL
    : '';

const sanitizedRuntimeBaseUrl =
  runtimeBaseUrl && runtimeBaseUrl !== '__API_BASE_URL__' ? runtimeBaseUrl : '';

export const API_BASE_URL =
  sanitizedRuntimeBaseUrl || process.env.REACT_APP_API_BASE_URL || '';

export const apiUrl = (path) => {
  if (!path) {
    return API_BASE_URL;
  }
  if (path.startsWith('http')) {
    return path;
  }
  const base = API_BASE_URL.replace(/\/$/, '');
  const suffix = path.startsWith('/') ? path : `/${path}`;
  return `${base}${suffix}`;
};
