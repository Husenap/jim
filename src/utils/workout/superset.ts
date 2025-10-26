const SupersetColors: Array<
  "primary" | "secondary" | "success" | "warning" | "danger" | "default"
> = ["primary", "secondary", "success", "warning", "danger", "default"];

export default function GetSupersetColor(superset: number) {
  return SupersetColors[superset % SupersetColors.length];
}
