import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { ThemeOptions } from "@mui/material/styles";

// Augment the palette to include an ochre color
declare module "@mui/material/styles" {
  interface Palette {
    accent: Palette["primary"];
    shadow: Palette["primary"];
    standard: Palette["primary"];
    highlight: Palette["primary"];
    siteBackground: Palette["primary"];
  }

  interface PaletteOptions {
    accent?: PaletteOptions["primary"];
    shadow?: PaletteOptions["primary"];
    standard?: PaletteOptions["primary"];
    highlight?: PaletteOptions["primary"];
    siteBackground?: PaletteOptions["primary"];
  }
}

const { palette } = createTheme();

const theme = createTheme({
  typography: {
    fontFamily: ["Grenze"].join(","),
  },
  palette: {
    siteBackground: palette.augmentColor({
      color: { main: "#0d1b2a" },
      //   light: "#415a77",
      //   dark: "#1b263b",
      //   contrastText: "#242105",
    }),
    accent: palette.augmentColor({
      color: { main: "#E67514" },
      //   light: "#FFF1CA",
      //   dark: "#4B352A",
      //   contrastText: "#242105",
    }),
    shadow: palette.augmentColor({
      color: { main: "#212121" },
      //   light: "#FFB823",
      //   dark: "#CA7842",
      //   contrastText: "#242105",
    }),
    standard: palette.augmentColor({
      color: { main: "#555B6E" },
      //
      //   main: "#06923E",
      //   light: "#B2CD9C",
      //   dark: "#708A58",
      //   contrastText: "#242105",
    }),
    highlight: palette.augmentColor({
      color: { main: "#D3ECCD" },
      //   light: "#B2CD9C",
      //   dark: "#2D4F2B",
      //   contrastText: "#242105",
    }),
  },
});

interface ThemeifyProps {
  children: React.ReactNode;
  /**
   * This is for the docs site. You can ignore it or remove it.
   */
  disableCustomTheme?: boolean;
  themeComponents?: ThemeOptions["components"];
}

export default function Themeify(props: ThemeifyProps) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
