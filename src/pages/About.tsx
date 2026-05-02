import { TEAM } from "../constants";
import { motion } from "motion/react";
import { Award, Target, Zap, Globe } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen pt-32 pb-32">
      <div className="container mx-auto px-6">
        {/* Story Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-40">
          <div>
            <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-sm mb-6 block">Our Story</span>
            <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter leading-[0.85] mb-12">BUILT ON <br /> OBSESSION.</h1>
          </div>
          <div className="flex flex-col justify-end space-y-8">
            <p className="text-2xl text-neutral-400 font-light leading-relaxed">
              Lumina wasn't founded in a boardroom. It was founded in a dim-lit studio with a single monitor and an obsession with how pixels could make people <span className="text-white font-black italic underline decoration-blue-600 italic">feel</span>.
            </p>
            <p className="text-xl text-neutral-500 leading-relaxed">
              We started as a boutique motion house in 2014. Today, we're a global creative partner for companies like Quantum Tech and Vortex Gaming. We don't believe in "client servicing"; we believe in artistic warfare against the mundane.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8">
               <div>
                  <p className="text-4xl font-black italic text-white mb-2 underline decoration-blue-600">12+</p>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-black">Years in the Trenches</p>
               </div>
               <div>
                  <p className="text-4xl font-black italic text-white mb-2 underline decoration-blue-600">300+</p>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-black">Projects Delivered</p>
               </div>
            </div>
          </div>
        </section>

        {/* Why We Are Different */}
        <section className="bg-neutral-900 p-12 md:p-24 rounded-sm mb-40">
           <h2 className="text-4xl font-black italic mb-16 text-center">WHY WE'RE DIFFERENT.</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { icon: Zap, title: "Speed to Impact", desc: "We deploy lean teams that move at the speed of startup culture." },
                { icon: Target, title: "Data-Infused Design", desc: "Aesthetics are the bait; data performance is the hook." },
                { icon: Award, title: "Elite Craft", desc: "No junior-level work. You get the veterans on every single frame." },
                { icon: Globe, title: "Global Context", desc: "We understand localized markets across US, EU, and APAC." }
              ].map((item, i) => (
                <div key={i} className="space-y-6">
                   <div className="w-12 h-12 bg-blue-600/10 rounded-full flex items-center justify-center text-blue-500">
                      <item.icon size={24} />
                   </div>
                   <h3 className="text-xl font-bold uppercase tracking-tighter">{item.title}</h3>
                   <p className="text-neutral-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
           </div>
        </section>

        {/* Team Section */}
        <section>
          <div className="flex justify-between items-end mb-24 px-4">
             <h2 className="text-7xl font-black italic tracking-tighter">THE TEAM.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            {TEAM.map((member) => (
              <motion.div 
                key={member.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="aspect-[4/5] overflow-hidden grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 mb-8 bg-neutral-950 rounded-sm">
                  <img src={member.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                </div>
                <div className="flex items-center gap-4 mb-4">
                   <span className="h-px w-12 bg-blue-600" />
                   <h3 className="text-3xl font-black italic tracking-tight">{member.name}</h3>
                </div>
                <p className="text-blue-500 font-black uppercase text-xs tracking-widest mb-6">{member.role}</p>
                <p className="text-neutral-400 text-xl font-light leading-relaxed max-w-md italic">"{member.bio}"</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
