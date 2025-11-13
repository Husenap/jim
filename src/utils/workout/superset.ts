const SupersetColors: Array<
  "primary" | "secondary" | "success" | "warning" | "danger"
> = ["primary", "secondary", "success", "warning", "danger"];

export default function GetSupersetColor(superset: number) {
  return SupersetColors[superset % SupersetColors.length];
}
