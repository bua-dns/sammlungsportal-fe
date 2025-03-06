export function useGetTranslatedContent(key, locale, data) {
  if (
    data &&
    data.translations &&
    data.translations.length > 0
  ) {
    const translation = data.translations.find((t) => t.languages_id === locale);
    if (translation) {
      return translation[key];
    }
  }
  if (data && data[key]) {
    return data[key];
  }
  return "";
}