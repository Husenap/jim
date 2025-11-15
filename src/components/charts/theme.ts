import type { PartialTheme as NivoTheme } from "@nivo/theming";

export type ChartTheme = {
  id: string;

  colors: string[];

  calendar: {
    monthBorderWidth: number;
    monthBorderColor: string;
    dayBorderWidth: number;
    dayBorderColor: string;
    emptyColor: string;
  };

  nivo: NivoTheme;
};

export const lightTheme: ChartTheme = {
  id: "light",
  colors: ["#006FEE", "#7828c8", "#17c964", "#f5a524", "#f31260"],
  calendar: {
    monthBorderWidth: 2,
    monthBorderColor: "#ffffff",
    dayBorderWidth: 1,
    dayBorderColor: "#ffffff",
    emptyColor: "#e4e4e7",
  },
  nivo: {
    background: "#ffffff",
    text: {
      fill: "#11181C",
    },
    axis: {
      domain: { line: { stroke: "#c0c0c0", strokeWidth: 1 } },
      ticks: {
        line: { stroke: "#c0c0c0", strokeWidth: 1 },
      },
    },
    grid: { line: { stroke: "#e0e0e0", strokeWidth: 1 } },
    crosshair: {
      line: {
        stroke: "#ff5733",
        strokeWidth: 2,
        strokeOpacity: 0.8,
        strokeDasharray: "4,4",
      },
    },
    legends: {
      hidden: {
        symbol: { fill: "#ffffff", opacity: 0 },
      },
      ticks: {
        line: { stroke: "#c0c0c0", strokeWidth: 1 },
      },
    },
    markers: {
      lineColor: "#ff5733",
      lineStrokeWidth: 2,
    },
    tooltip: {
      container: { background: "#ffffff", color: "#000000", borderRadius: 4 },
      basic: { color: "#000000" },
      chip: { background: "#ff5733", color: "#ffffff", borderRadius: 2 },
      table: { color: "#000000" },
      tableCell: { color: "#000000" },
      tableCellValue: { color: "#ff5733" },
    },
    annotations: {
      link: {
        stroke: "#ff5733",
        strokeWidth: 1,
        outlineWidth: 0,
        outlineColor: "#ffffff",
        outlineOpacity: 1,
      },
      outline: {
        stroke: "#ff5733",
        strokeWidth: 1,
        outlineWidth: 0,
        outlineColor: "#ffffff",
        outlineOpacity: 1,
      },
      symbol: {
        fill: "#ff5733",
        outlineWidth: 0,
        outlineColor: "#ffffff",
        outlineOpacity: 1,
      },
    },
  },
};

export const darkTheme: ChartTheme = {
  id: "dark",
  colors: ["#006FEE", "#9353d3", "#17c964", "#f5a524", "#f31260"],
  calendar: {
    monthBorderWidth: 2,
    monthBorderColor: "#000000",
    dayBorderWidth: 1,
    dayBorderColor: "#000000",
    emptyColor: "#3f3f46",
  },
  nivo: {
    background: "#000000",
    text: {
      fill: "#ECEDEE",
    },
    axis: {
      domain: { line: { stroke: "#333333", strokeWidth: 1 } },
      ticks: {
        line: { stroke: "#333333", strokeWidth: 1 },
      },
      legend: { text: { fill: "#f0f0f0" } },
    },
    grid: { line: { stroke: "#222222", strokeWidth: 1 } },
    crosshair: {
      line: {
        stroke: "#ffbf00",
        strokeWidth: 2,
        strokeOpacity: 0.8,
        strokeDasharray: "4,4",
      },
    },
    legends: {
      hidden: {
        symbol: { fill: "#ffffff", opacity: 0 },
      },
      ticks: {
        line: { stroke: "#333333", strokeWidth: 1 },
      },
    },
    markers: {
      lineColor: "#ffbf00",
      lineStrokeWidth: 2,
    },
    tooltip: {
      container: { background: "#222222", color: "#f0f0f0", borderRadius: 4 },
      basic: { color: "#f0f0f0" },
      chip: { background: "#ffbf00", color: "#000000", borderRadius: 2 },
      table: { color: "#f0f0f0" },
      tableCell: { color: "#f0f0f0" },
      tableCellValue: { color: "#ffbf00" },
    },
    annotations: {
      link: {
        stroke: "#ffbf00",
        strokeWidth: 1,
        outlineWidth: 0,
        outlineColor: "#222222",
        outlineOpacity: 1,
      },
      outline: {
        stroke: "#ffbf00",
        strokeWidth: 1,
        outlineWidth: 0,
        outlineColor: "#222222",
        outlineOpacity: 1,
      },
      symbol: {
        fill: "#ffbf00",
        outlineWidth: 0,
        outlineColor: "#222222",
        outlineOpacity: 1,
      },
    },
  },
};
