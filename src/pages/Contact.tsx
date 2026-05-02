import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-32 pb-32">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
          {/* Info */}
          <div className="space-y-16">
            <header>
              <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-500">HIRE US /</h1>
              <p className="text-2xl text-neutral-400 leading-relaxed font-light italic uppercase">Ready to build your digital legacy?</p>
            </header>

            <div className="space-y-12">
              <div className="flex gap-8 group cursor-pointer">
                <div className="w-16 h-16 bg-neutral-900 border border-white/5 rounded-sm flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-widest font-black mb-2">Inquiries</p>
                  <p className="text-2xl font-black italic text-white group-hover:text-blue-400 transition-colors">hello@lumina.studio</p>
                </div>
              </div>

              <div className="flex gap-8 group cursor-pointer">
                <div className="w-16 h-16 bg-neutral-900 border border-white/5 rounded-sm flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-widest font-black mb-2">Call directly</p>
                  <p className="text-2xl font-black italic text-white group-hover:text-blue-400 transition-colors">+1 (415) 555-0192</p>
                </div>
              </div>

              <div className="flex gap-8 group cursor-pointer">
                <div className="w-16 h-16 bg-neutral-900 border border-white/5 rounded-sm flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-widest font-black mb-2">Visit Studio</p>
                  <p className="text-2xl font-black italic text-white group-hover:text-blue-400 transition-colors">San Francisco / London</p>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-white/5">
              <p className="text-neutral-600 text-sm font-bold uppercase tracking-widest mb-6">Current Availability</p>
              <div className="flex items-center gap-3 text-green-500 font-bold italic">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Now accepting Q3/Q4 bookings
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-neutral-950 p-8 md:p-16 rounded-sm border border-white/5 relative">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-4xl font-black italic">MESSAGE RECEIVED.</h2>
                <p className="text-neutral-400 text-lg">We usually respond within 4 hours. Keep an eye on your inbox.</p>
                <button onClick={() => setSubmitted(false)} className="text-blue-500 font-bold hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="space-y-4">
                  <label className="text-[10px] uppercase font-black tracking-widest text-neutral-500">My Name Is</label>
                  <input type="text" placeholder="John Doe" required className="w-full bg-transparent border-b-2 border-neutral-800 py-4 text-2xl font-black italic focus:outline-none focus:border-blue-600 transition-colors" />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] uppercase font-black tracking-widest text-neutral-500">Contact Email</label>
                  <input type="email" placeholder="john@example.com" required className="w-full bg-transparent border-b-2 border-neutral-800 py-4 text-2xl font-black italic focus:outline-none focus:border-blue-600 transition-colors" />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] uppercase font-black tracking-widest text-neutral-500">I'm Interested In</label>
                  <select className="w-full bg-transparent border-b-2 border-neutral-800 py-4 text-2xl font-black italic focus:outline-none focus:border-blue-600 transition-colors appearance-none cursor-pointer">
                    <option className="bg-neutral-900">Brand Identity</option>
                    <option className="bg-neutral-900">Motion & Video</option>
                    <option className="bg-neutral-900">Web Experience</option>
                    <option className="bg-neutral-900">Full Strategic Partner</option>
                  </select>
                </div>

                <div className="space-y-4">
                   <label className="text-[10px] uppercase font-black tracking-widest text-neutral-500">Tell us about your mission</label>
                   <textarea rows={4} placeholder="I want to build a..." required className="w-full bg-transparent border-b-2 border-neutral-800 py-4 text-2xl font-black italic focus:outline-none focus:border-blue-600 transition-colors resize-none" />
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white py-6 text-xl font-black italic tracking-tighter uppercase hover:bg-blue-700 transition-all flex items-center justify-center gap-4">
                  Send Command <Send size={20} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
