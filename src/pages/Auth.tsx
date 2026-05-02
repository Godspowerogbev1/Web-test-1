import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  LogIn, UserPlus, Github, Mail, ArrowRight, Lock, 
  ShieldCheck, Zap, Sparkles, Globe
} from "lucide-react";
import { auth, googleProvider, signInWithPopup } from "../lib/firebase";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/lab");
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-6">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Brand Narrative */}
        <div className="hidden lg:block space-y-12">
          <div>
            <div className="flex items-center gap-3 mb-6 text-blue-500">
              <ShieldCheck size={24} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Secure Access Node</span>
            </div>
            <h1 className="text-7xl font-black italic tracking-tighter uppercase leading-[0.9]">
              JOIN THE <br /> <span className="text-blue-600">LEGENDS.</span>
            </h1>
          </div>
          
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-neutral-900 border border-white/5 rounded-sm flex items-center justify-center text-blue-500 shrink-0">
                <Zap size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold italic uppercase tracking-tight text-white mb-2">High-Frequency Computing</h3>
                <p className="text-neutral-500 leading-relaxed font-light italic">Access the Digital Lab's neural processing units for ultra-fast aesthetic manipulation.</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-neutral-900 border border-white/5 rounded-sm flex items-center justify-center text-blue-500 shrink-0">
                <Globe size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold italic uppercase tracking-tight text-white mb-2">Global Asset Mesh</h3>
                <p className="text-neutral-500 leading-relaxed font-light italic">Sync your brand kits across 200M+ royalty-free nodes in our distributed library.</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-neutral-900 border border-white/5 rounded-sm flex items-center justify-center text-blue-500 shrink-0">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold italic uppercase tracking-tight text-white mb-2">Neural Intelligence</h3>
                <p className="text-neutral-500 leading-relaxed font-light italic">Let our AI core handle the heavy lifting while you focus on the creative direction.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="bg-neutral-950 border border-white/5 p-12 rounded-sm shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-blue-600/10 transition-all duration-700" />
          
          <div className="relative">
            <header className="mb-10">
              <h2 className="text-4xl font-black italic tracking-tighter uppercase mb-2">
                {isLogin ? "Welcome Back" : "Initialize Identity"}
              </h2>
              <p className="text-neutral-500 italic">Enter the Digital Legend ecosystem.</p>
            </header>

            <div className="space-y-6">
              <button 
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-4 bg-white text-black py-5 font-black uppercase tracking-widest text-xs rounded-sm hover:bg-neutral-200 transition-all"
              >
                <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
                {isLogin ? "Sign In with Google" : "Sign Up with Google"}
              </button>

              <div className="flex items-center gap-6 py-4">
                <div className="flex-1 h-px bg-white/5" />
                <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">Protocol Partition</span>
                <div className="flex-1 h-px bg-white/5" />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 ml-1">Universal ID (Email)</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" size={16} />
                    <input 
                      type="email" 
                      placeholder="identity@domain.com"
                      className="w-full bg-neutral-900 border border-white/5 rounded-sm py-4 pl-12 pr-4 text-sm font-light text-white focus:outline-none focus:border-blue-600 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 ml-1">Access Protocol (Password)</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" size={16} />
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full bg-neutral-900 border border-white/5 rounded-sm py-4 pl-12 pr-4 text-sm font-light text-white focus:outline-none focus:border-blue-600 transition-all"
                    />
                  </div>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-5 font-black italic uppercase tracking-tighter text-lg rounded-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/10 flex items-center justify-center gap-3">
                {isLogin ? "Authenticate" : "Create Node"}
                <ArrowRight size={20} />
              </button>

              <div className="text-center">
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-xs font-bold italic text-neutral-500 hover:text-blue-500 transition-colors"
                >
                  {isLogin ? "Request brand new credentials?" : "Already have a digital identity?"}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
             <span className="text-[8px] font-black text-neutral-500 uppercase tracking-[0.2em]">Partner Node Network</span>
             <div className="flex gap-4">
                <Github size={14} className="text-neutral-500 cursor-pointer" />
                <Globe size={14} className="text-neutral-500 cursor-pointer" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
