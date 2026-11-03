"use client";

import Image from "next/image";
import * as React from "react";
import { ArtSlot } from "./art-slot";
import { ConceptLabel } from "./concept-label";
import { cn } from "@/lib/utils";

type ArtSlotName = "sun" | "stairs" | "doorway" | "book" | "rays" | "hands";

/**
 * ImageSlot — wrapper for imagery without photos yet.
 * Renders an ArtSlot with grain overlay and arch mask.
 * When real photography arrives, accept `src` and apply green duotone + grain + arch mask.
 * Auditorium concept slots always carry a visible "Architectural concept" label.
 */

interface ImageSlotProps {
  name?: ArtSlotName;
  src?: string;
  alt?: string;
  className?: string;
  color?: "green" | "white" | "ink";
  size?: number;
  architecturalConcept?: boolean;
}

export function ImageSlot({
  name = "sun",
  src,
  alt,
  className,
  color = "green",
  size = 200,
  architecturalConcept = false,
}: ImageSlotProps): React.ReactElement {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-none",
        "clip-path-[polygon(0_0,100%_0,100%_75%,75%_100%,25%_100%,0_75%)]",
        className
      )}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt ?? ""}
          className="w-full h-full object-cover"
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1440px) 50vw, 25vw"
          style={{
            filter:
              color === "green"
                ? "sepia(0.3) saturate(2) hue-rotate(120deg) contrast(1.2)"
                : "sepia(0.3) saturate(2) contrast(1.2)",
            mixBlendMode: "normal",
          }}
        />
      ) : (
        <ArtSlot name={name} color={color} size={size} />
      )}
      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E')",
        }}
      />
      {architecturalConcept && (
        <ConceptLabel className="absolute bottom-2 left-2 z-10" />
      )}
    </div>
  );
}
