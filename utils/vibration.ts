export function vibrate(pattern: Iterable<number> = [50]) {
  if (navigator.vibrate) navigator.vibrate(pattern);
}

export function zap() {
  vibrate([50]);
}