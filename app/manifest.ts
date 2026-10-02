import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return { name: "MarcaLibro", short_name: "MarcaLibro", description: "Tu biblioteca y punto de lectura.", start_url: "/", display: "standalone", background_color: "#f5f2ea", theme_color: "#1f5b4b", icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }] };
}
