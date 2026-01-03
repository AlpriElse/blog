import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import rehypeAttr from "rehype-attr";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config";
import { existsSync, readFileSync } from "fs";
import { join } from "path";

// Vite plugin to serve index.html for sandbox directory requests
function sandboxIndexPlugin() {
  return {
    name: "sandbox-index",
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        const url = req.url || "";

        // Only handle /sandbox/ requests that don't have a file extension
        if (url.startsWith("/sandbox/") && !url.match(/\.\w+$/)) {
          const cleanPath = url.replace(/\/$/, ""); // Remove trailing slash
          const indexPath = join(
            process.cwd(),
            "public",
            cleanPath,
            "index.html"
          );

          if (existsSync(indexPath)) {
            res.setHeader("Content-Type", "text/html");
            res.end(readFileSync(indexPath, "utf-8"));
            return;
          }
        }
        next();
      });
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    sitemap(),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    rehypePlugins: [
      [
        rehypeAttr,
        {
          properties: "attr",
        },
      ],
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
  },
  vite: {
    plugins: [sandboxIndexPlugin()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  scopedStyleStrategy: "where",
});
