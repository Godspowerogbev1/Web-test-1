import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Beaker, Sparkles, Code2, Layers, RefreshCw, Copy, Check,
  Upload, Download, Lock, Wand2, X, Sliders, Image as ImageIcon
} from "lucide-react";
import { LAB_PROJECTS } from "../constants";
import { cn } from "@/src/lib/utils";
import { useAuth } from "../context/AuthContext";
import { db, doc, updateDoc, handleFirestoreError, OperationType } from "../lib/firebase";

export default function Lab() {
  const { user, userData } = useAuth();
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    grayscale: 0,
  });
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [localDownloads, setLocalDownloads] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Derived downloads based on auth status
  const today = new Date().toLocaleDateString();
  const downloadsToday = userData?.dailyDownloads?.date === today 
    ? userData.dailyDownloads.count 
    : localDownloads;

  const isPremium = userData?.isPremium || false;

  useEffect(() => {
    if (!user) {
      const stored = localStorage.getItem("lab_downloads");
      if (stored) {
        const { date, count } = JSON.parse(stored);
        if (date === today) {
          setLocalDownloads(count);
        } else {
          localStorage.setItem("lab_downloads", JSON.stringify({ date: today, count: 0 }));
          setLocalDownloads(0);
        }
      }
    }
  }, [user, today]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setActiveImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const resetFilters = () => {
    setFilters({ brightness: 100, contrast: 100, grayscale: 0 });
  };

  const handleDownload = async () => {
    if (!isPremium && downloadsToday >= 3) {
      setShowPremiumModal(true);
      return;
    }

    if (!activeImage) return;

    // Create a temporary canvas to apply filters and export
    const img = new Image();
    img.src = activeImage;
    img.onload = async () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;

      // Apply CSS-like filters to canvas
      ctx.filter = `brightness(${filters.brightness}%) contrast(${filters.contrast}%) grayscale(${filters.grayscale}%)`;
      ctx.drawImage(img, 0, 0);

      // Trigger download
      const link = document.createElement("a");
      link.download = `lumina-lab-export-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      // Update count
      const newCount = downloadsToday + 1;
      
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        try {
          await updateDoc(userDocRef, {
            dailyDownloads: { date: today, count: newCount }
          });
        } catch (error) {
          handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
        }
      } else {
        setLocalDownloads(newCount);
        localStorage.setItem("lab_downloads", JSON.stringify({ date: today, count: newCount }));
      }
    };
  };

  return (
    <div className="min-h-screen pt-32 pb-32 bg-black">
      <div className="container mx-auto px-6">
        <header className="mb-24">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-500">
              <Beaker size={20} />
            </div>
            <span className="text-blue-500 font-black uppercase tracking-[0.4em] text-xs">Digital Lab v2.0</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter mb-10">THE LAB.</h1>
          <p className="text-2xl text-neutral-400 font-light max-w-3xl leading-relaxed italic">
            Where we break things, build prototypes, and explore the future of digital interaction.
          </p>
        </header>

        {/* Experiment 01: Image Editor Workspace */}
        <section className="mb-40">
           <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <span className="text-xs font-black text-neutral-600 uppercase tracking-widest mb-4 block">Experiment #001 — Direct Manipulation</span>
                <h2 className="text-5xl font-black italic tracking-tighter uppercase">AESTHETIC <br /> WORKBENCH™</h2>
              </div>
              <div className="bg-neutral-900 border border-white/5 p-4 rounded-sm">
                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-1">Daily Export Quota</p>
                <div className="flex items-center gap-4">
                  <div className="flex gap-1">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={cn("w-3 h-3 rounded-full border border-white/10", i <= 3 - downloadsToday ? "bg-blue-600" : "bg-neutral-800")} />
                    ))}
                  </div>
                  <span className="text-xs font-mono text-white">{3 - downloadsToday} Left</span>
                </div>
              </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 bg-neutral-950 border border-white/5 rounded-sm overflow-hidden p-8 shadow-2xl">
              {/* Sidebar Controls */}
              <div className="lg:col-span-1 space-y-8 bg-black/40 backdrop-blur-xl p-8 rounded-sm border border-white/5">
                 <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-blue-500 mb-6 flex items-center gap-2">
                       <Sliders size={14} /> Core Filters
                    </h3>
                    <div className="space-y-6">
                       <div className="space-y-3">
                          <div className="flex justify-between text-[10px] font-bold uppercase text-neutral-500">
                             <span>Brightness</span>
                             <span>{filters.brightness}%</span>
                          </div>
                          <input 
                            type="range" min="0" max="200" value={filters.brightness}
                            onChange={(e) => setFilters({...filters, brightness: parseInt(e.target.value)})}
                            className="w-full accent-blue-600 h-1 bg-neutral-800 rounded-sm appearance-none cursor-pointer"
                          />
                       </div>

                       <div className="space-y-3">
                          <div className="flex justify-between text-[10px] font-bold uppercase text-neutral-500">
                             <span>Contrast</span>
                             <span>{filters.contrast}%</span>
                          </div>
                          <input 
                             type="range" min="0" max="200" value={filters.contrast}
                             onChange={(e) => setFilters({...filters, contrast: parseInt(e.target.value)})}
                             className="w-full accent-blue-600 h-1 bg-neutral-800 rounded-sm appearance-none cursor-pointer"
                          />
                       </div>

                       <div className="space-y-3">
                          <div className="flex justify-between text-[10px] font-bold uppercase text-neutral-500">
                             <span>Grayscale</span>
                             <span>{filters.grayscale}%</span>
                          </div>
                          <input 
                             type="range" min="0" max="100" value={filters.grayscale}
                             onChange={(e) => setFilters({...filters, grayscale: parseInt(e.target.value)})}
                             className="w-full accent-blue-600 h-1 bg-neutral-800 rounded-sm appearance-none cursor-pointer"
                          />
                       </div>
                    </div>
                 </div>

                 <div className="pt-8 border-t border-white/5 space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-neutral-600 mb-4">Pro Capabilities</h3>
                    <button 
                      onClick={() => setShowPremiumModal(true)}
                      className="w-full group flex items-center justify-between p-4 bg-neutral-900 border border-white/5 rounded-sm hover:border-blue-600 transition-all text-left"
                    >
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-sm bg-neutral-800 flex items-center justify-center text-neutral-500 group-hover:text-blue-500">
                            <Wand2 size={16} />
                          </div>
                          <span className="text-sm font-bold italic text-neutral-400 group-hover:text-white">AI BG Removal</span>
                       </div>
                       <Lock size={14} className="text-neutral-600 group-hover:text-blue-600" />
                    </button>

                    <button 
                      onClick={() => setShowPremiumModal(true)}
                      className="w-full group flex items-center justify-between p-4 bg-neutral-900 border border-white/5 rounded-sm hover:border-blue-600 transition-all text-left"
                    >
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-sm bg-neutral-800 flex items-center justify-center text-neutral-500 group-hover:text-blue-500">
                            <Sparkles size={16} />
                          </div>
                          <span className="text-sm font-bold italic text-neutral-400 group-hover:text-white">Neural Upscale</span>
                       </div>
                       <Lock size={14} className="text-neutral-600 group-hover:text-blue-600" />
                    </button>
                 </div>

                 <div className="pt-8">
                    <button 
                      onClick={resetFilters}
                      className="w-full flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-neutral-600 hover:text-white transition-colors"
                    >
                       <RefreshCw size={14} /> Clear All Params
                    </button>
                 </div>
              </div>

              {/* Workspace Area */}
              <div className="lg:col-span-3 relative bg-black rounded-sm border border-white/5 flex items-center justify-center min-h-[500px] overflow-hidden group">
                 <input 
                   type="file" accept="image/*" className="hidden" 
                   ref={fileInputRef} onChange={handleFileUpload}
                 />

                 {activeImage ? (
                   <div className="relative w-full h-full p-12 flex items-center justify-center">
                      <motion.img 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        src={activeImage} 
                        alt="Editor Preview"
                        className="max-w-full max-h-full object-contain shadow-2xl transition-all duration-300"
                        style={{
                          filter: `brightness(${filters.brightness}%) contrast(${filters.contrast}%) grayscale(${filters.grayscale}%)`
                        }}
                      />
                      <div className="absolute top-8 right-8 flex gap-4">
                         <button 
                           onClick={() => fileInputRef.current?.click()}
                           className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-blue-600 transition-colors"
                         >
                            <RefreshCw size={18} />
                         </button>
                         <button 
                            onClick={handleDownload}
                            className="p-3 bg-white group-hover:bg-blue-500 text-black hover:text-white rounded-full transition-colors"
                         >
                            <Download size={18} />
                         </button>
                      </div>
                   </div>
                 ) : (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="text-center space-y-6 cursor-pointer group/upload px-12"
                    >
                       <div className="w-24 h-24 bg-neutral-900 border border-white/5 rounded-full flex items-center justify-center mx-auto group-hover/upload:border-blue-600 transition-all group-hover/upload:scale-110">
                          <Upload className="text-neutral-600 group-hover/upload:text-blue-500" size={32} />
                       </div>
                       <div>
                          <p className="text-xl font-black italic tracking-tighter text-neutral-400 group-hover/upload:text-white">DROP MEDIA TO START</p>
                          <p className="text-[10px] uppercase font-bold tracking-widest text-neutral-600 mt-2">Compatible with PNG, JPG, WebP</p>
                       </div>
                       <div className="pt-8">
                          <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">Select from Device</button>
                       </div>
                    </div>
                 )}

                 {/* Corner Overlay Status */}
                 <div className="absolute bottom-6 left-6 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-600">Renderer_Idle.bin</span>
                 </div>
              </div>
           </div>
        </section>

        {/* Research Archives */}
        <section className="mb-40 px-4">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-2xl">
                 <h2 className="text-sm font-black uppercase tracking-[0.3em] text-blue-500 mb-6">Research Archives</h2>
                 <h3 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-6">THE DIGITAL <br /> PLAYGROUND.</h3>
                 <p className="text-neutral-500 text-xl italic leading-relaxed">
                   Think of the archives as our "Code Snacks." These are experimental snapshots, visual theories, and architectural demos that aren't products yet—they are proof of a perspective.
                 </p>
              </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {LAB_PROJECTS.map((proj) => (
                <div key={proj.id} className="p-10 bg-neutral-900 border border-white/5 rounded-sm hover:border-blue-600 transition-colors group">
                   <div className="flex justify-between items-start mb-10">
                      <div className="p-4 bg-black rounded-sm text-blue-500 group-hover:scale-110 transition-transform">
                         {proj.type === "Tool" ? <Code2 size={24} /> : <Layers size={24} />}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 text-neutral-500 border border-white/10">{proj.type}</span>
                   </div>
                   <h3 className="text-3xl font-black italic tracking-tight mb-4 uppercase">{proj.title}</h3>
                   <p className="text-neutral-500 text-lg leading-relaxed mb-8">{proj.description}</p>
                   <div className="flex gap-4">
                      {proj.tags.map(tag => (
                        <span key={tag} className="text-xs font-bold text-blue-600 italic">#{tag}</span>
                      ))}
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* Comparison Matrix */}
        <section className="mb-40 py-24 border-t border-white/5 px-4 overflow-hidden">
           <div className="text-center mb-24">
              <span className="text-blue-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Capabilities Matrix</span>
              <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-8">FREE VS. LEGEND.</h2>
              <p className="text-neutral-500 max-w-xl mx-auto italic text-lg leading-relaxed">
                The Legend Tier isn't just access; it's a force multiplier for your digital output.
              </p>
           </div>

           <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-1 border-b border-white/10 pb-6 mb-6 px-8 text-[10px] font-black uppercase tracking-widest text-neutral-600">
                 <div className="hidden md:block italic">Functional Domain</div>
                 <div className="hidden md:block">Free / Basic</div>
                 <div className="hidden md:block text-blue-500">Legend Access</div>
              </div>
              <div className="space-y-4">
                 {[
                   { f: "Editing Tools", free: "Basic trimming, cropping & text", pro: "Advanced AI BG Removal & 4K Neutral Exports" },
                   { f: "Generative AI", free: "10 Monthly Credits", pro: "Priority Unlimited / High-Cap Generation" },
                   { f: "Asset Library", free: "100k Standard Templates", pro: "200M+ Royalty-Free Assets & 30k Fonts" },
                   { f: "Brand Management", free: "Manual Color/Logo Setup", pro: "Integrated 'Brand Kits' for Consistency" },
                   { f: "Scale & Storage", free: "5GB Storage / 1 Account", pro: "100GB+ / Multi-Platform Scheduling" },
                 ].map((row, i) => (
                    <div key={i} className="grid grid-cols-1 md:grid-cols-3 items-center p-8 bg-neutral-900/50 border border-white/5 hover:border-blue-600/30 transition-all group rounded-sm">
                       <div className="font-black italic text-white uppercase tracking-tight mb-2 md:mb-0">{row.f}</div>
                       <div className="text-neutral-500 text-sm mb-4 md:mb-0 md:border-l md:border-white/5 md:pl-8">{row.free}</div>
                       <div className="text-blue-500 font-bold italic text-sm md:border-l md:border-white/5 md:pl-8">{row.pro}</div>
                    </div>
                 ))}
              </div>
              <div className="mt-16 text-center">
                 <button 
                  onClick={() => setShowPremiumModal(true)}
                  className="bg-blue-600 text-white px-12 py-6 text-xl font-black italic tracking-tighter uppercase hover:bg-blue-700 transition-all hover:scale-105 rounded-sm shadow-2xl shadow-blue-600/20"
                 >
                   Become a Legend — $49/mo
                 </button>
              </div>
           </div>
        </section>

        {/* ... Lab Footer ... */}
        <section className="mt-40 text-center py-20 bg-neutral-950 border border-white/5 rounded-sm">
           <p className="text-5xl md:text-7xl font-black italic tracking-tighter text-white/10 mb-8 select-none">CODE / ART / LOGIC</p>
           <p className="text-neutral-500 max-w-xl mx-auto italic text-lg leading-relaxed">
             "Our lab is an open invitation to join the construction of the future."
           </p>
        </section>
      </div>

      {/* Premium Modal */}
      <AnimatePresence>
        {showPremiumModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPremiumModal(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-lg"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-neutral-900 border border-blue-600/30 p-12 rounded-sm text-center shadow-[0_0_50px_rgba(37,99,235,0.2)]"
            >
              <button 
                onClick={() => setShowPremiumModal(false)}
                className="absolute top-6 right-6 text-neutral-500 hover:text-white"
              >
                <X size={24} />
              </button>
              <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-500 mx-auto mb-8">
                <Lock size={32} />
              </div>
              <h2 className="text-4xl font-black italic tracking-tighter mb-6 uppercase">RESTRICTED ACCESS.</h2>
              <p className="text-neutral-400 text-lg leading-relaxed mb-10 italic">
                You've reached your free daily limit. Upgrade to <strong>Legend Access</strong> for Unlimited Exports, AI Background Removal, High-Cap Generative AI, and our 200M+ Asset Library.
              </p>
              <div className="space-y-4">
                 <button className="w-full bg-blue-600 text-white py-5 font-black italic tracking-tight uppercase hover:bg-blue-700 transition-all rounded-sm shadow-xl shadow-blue-600/20">
                   Get Unlimited Access — $49/mo
                 </button>
                 <button 
                  onClick={() => setShowPremiumModal(false)}
                  className="w-full py-4 text-xs font-black uppercase tracking-widest text-neutral-600 hover:text-white transition-colors"
                 >
                   Maybe Later
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

