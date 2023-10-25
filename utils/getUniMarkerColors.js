function getUniMarkerStyles(color, type) {
  return typeof color !== "undefined"
  ? type + ": " + color + ";"
  : "";
}

export function getUniMarkerColors(current_keeper, type) {
  const theme = useState('theme');
  const status = theme.value.data.names.keepers.find((keeper) => keeper.name == current_keeper);
  theme.value.data.settings.ciColors[status.id];
  return getUniMarkerStyles(theme.value.data.settings.ciColors[status.id], type);
}