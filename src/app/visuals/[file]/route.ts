import {
  renderSolarScene,
  VISUAL_TONES,
  VISUAL_VARIANTS,
  type Tone,
} from "@/lib/solar-scenes";
import type { VisualVariant } from "@/types/content";

/**
 * Serves each generative scene as a static, cacheable SVG asset
 * (`/visuals/<variant>-<tone>.svg`). Prerendered at build time so the scenes
 * never bloat page HTML or the RSC payload.
 */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return VISUAL_VARIANTS.flatMap((variant) =>
    VISUAL_TONES.map((tone) => ({ file: `${variant}-${tone}.svg` })),
  );
}

export async function GET(_request: Request, context: RouteContext<"/visuals/[file]">) {
  const { file } = await context.params;
  const match = /^([a-z]+)-([a-z]+)\.svg$/.exec(file);
  const variant = match?.[1] as VisualVariant | undefined;
  const tone = match?.[2] as Tone | undefined;
  if (!variant || !tone || !VISUAL_VARIANTS.includes(variant) || !VISUAL_TONES.includes(tone)) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(renderSolarScene(variant, tone), {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
