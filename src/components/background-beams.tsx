"use client";

import { cn } from "@/lib/utils";
import React, { forwardRef, useId } from "react";

const BackgroundBeams = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const SvgId = useId();

  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 z-0 h-full w-full overflow-hidden bg-background",
        className
      )}
      {...props}
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        id={SvgId}
      >
        <defs>
          <radialGradient
            id="radial-gradient"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor="hsl(var(--primary) / 0.1)" />
            <stop offset="100%" stopColor="hsl(var(--primary) / 0)" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#radial-gradient)" />
      </svg>
      <div className="absolute inset-0 h-full w-full">
        <div
          className="absolute h-full w-px animate-[animate-beam_10s_linear_infinite] bg-gradient-to-b from-transparent via-primary to-transparent"
          style={{
            left: "10%",
          }}
        />
        <div
          className="absolute h-full w-px animate-[animate-beam_12s_linear_infinite] bg-gradient-to-b from-transparent via-primary to-transparent"
          style={{
            left: "30%",
            animationDelay: "1s",
          }}
        />
        <div
          className="absolute h-full w-px animate-[animate-beam_15s_linear_infinite] bg-gradient-to-b from-transparent via-accent to-transparent"
          style={{
            left: "50%",
            animationDelay: "2s",
          }}
        />
        <div
          className="absolute h-full w-px animate-[animate-beam_14s_linear_infinite] bg-gradient-to-b from-transparent via-primary to-transparent"
          style={{
            left: "70%",
            animationDelay: "3.5s",
          }}
        />
        <div
          className="absolute h-full w-px animate-[animate-beam_8s_linear_infinite] bg-gradient-to-b from-transparent via-primary to-transparent"
          style={{
            left: "90%",
            animationDelay: "1.5s",
          }}
        />
      </div>
    </div>
  );
});

BackgroundBeams.displayName = "BackgroundBeams";

export default BackgroundBeams;
