import { motion } from "motion/react";
import { BLOG_POSTS } from "../constants";
import { Link } from "react-router-dom";
import { Search, Mail } from "lucide-react";
import { useState, useMemo } from "react";

export default function Blog() {
  const [search, setSearch] = useState("");

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => 
      post.title.toLowerCase().includes(search.toLowerCase()) || 
      post.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="min-h-screen pt-32 pb-32">
      <div className="container mx-auto px-6">
        <header className="max-w-4xl mb-24">
          <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter mb-10">RESOURCES.</h1>
          <p className="text-2xl text-neutral-400 leading-relaxed font-light mb-12">
            Tips, tutorials, and industry breakthroughs we're tracking. Built to help you scale your digital presence.
          </p>
          <div className="relative max-w-xl group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search resources..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-neutral-900 border border-white/5 rounded-full py-5 pl-16 pr-8 text-white focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                {/* ... existing content ... */}
                <div className="aspect-video relative overflow-hidden rounded-sm mb-8 bg-neutral-900">
                  <img src={post.image} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest">{post.category}</span>
                  </div>
                </div>
                <p className="text-neutral-500 font-bold text-xs uppercase tracking-widest mb-4">{post.date}</p>
                <h2 className="text-4xl font-black italic tracking-tight mb-4 group-hover:text-blue-500 transition-colors">{post.title}</h2>
                <p className="text-neutral-400 text-lg leading-relaxed max-w-xl mb-8">{post.excerpt}</p>
                <button className="flex items-center gap-3 text-white font-bold uppercase tracking-widest text-xs">
                  Read Guide <div className="h-px w-8 bg-blue-600 group-hover:w-16 transition-all" />
                </button>
              </motion.article>
            ))
          ) : (
            <p className="text-neutral-500 italic text-xl">No resources found matching your search.</p>
          )}
        </div>

        {/* Newsletter / Lead Magnet */}
        <section className="bg-blue-600 p-12 md:p-24 rounded-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl -translate-y-1/2 translate-x-1/2 rounded-full" />
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white mb-6">GET OUR EXCLUSIVE 2026 TREND REPORT.</h2>
            <p className="text-blue-100 text-xl font-medium mb-12">Join 15,000+ industry leaders receiving weekly insights on performance marketing and design trends.</p>
            <form className="flex flex-col sm:row gap-4" onSubmit={e => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="you@company.com" 
                className="flex-1 bg-white/10 border border-white/20 rounded-sm py-4 px-6 text-white placeholder:text-white/50 focus:outline-none focus:bg-white/20"
              />
              <button className="bg-white text-blue-600 px-8 py-4 font-black italic tracking-tight uppercase hover:bg-neutral-100 transition-colors">Subscribe Now</button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
