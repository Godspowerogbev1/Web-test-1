import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Zap, Play, Layout, Box, Palette, Monitor, Globe, BarChart3 } from "lucide-react";
import { cn } from "../lib/utils";

export default function Services() {
  const serviceCategories = [
    {
      title: "BRANDING",
      icon: Palette,
      desc: "Architecting visual identities that don't just look good, but command authority and market dominance.",
      list: ["Identity Systems", "Positioning", "Visual Guidelines", "Typography", "Logos"]
    },
    {
      title: "MOTION",
      icon: Play,
      desc: "Bringing static worlds to life through cinematic transitions, kinetic type, and 3D storytelling.",
      list: ["Launch Videos", "Social Ticker", "UI Motion", "3D Animation", "Commercials"]
    },
    {
      title: "DIGITAL",
      icon: Monitor,
      desc: "Building high-conversion web engines that merge brutalist aesthetics with technical resilience.",
      list: ["Headless E-Com", "Marketing Sites", "SaaS Dashboards", "Interaction Design", "Web 3.0"]
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-32">
       <div className="container mx-auto px-6">
          <header className="mb-32">
             <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter mb-10 leading-none">CAPABILITIES.</h1>
             <p className="text-2xl text-neutral-400 font-light max-w-2xl leading-relaxed italic uppercase">We provide a high-end service layer for brands that refuse to blend in.</p>
          </header>

          <div className="grid grid-cols-1 gap-40">
             {serviceCategories.map((service, i) => (
                <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                   <div>
                      <div className="flex items-center gap-6 mb-12">
                         <div className="w-20 h-20 bg-blue-600 rounded-sm flex items-center justify-center text-white">
                            <service.icon size={40} />
                         </div>
                         <h2 className="text-6xl font-black italic tracking-tighter">{service.title}</h2>
                      </div>
                      <p className="text-3xl text-neutral-300 font-light leading-relaxed mb-12 italic">"{service.desc}"</p>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-4 pt-12 border-t border-white/5">
                         {service.list.map((item, idx) => (
                           <div key={idx} className="flex items-center gap-3 text-neutral-500 font-bold uppercase text-xs tracking-widest">
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                              {item}
                           </div>
                         ))}
                      </div>
                   </div>
                   <div className="relative aspect-video rounded-sm overflow-hidden bg-neutral-900 border border-white/5 shadow-2xl shadow-blue-900/10">
                      <img 
                        src={`https://picsum.photos/seed/service${i}/1200/800`} 
                        className="w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700" 
                        referrerPolicy="no-referrer"
                      />
                   </div>
                </div>
             ))}
          </div>

          {/* Engagement Models */}
          <section className="mt-60">
             <h2 className="text-center text-4xl font-black italic tracking-tighter mb-24 uppercase underline decoration-blue-600 decoration-4">The Engagement Matrix</h2>
             <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  { name: "Platform", price: "$49/mo", desc: "Access to the Digital Lab workbench, AI tools, and 200M+ asset library. Built for solo-scale innovators.", featured: false, link: "/lab" },
                  { name: "Sprints", price: "Starting $5k", desc: "For specific visual assets, high-impact logos, or hero landing pages. High speed, high output.", featured: false, link: "/contact" },
                  { name: "Project", price: "Starting $25k", desc: "The standard deep-dive for brand overhauls or full digital product builds.", featured: true, link: "/contact" },
                  { name: "Retainer", price: "Inquire", desc: "For global scale-ups needing consistent high-end support and ongoing creative innovation.", featured: false, link: "/contact" }
                ].map((tier, i) => (
                  <div key={i} className={cn(
                    "p-10 border border-white/10 rounded-sm flex flex-col gap-6 transition-all group hover:border-blue-600",
                    tier.featured ? "bg-neutral-900 border-blue-600 lg:scale-110 z-10" : "bg-black"
                  )}>
                    <h3 className="text-md font-bold uppercase tracking-[0.2em]">{tier.name}</h3>
                    <p className="text-4xl font-black italic text-white font-mono tracking-tighter">{tier.price}</p>
                    <p className="text-neutral-500 text-sm leading-relaxed min-h-[80px]">{tier.desc}</p>
                    <Link to={tier.link} className={cn(
                      "mt-auto py-5 text-center font-black uppercase tracking-widest text-[10px] transition-all",
                      tier.featured ? "bg-blue-600 text-white" : "bg-white text-black hover:bg-neutral-200"
                    )}>
                      {tier.name === "Platform" ? "Enter Lab" : "Schedule Call"}
                    </Link>
                  </div>
                ))}
             </div>
          </section>
       </div>
    </div>
  );
}
