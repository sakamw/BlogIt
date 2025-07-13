import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    cardBackground: string;
    cardBorder: string;
    cardShadow: string;
  }
  interface PaletteOptions {
    cardBackground?: string;
    cardBorder?: string;
    cardShadow?: string;
  }
}
