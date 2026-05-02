import { useParams, Link, Navigate } from "react-router-dom";
import { CASE_STUDIES } from "../constants";
import { motion } from "motion/react";
import { ArrowLeft, Quote, Star, CheckCircle2 } from "lucide-react";

export default function CaseStudyDetails() {
  const { id } = useParams();
  const study = CASE_STUDIES.find((s) => s.id === id);

  if (!study) return <Navigate to="/portfolio" />;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[80vh] flex items-end pb-20">
        <div className="absolute inset-0 z-0">
          <img
            src={study.mainImage}
            className="w-full h-full object-cover grayscale brightness-25"
            alt={study.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <Link to="/portfolio" className="group flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8 font-bold uppercase tracking-widest text-xs">
            <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
            Back to All Projects
          </Link>
          <div className="flex items-center gap-6 mb-6">
             <img src={study.logo} className="w-16 h-16 grayscale brightness-200" alt={study.client} />
             <span className="h-px w-12 bg-blue-600"></span>
             <p className="text-blue-500 font-black italic tracking-widest text-lg">{study.category.toUpperCase()}</p>
          </div>
          <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter leading-none max-w-5xl">{study.title}</h1>
        </div>
      </section>

      {/* Metrics Bar */}
      <section className="bg-neutral-900 py-12 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            {study.results.map((res, i) => (
              <div key={i} className="flex flex-col gap-2">
                <p className="text-xs uppercase tracking-[0.3em] font-black text-neutral-500">{res.metric}</p>
                <p className="text-6xl font-black italic text-blue-600 font-mono tracking-tighter">{res.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
            <div className="lg:col-span-2 space-y-24">
              <div>
                <h2 className="text-xs uppercase tracking-[0.4em] font-black text-blue-500 mb-8 flex items-center gap-4">
                   <div className="w-2 h-2 bg-blue-500 rounded-full" />
                   THE CHALLENGE
                </h2>
                <p className="text-3xl md:text-4xl font-medium text-neutral-300 leading-relaxed italic">
                  "{study.problem}"
                </p>
              </div>

              <div>
                <h2 className="text-xs uppercase tracking-[0.4em] font-black text-blue-500 mb-8 flex items-center gap-4">
                   <div className="w-2 h-2 bg-blue-500 rounded-full" />
                   OUR STRATEGY
                </h2>
                <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed font-light">
                  {study.solution}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
                {study.gallery.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="overflow-hidden bg-neutral-900 rounded-sm"
                  >
                    <img src={img} className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" alt="Gallery" />
                  </motion.div>
                ))}
              </div>
            </div>

            <aside className="lg:sticky lg:top-32 h-fit space-y-12">
              <div className="bg-neutral-900 p-10 rounded-sm border border-white/5 relative">
                <Quote className="absolute top-6 right-6 text-blue-900 opacity-30" size={64} />
                <div className="flex gap-1 mb-6 text-yellow-500">
                  {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-xl italic text-white mb-10 leading-relaxed relative z-10">"{study.testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden grayscale">
                    <img src={study.testimonial.image} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white uppercase text-sm tracking-tighter">{study.testimonial.author}</h4>
                    <p className="text-neutral-500 text-[10px] font-black uppercase tracking-[0.2em]">{study.testimonial.role}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 px-4">
                <h3 className="text-sm font-black uppercase tracking-widest text-neutral-500">Industry Recognition</h3>
                <div className="flex flex-col gap-4">
                   {["App of the Year 2026", "Awwwards Site of the Day", "FWA Mobile Excellence"].map((award, i) => (
                     <div key={i} className="flex items-center gap-3 text-neutral-400">
                       <CheckCircle2 size={16} className="text-blue-500" />
                       <span className="text-sm font-bold italic">{award}</span>
                     </div>
                   ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Next Project */}
      <section className="py-20 border-t border-white/5">
        <div className="container mx-auto px-6 flex justify-between items-center">
            <p className="text-neutral-500 font-black italic text-2xl">Want to see more?</p>
            <Link to="/portfolio" className="text-white font-black italic text-5xl hover:text-blue-500 transition-colors tracking-tighter">NEXT PROJECT →</Link>
        </div>
      </section>
    </div>
  );
}
