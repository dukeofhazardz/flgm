import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/seo";

/**
 * Shared Open Graph artwork.
 *
 * One brand composition for every route: Night/Forest field, the signature
 * arch, a red live dot, and the page's own kicker and headline. Generated with
 * `next/og` at build time so no external image host or font fetch is needed.
 */

export const OG_SIZE = { width: 1200, height: 630 } as const;

export const OG_CONTENT_TYPE = "image/png";

interface OgImageInput {
  /** Small uppercase label above the headline, e.g. "About the house". */
  kicker: string;
  /** The page headline. Two lines read best; around 30 characters fits. */
  title: string;
  /** Optional supporting line. Keep it under ~110 characters. */
  subtitle?: string;
}

export function renderOgImage({ kicker, title, subtitle }: OgImageInput) {
  const titleSize = title.length > 34 ? 74 : title.length > 22 ? 86 : 98;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          padding: "62px 72px 54px",
          background:
            "linear-gradient(148deg, #04180F 0%, #0B3B24 52%, #04180F 100%)",
          color: "#FFFFFF",
          overflow: "hidden",
        }}
      >
        {/* The signature arch, cropped by the right edge. */}
        <div
          style={{
            position: "absolute",
            right: -150,
            bottom: -230,
            width: 760,
            height: 900,
            display: "flex",
            borderRadius: "380px 380px 0 0",
            border: "2px solid rgba(201,245,218,0.24)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -40,
            bottom: -260,
            width: 540,
            height: 720,
            display: "flex",
            borderRadius: "270px 270px 0 0",
            background:
              "radial-gradient(circle at 50% 18%, rgba(0,200,83,0.30) 0%, rgba(0,200,83,0.05) 46%, rgba(0,200,83,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 96,
            top: 0,
            width: 1,
            height: 250,
            display: "flex",
            background:
              "linear-gradient(180deg, rgba(201,245,218,0) 0%, rgba(201,245,218,0.35) 100%)",
          }}
        />

        {/* Masthead */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 9,
              height: 9,
              display: "flex",
              borderRadius: 999,
              background: "#FC0000",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 17,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.62)",
            }}
          >
            {SITE_NAME}
          </div>
        </div>

        {/* Headline block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
            maxWidth: 820,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 18,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#00C853",
            }}
          >
            <div
              style={{
                width: 42,
                height: 2,
                display: "flex",
                background: "#00C853",
              }}
            />
            {kicker}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: titleSize,
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                display: "flex",
                marginTop: 22,
                maxWidth: 640,
                fontSize: 23,
                lineHeight: 1.4,
                color: "rgba(201,245,218,0.74)",
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        {/* Folio */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 42,
            paddingTop: 20,
            borderTop: "1px solid rgba(255,255,255,0.16)",
            fontSize: 14,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.44)",
          }}
        >
          <div style={{ display: "flex" }}>Gwarinpa · Abuja</div>
          <div style={{ display: "flex" }}>We Get Better Every Day</div>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
