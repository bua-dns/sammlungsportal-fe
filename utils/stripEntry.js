// strip '["' and '"]' from entry
export function stripEntry(entry) {
  return entry.replace(/(\["|"\])/g, "");
}