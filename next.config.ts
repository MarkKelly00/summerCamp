import type { NextConfig } from "next";

/**
 * Next.js 16 configuration.
 *
 * Notes:
 * - `serverExternalPackages: ["mongoose"]` keeps Mongoose out of the Next
 *   bundler so its native-ish runtime behavior works correctly in Server
 *   Components, Server Actions, and Route Handlers.
 * - Legacy folders `client/` and `server/` are excluded from TypeScript
 *   compilation (see tsconfig.json) but remain in the repo so the old MERN
 *   app keeps building during the strangler migration.
 */
const config: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["mongoose"],
  // Vercel deploys the whole repo. Exclude legacy folders from page
  // collection so Next doesn't accidentally route into them.
  pageExtensions: ["ts", "tsx"],
};

export default config;
