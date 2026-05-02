import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Play, Star, Sparkles } from "lucide-react";
import { CASE_STUDIES, BLOG_POSTS } from "../constants";
import Counter from "../components/Counter";
import TrustLogos from "../components/TrustLogos";
import BeforeAfterSlider from "../components/BeforeAfterSlider";

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-black z-10" />
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ duration: 1.5 }}
            src="https://picsum.photos/seed/studio/1920/1080?blur=5"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="container mx-auto px-6 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-[clamp(3.5rem,10vw,8rem)] font-black italic leading-[0.85] tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-neutral-500">
              WE CRAFT DIGITAL <br /> LEGENDS.
            </h1>
            <p className="text-xl md:text-2xl text-neutral-400 mb-10 max-w-2xl leading-relaxed">
              We are a high-end design & motion studio transforming complex problems into award-winning visual experiences.
            </p>
            <div className="flex flex-col sm:row items-center gap-6">
              <Link
                to="/portfolio"
                className="group flex items-center gap-4 bg-blue-600 text-white px-8 py-5 text-lg font-bold rounded-sm hover:bg-blue-700 transition-all hover:scale-105"
              >
                View Selected Works
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link
                to="/diagnostic"
                className="group flex items-center gap-4 border border-white/20 text-white px-8 py-5 text-lg font-bold rounded-sm hover:bg-white/10 transition-all"
              >
                Free Design Audit
                <Sparkles className="group-hover:rotate-12 transition-transform text-blue-500" />
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Floating Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-600 font-black">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-blue-600 to-transparent" />
        </div>
      </section>

      {/* Trust Ticker */}
      <TrustLogos />

      {/* Stats / Interactive Counter */}
      <section className="py-20 bg-neutral-950">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { label: "Successful Launches", value: 120, suffix: "+" },
              { label: "Awards Won", value: 45, suffix: "" },
              { label: "Revenue Generated", value: 50, suffix: "M+" },
              { label: "Combined Experience", value: 15, suffix: "Y" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <h3 className="text-5xl md:text-7xl font-black italic text-blue-600 mb-2 font-mono">
                  <Counter value={stat.value} />
                  {stat.suffix}
                </h3>
                <p className="text-neutral-500 uppercase tracking-widest text-xs font-bold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-32 bg-black">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-blue-500 font-bold uppercase tracking-[0.3em] text-sm mb-4 block">Proven Excellence</span>
              <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-none mb-6">REAL RESULTS, <br /> NOT JUST PIXELS.</h2>
            </div>
            <Link to="/portfolio" className="text-lg font-bold border-b-2 border-blue-600 pb-1 hover:text-blue-400 transition-colors">
              Explore All Case Studies
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-32">
            {CASE_STUDIES.map((study, idx) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className={idx % 2 !== 0 ? 'lg:order-2' : ''}>
                  <img
                    src={study.mainImage}
                    className="w-full aspect-[4/3] object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700"
                    alt={study.title}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col gap-8">
                  <img src={study.logo} className="w-12 h-12 grayscale brightness-200" alt={study.client} referrerPolicy="no-referrer" />
                  <h3 className="text-4xl md:text-5xl font-black italic tracking-tight">{study.title}</h3>
                  <div className="grid grid-cols-3 gap-4 border-y border-white/10 py-6">
                    {study.results.map((res, i) => (
                      <div key={i}>
                        <p className="text-2xl font-bold text-white leading-none mb-1 font-mono">{res.value}</p>
                        <p className="text-[10px] uppercase text-neutral-500 tracking-wider font-bold">{res.metric}</p>
                      </div>
                    ))}
                  </div>
                  <blockquote className="text-xl text-neutral-400 italic font-medium leading-relaxed bg-neutral-900/50 p-6 rounded-sm border-l-4 border-blue-600">
                    "{study.testimonial.quote}"
                  </blockquote>
                  <Link
                    to={`/case-studies/${study.id}`}
                    className="group flex items-center gap-2 text-white font-bold uppercase tracking-widest text-sm"
                  >
                    Read Full Case Study
                    <ChevronRight className="group-hover:translate-x-2 transition-transform text-blue-500" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-32 bg-neutral-950">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <h2 className="text-4xl font-black italic mb-12">TRANSFORMATION MATTERS.</h2>
          <BeforeAfterSlider
            beforeImage="https://picsum.photos/seed/before/1200/800?grayscale=1"
            afterImage="https://picsum.photos/seed/after/1200/800"
          />
          <p className="mt-8 text-neutral-500 max-w-xl mx-auto">
            Drag the slider to see how we transformed EcoStyle's outdated interface into a modern, high-conversion engine.
          </p>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-32 bg-black overflow-hidden">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter text-center mb-24">CLIENT VOICES.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="bg-neutral-900 p-8 rounded-sm border border-white/5 relative">
                <Star className="text-blue-500 absolute top-8 right-8" fill="currentColor" size={24} />
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img src={`https://picsum.photos/seed/user${i}/200/200`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Client Name {i+1}</h4>
                    <p className="text-neutral-500 text-xs uppercase tracking-widest font-black">Design Manager, Company</p>
                  </div>
                </div>
                <p className="text-lg text-neutral-300 italic leading-relaxed">
                  "Lumina transformed our vision into an incredible reality. The level of detail and artistic flair they bring is unmatched in the industry."
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog / Resources Section */}
      <section className="py-32 bg-neutral-950">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16 px-4">
            <h2 className="text-5xl font-black italic">RESOURCES & TIPS</h2>
            <Link to="/blog" className="text-blue-500 font-bold hover:underline">View Blog</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {BLOG_POSTS.map((post) => (
              <Link key={post.id} to="/blog" className="group">
                <div className="overflow-hidden mb-6 aspect-video rounded-sm bg-neutral-900">
                  <img
                    src={post.image}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100"
                    alt={post.title}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-[10px] uppercase tracking-[0.4em] font-black text-blue-500 mb-4 block">{post.category} — {post.date}</span>
                <h3 className="text-3xl font-black italic tracking-tight mb-4 group-hover:text-blue-400 transition-colors">{post.title}</h3>
                <p className="text-neutral-500 text-lg leading-relaxed">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 bg-blue-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-12">LET'S BUILD <br /> YOUR LEGACY.</h2>
          <Link
            to="/contact"
            className="inline-block bg-white text-black px-12 py-6 text-xl font-black rounded-sm hover:bg-neutral-200 transition-all hover:scale-105"
          >
            START YOUR PROJECT TODAY
          </Link>
        </div>
      </section>
    </div>
  );
}
