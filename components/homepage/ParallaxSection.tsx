import type { ReactNode } from "react";

type ParallaxSectionProps = {
  id: string;
  className?: string;
  children?: ReactNode;
};

/**
 * Content layout for a homepage section. The background itself is rendered
 * once, globally, by ParallaxBackgroundStack (see HomeExperience) so that
 * neighbouring sections cross-dissolve instead of hard-cutting.
 */
export function ParallaxSection({ id, className = "", children }: ParallaxSectionProps) {
  return (
    <section id={id} className={`relative min-h-screen w-full ${className}`}>
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
        {children}
      </div>
    </section>
  );
}
