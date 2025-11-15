import { ChartTheme, darkTheme, lightTheme } from "@/components/charts/theme";
import { OrdinalColorScaleConfigCustomColors } from "@nivo/colors";
import { PartialTheme } from "@nivo/theming";
import { useTheme } from "next-themes";
import { ReactNode, useMemo } from "react";

export default function ChartWrapper({
  children,
}: {
  children: (
    theme: ChartTheme,
    nivoTheme: PartialTheme,
    colors: OrdinalColorScaleConfigCustomColors,
  ) => ReactNode;
}) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const theme = useMemo(
    () => (isDark ? darkTheme : lightTheme),
    [resolvedTheme],
  );
  return <>{children(theme, theme.nivo, theme.colors)}</>;
}
