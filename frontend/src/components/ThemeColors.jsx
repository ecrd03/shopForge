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
    pageBg: "#edf4ff",
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
  }
}

export function getThemeColors(themeName) {
  return ThemeColors[themeName] || ThemeColors.Theme1
}

export default ThemeColors