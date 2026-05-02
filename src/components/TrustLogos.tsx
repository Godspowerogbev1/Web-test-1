import { motion } from "motion/react";

const LOGOS = [
  { name: "Verge", url: "https://picsum.photos/seed/verge/200/80" },
  { name: "TechCrunch", url: "https://picsum.photos/seed/tc/200/80" },
  { name: "Wired", url: "https://picsum.photos/seed/wired/200/80" },
  { name: "Forbes", url: "https://picsum.photos/seed/forbes/200/80" },
  { name: "Fast Company", url: "https://picsum.photos/seed/fc/200/80" },
];

export default function TrustLogos() {
  return (
    <div className="py-12 border-y border-white/5 bg-black/20 backdrop-blur-sm overflow-hidden">
      <div className="container mx-auto px-6 mb-8 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 font-bold">Featured in & Trusted by</p>
      </div>
      <div className="flex overflow-hidden">
        <motion.div
          animate={{ x: [0, -1035] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
          className="flex gap-24 whitespace-nowrap px-12"
        >
          {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, idx) => (
            <div key={idx} className="flex items-center justify-center grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer">
              <span className="text-2xl font-black italic tracking-tighter text-white opacity-50">{logo.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
