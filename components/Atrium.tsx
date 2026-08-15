import Image from "next/image";
import { heroImage } from "@/lib/content";

type AtriumProps = { className?: string };

/** Foliage masses, placed by hand so the crown reads as one irregular shape. */
const CANOPY = [
  { left: "30%", top: "2%", width: "38%", height: "20%", opacity: 0.3 },
  { left: "8%", top: "12%", width: "40%", height: "22%", opacity: 0.28 },
  { left: "52%", top: "9%", width: "44%", height: "24%", opacity: 0.31 },
  { left: "0%", top: "30%", width: "34%", height: "20%", opacity: 0.24 },
  { left: "26%", top: "26%", width: "46%", height: "26%", opacity: 0.33 },
  { left: "62%", top: "32%", width: "38%", height: "22%", opacity: 0.26 },
  { left: "14%", top: "50%", width: "40%", height: "22%", opacity: 0.25 },
  { left: "48%", top: "54%", width: "34%", height: "20%", opacity: 0.21 },
  { left: "34%", top: "70%", width: "28%", height: "16%", opacity: 0.16 },
];

/** Bare branches lifting into the crown, angled off the trunk. */
const BRANCHES = [
  { rotate: -24, height: "34%", bottom: "48%" },
  { rotate: 19, height: "30%", bottom: "50%" },
  { rotate: -9, height: "38%", bottom: "46%" },
];

/**
 * The hero's architectural interior: a curved plaster wall standing on a
 * polished floor, lit from the upper left, with the wall mirrored into the
 * floor and a single tree for scale. It is assembled from geometry rather
 * than drawn, so it stays sharp at any size and follows the theme tokens
 * into dark mode.
 *
 * Setting `heroImage` in lib/content swaps the whole scene for a photograph.
 */
export function Atrium({ className = "" }: AtriumProps) {
  if (heroImage) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={heroImage}
          alt="Innenraum des Studios"
          fill
          loading="eager"
          fetchPriority="high"
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className={`atrium-room relative isolate overflow-hidden ${className}`}
    >
      {/* Floor plane, meeting the wall at 76% of the height. */}
      <div className="atrium-floor absolute inset-x-0 bottom-0 top-[76%]" />

      {/* The wall mirrored into the polished floor. */}
      <div className="absolute inset-x-0 bottom-0 top-[76%] overflow-hidden">
        <div className="atrium-reflection absolute inset-x-0 bottom-0 h-full">
          <div className="atrium-wall absolute bottom-0 left-[20%] right-[-14%] top-[16%]" />
        </div>
      </div>

      {/* The cylinder itself. */}
      <div className="atrium-wall absolute bottom-[24%] left-[20%] right-[-14%] top-[8%]" />

      {/* The recess beneath the curve. */}
      <div className="atrium-arch absolute bottom-[24%] left-[27%] h-[36%] w-[18%]" />

      {/* Contact shadow where the wall meets the floor. */}
      <div className="absolute bottom-[23%] left-[20%] right-[-14%] h-7 bg-ink/14 blur-xl" />

      {/* A single tree, the one point of colour in the room. The crown
          overlaps the trunk so the two read as one plant. */}
      <div className="absolute bottom-[24%] left-[70%] h-[54%] w-[12%]">
        {/* Trunk runs the full height and is overdrawn by the crown. */}
        <div className="absolute bottom-[5%] left-1/2 top-[34%] w-px -translate-x-1/2 bg-ink/35" />

        {BRANCHES.map((branch) => (
          <div
            key={branch.rotate}
            className="absolute left-1/2 w-px origin-bottom bg-ink/22"
            style={{
              bottom: branch.bottom,
              height: branch.height,
              transform: `translateX(-50%) rotate(${branch.rotate}deg)`,
            }}
          />
        ))}

        <div className="absolute inset-x-[-38%] top-0 h-[72%]">
          {CANOPY.map((mass) => (
            <span
              key={`${mass.left}-${mass.top}`}
              className="atrium-canopy absolute"
              style={{
                left: mass.left,
                top: mass.top,
                width: mass.width,
                height: mass.height,
                opacity: mass.opacity,
              }}
            />
          ))}
        </div>

        {/* Planter and its contact shadow. */}
        <div className="absolute bottom-0 left-1/2 h-[5%] w-[44%] -translate-x-1/2 rounded-[3px] bg-sand-deep" />
        <div className="absolute -bottom-1 left-1/2 h-2 w-[60%] -translate-x-1/2 rounded-[50%] bg-ink/18 blur-md" />
      </div>

      {/* Daylight falling in from the upper left. */}
      <div className="atrium-bloom pointer-events-none absolute inset-0" />
    </div>
  );
}
