export function getLabelUrl(label) {
  // we need to encode the label twice, because the labels are divided by a comma,
  // so labels with commas would otherwise be split
  return encodeURIComponent(encodeURIComponent(label));
}
