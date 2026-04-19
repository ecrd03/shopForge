const ThemeColors = {
  Theme1: {
    pageBg: "#f9fafb",
    surface: "#ffffff",
    surface2: "#f3f4f6",
    border: "#d1d5db",
    borderSoft: "#e5e7eb",
    text: "#111827",
    textSoft: "#374151",
    muted: "#6b7280",
    buttonBg: "#ffffff",
    buttonText: "#111827",
    inputBg: "#ffffff",
    placeholderBlock: "#e5e7eb",
    accent: "#e3e4e6",
    accentSoft: "#0d4bbf9e"
  },

  Theme2: {
    pageBg: "#111111",
    surface: "#1b1b1b",
    surface2: "#242424",
    border: "#3a3a3a",
    borderSoft: "#2f2f2f",
    text: "#ffffff",
    textSoft: "#d1d5db",
    muted: "#9ca3af",
    buttonBg: "#1f1f1f",
    buttonText: "#ffffff",
    inputBg: "#1f1f1f",
    placeholderBlock: "#2f2f2f",
    accent: "#ffffff",
    accentSoft: "#9ca3af"
  },

  Theme3: {
    pageBg: "#9fbff3b2",
    surface: "#4a58b2",
    surface2: "#539dde",
    border: "#539dde",
    borderSoft: "#539dde",
    text: "#ffffff",
    textSoft: "#ffffff",
    muted: "#c7d2fe",
    buttonBg: "#539dde",
    buttonText: "#ffffff",
    inputBg: "#ffffff",
    placeholderBlock: "#c7d2fe",
    accent: "#539dde",
    accentSoft: "#539dde"
  },

  Theme4: {
    pageBg: "#141414",
    surface: "#000000",
    surface2: "#1f1f1f",
    border: "#ee4c4c",
    borderSoft: "#3a1a1a",
    text: "#ffffff",
    textSoft: "#ffffff",
    muted: "#fca5a5",
    buttonBg: "#ee4c4c",
    buttonText: "#ffffff",
    inputBg: "#1a1a1a",
    placeholderBlock: "#2a2a2a",
    accent: "#ee4c4c",
    accentSoft: "#f87171"
  },

  Theme5: {
    pageBg: "#fff7fc",
    surface: "#ffffff",
    surface2: "#fdf2f8",
    border: "#f3a0ed",
    borderSoft: "#fbcfe8",
    text: "#831843",
    textSoft: "#9d174d",
    muted: "#be185d",
    buttonBg: "#eaace6",
    buttonText: "#831843",
    inputBg: "#ffffff",
    placeholderBlock: "#fbcfe8",
    accent: "#f3a0ed",
    accentSoft: "#f9a8d4"
  },

  Theme6: {
    pageBg: "#eef2ff",
    surface: "#ffffff",
    surface2: "#e0e7ff",
    border: "#5162ea",
    borderSoft: "#c7d2fe",
    text: "#1e1b4b",
    textSoft: "#312e81",
    muted: "#4338ca",
    buttonBg: "#5162ea",
    buttonText: "#ffffff",
    inputBg: "#ffffff",
    placeholderBlock: "#c7d2fe",
    accent: "#5162ea",
    accentSoft: "#818cf8"
  },

  Theme7: {
    pageBg: "#f6f0ff",
    surface: "#ffffff",
    surface2: "#efe7ff",
    border: "#9e65ef",
    borderSoft: "#ddd6fe",
    text: "#3b0764",
    textSoft: "#5b21b6",
    muted: "#7c3aed",
    buttonBg: "#9e65ef",
    buttonText: "#ffffff",
    inputBg: "#ffffff",
    placeholderBlock: "#ddd6fe",
    accent: "#9e65ef",
    accentSoft: "#c4b5fd"
  },

  Theme8: {
    pageBg: "#ffeeee",
    surface: "#ffffff",
    surface2: "#ffe0e0",
    border: "#ea5151",
    borderSoft: "#fec7c7",
    text: "#4b1b1b",
    textSoft: "#812e2e",
    muted: "#ca3838",
    buttonBg: "#ea5151",
    buttonText: "#ffffff",
    inputBg: "#ffffff",
    placeholderBlock: "#fec7c7",
    accent: "#ea5151",
    accentSoft: "#f88181"
  },

  Theme9: {
    pageBg: "#def5ea",
    surface: "#ffffff",
    surface2: "#e7fff1",
    border: "#27e356",
    borderSoft: "#27e356",
    text: "#0b8e3b",
    textSoft: "#21b670",
    muted: "#3aed9f",
    buttonBg: "#16e569",
    buttonText: "#ffffff",
    inputBg: "#ffffff",
    placeholderBlock: "#d6feea",
    accent: "#44e7a3",
    accentSoft: "#b5fddd"
  },

  Theme10: {
    pageBg: "#faf8f5",
    surface: "#ffffff",
    surface2: "#f4efe9bf",
    border: "#4e3115",
    borderSoft: "#f0ebe6",
    text: "#4a3b32",
    textSoft: "#5b4537",
    muted: "#d6cdc4",
    buttonBg: "#6b4e3db8",
    buttonText: "#ffffff",
    inputBg: "#ffffff",
    placeholderBlock: "#f4efe9",
    accent: "#6b4e3d",
    accentSoft: "#a68a7c"
  },

  Theme11: {
    pageBg: "#141414",
    surface: "#000000",
    surface2: "#1f1f1f",
    border: "#4c59ee",
    borderSoft: "#4c59ee",
    text: "#ffffff",
    textSoft: "#ffffff",
    muted: "#a5d2fc",
    buttonBg: "#4c92ee",
    buttonText: "#ffffff",
    inputBg: "#1a1a1a",
    placeholderBlock: "#2a2a2a",
    accent: "#4ca0ee",
    accentSoft: "#71a5f8"
  },
  
}

export function getThemeColors(themeName) {
  return ThemeColors[themeName] || ThemeColors.Theme1
}

export default ThemeColors