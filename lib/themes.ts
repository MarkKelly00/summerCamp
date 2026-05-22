/**
 * Theme catalog. Keep names in sync with the data-theme values in
 * app/globals.css and the User.theme enum in lib/db/models/User.ts.
 */

export type CampTheme = "space" | "jungle" | "ocean" | "castle" | "arcade";

export interface CampThemeMeta {
  slug: CampTheme;
  label: string;
  blurb: string;
}

export const CAMP_THEMES: CampThemeMeta[] = [
  { slug: "space", label: "Space Station", blurb: "Cosmic indigo with amber stars." },
  { slug: "jungle", label: "Jungle Trek", blurb: "Deep emerald canopy with gold sunbeams." },
  { slug: "ocean", label: "Ocean Lab", blurb: "Cool teal currents and bright sky." },
  { slug: "castle", label: "Castle Crest", blurb: "Warm oak halls with orange torchlight." },
  { slug: "arcade", label: "Arcade Glow", blurb: "Neon magenta and cyan boards." },
];

export const DEFAULT_THEME: CampTheme = "space";
