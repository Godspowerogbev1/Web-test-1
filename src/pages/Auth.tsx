import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  LogIn, UserPlus, Github, Mail, ArrowRight, Lock, 
  ShieldCheck, Zap, Sparkles, Globe, AlertCircle, Loader2
} from "lucide-react";
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification
} from "../lib/firebase";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/lab");
    } catch (error: any) {
      setError(error.message || "Login failed");
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/lab");
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Send verification email
        await sendEmailVerification(userCredential.user);
        setMessage("Verification email sent! Please check your inbox before logging in.");
        setIsLogin(true); // Switch to login so they can verify
      }
    } catch (error: any) {
      setError(error.message || "Authentication failed");
      console.error("Auth failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address first.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
    } catch (error: any) {
      setError(error.message || "Failed to send reset email");
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

            <form onSubmit={handleEmailAuth} className="space-y-6">
              <button 
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-4 bg-white text-black py-5 font-black uppercase tracking-widest text-xs rounded-sm hover:bg-neutral-200 transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />}
                {isLogin ? "Sign In with Google" : "Sign Up with Google"}
              </button>

              <div className="flex items-center gap-6 py-2">
                <div className="flex-1 h-px bg-white/5" />
                <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">Protocol Partition</span>
                <div className="flex-1 h-px bg-white/5" />
              </div>

              <AnimatePresence mode="wait">
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-red-500/10 border border-red-500/20 p-4 rounded-sm flex items-center gap-3 text-red-500 text-xs italic font-bold"
                  >
                    <AlertCircle size={14} />
                    {error}
                  </motion.div>
                )}
                {message && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-sm flex items-center gap-3 text-blue-500 text-xs italic font-bold"
                  >
                    <Sparkles size={14} />
                    {message}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 ml-1">Universal ID (Email)</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" size={16} />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="identity@domain.com"
                      required
                      className="w-full bg-neutral-900 border border-white/5 rounded-sm py-4 pl-12 pr-4 text-sm font-light text-white focus:outline-none focus:border-blue-600 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Access Protocol (Password)</label>
                    {isLogin && (
                      <button 
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-[9px] font-black uppercase tracking-widest text-neutral-600 hover:text-blue-500 transition-colors"
                      >
                        Forgot?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" size={16} />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full bg-neutral-900 border border-white/5 rounded-sm py-4 pl-12 pr-4 text-sm font-light text-white focus:outline-none focus:border-blue-600 transition-all"
                    />
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-5 font-black italic uppercase tracking-tighter text-lg rounded-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/10 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : (
                  <>
                    {isLogin ? "Authenticate" : "Create Node"}
                    <ArrowRight size={20} />
                  </>
                )}
              </button>

              <div className="text-center">
                <button 
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-xs font-bold italic text-neutral-500 hover:text-blue-500 transition-colors"
                >
                  {isLogin ? "Request brand new credentials?" : "Already have a digital identity?"}
                </button>
              </div>
            </form>
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
