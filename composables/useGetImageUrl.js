const baseUrl = projectConfig.imageBaseUrl;

export function useGetImageUrl(filename, presetKey) {
  // define default preset key
  if (!presetKey) {
    presetKey = 'generic-800';
  }

  return `${baseUrl}/${filename}?key=${presetKey}`;
}