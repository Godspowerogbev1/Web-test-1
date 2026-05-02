import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { CASE_STUDIES } from "../constants";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/src/lib/utils";

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<"All" | "Branding" | "Video" | "Web">("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return CASE_STUDIES;
    return CASE_STUDIES.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  const categories = ["All", "Branding", "Video", "Web"] as const;

  return (
    <div className="min-h-screen pt-32 pb-32">
      <div className="container mx-auto px-6">
        <header className="mb-20">
          <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter mb-12">WORK.</h1>
          
          <div className="flex flex-wrap gap-4 md:gap-12 items-center border-y border-white/5 py-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={cn(
                  "text-lg md:text-2xl font-black italic tracking-tighter transition-all relative px-2",
                  activeFilter === cat ? "text-blue-500 translate-x-2" : "text-neutral-600 hover:text-white"
                )}
              >
                {activeFilter === cat && (
                  <motion.div layoutId="filter" className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full" />
                )}
                {cat.toUpperCase()} /
              </button>
            ))}
            <span className="ml-auto hidden md:block text-xs uppercase tracking-widest text-neutral-500 font-bold">
              Showing {filteredProjects.length} Selected Projects
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <Link to={`/case-studies/${project.id}`} className="group block">
                  <div className="relative overflow-hidden aspect-[4/5] bg-neutral-900 rounded-sm mb-8">
                    <img
                      src={project.mainImage}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-8 right-8">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-500">
                        <ArrowUpRight className="text-black" />
                      </div>
                    </div>
                    <div className="absolute bottom-8 left-8">
                       <span className="px-4 py-2 bg-blue-600/90 backdrop-blur-md text-white text-xs font-black uppercase tracking-widest">{project.category}</span>
                    </div>
                  </div>
                  <h3 className="text-3xl font-black italic tracking-tight mb-2 group-hover:text-blue-400 transition-colors underline decoration-white/0 group-hover:decoration-blue-400 decoration-2 underline-offset-8 uppercase">{project.title}</h3>
                  <p className="text-neutral-500 text-lg leading-relaxed max-w-md">{project.client} — {project.problem.substring(0, 80)}...</p>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
