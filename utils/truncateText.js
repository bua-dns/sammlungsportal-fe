// truncate text to a specified length taking word boundaries into account
export function truncateText(text, length) {
  return text.length > length ? text.substring(0, text.lastIndexOf(" ", length)) + " ..." : text;
}