import React, { CSSProperties } from "react";
import { cn } from "../../lib/utils";

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = "#ffffff",
      shimmerSize = "0.05em",
      shimmerDuration = "3s",
      borderRadius = "100px",
      background = "rgba(0, 0, 0, 1)",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        style={
          {
            "--shimmer-color": shimmerColor,
            "--shimmer-size": shimmerSize,
            "--shimmer-duration": shimmerDuration,
            "--border-radius": borderRadius,
            "--background": background,
          } as CSSProperties
        }
        className={cn(
          "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-white [background:var(--background)] [border-radius:var(--border-radius)] dark:text-black",
          "transform-gpu transition-transform duration-300 ease-in-out active:scale-95",
          className,
        )}
        ref={ref}
        {...props}
      >
        {/* spark container */}
        <div className="-z-30 blur-[2px]">
          <div className="absolute inset-0 overflow-visible [container-type:size]">
            {/* spark */}
            <div className="absolute h-[100cqh] animate-shimmer-slide [aspect-ratio:1] [border-radius:0] [background:linear-gradient(0deg,transparent,var(--shimmer-color),transparent)] [translate:0_0] [--angle:0deg] [--speed:var(--shimmer-duration)] [--offset:0deg] opacity-10">
              <div className="animate-shimmer-spin [background:conic-gradient(from_calc(270deg-(var(--angle))),transparent_0deg,var(--shimmer-color)_var(--angle),transparent_calc(var(--angle)+0.01deg),transparent_360deg)] [border-radius:0] [inset:var(--shimmer-size)]"></div>
            </div>
          </div>
        </div>
        {children}

        {/* Highlight */}
        <div className="insert-0 absolute h-full w-full">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        </div>
      </button>
    );
  },
);

ShimmerButton.displayName = "ShimmerButton";

export { ShimmerButton }; 