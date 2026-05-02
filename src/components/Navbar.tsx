import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";
import { Menu, X, User as UserIcon, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { auth, signOut } from "../lib/firebase";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const links = [
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Diagnostic", path: "/diagnostic" },
    { name: "Lab", path: "/lab" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Resources", path: "/blog" },
  ];

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="text-2xl font-black italic tracking-tighter text-white group flex items-center gap-2">
          <span className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center text-xs not-italic">L</span>
          LUMINA
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-xs font-black uppercase tracking-widest transition-colors",
                location.pathname === link.path ? "text-blue-500" : "text-neutral-400 hover:text-white"
              )}
            >
              {link.name}
            </Link>
          ))}
          
          {user ? (
            <div className="flex items-center gap-6 pl-10 border-l border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500 border border-blue-600/30">
                  <UserIcon size={12} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 truncate max-w-[80px]">{user.displayName || user.email}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="text-[10px] font-black uppercase tracking-widest text-neutral-600 hover:text-red-500 transition-colors"
              >
                <LogOut size={12} />
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="px-6 py-2.5 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-sm hover:bg-neutral-200 transition-colors"
            >
              INITIALIZE
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 right-0 bg-neutral-900 border-b border-white/10 p-6 flex flex-col gap-6 md:hidden"
          >
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-lg font-bold text-neutral-300 uppercase tracking-tighter italic"
              >
                {link.name}
              </Link>
            ))}
            
            <div className="pt-6 border-t border-white/5">
              {user ? (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-neutral-400">{user.email}</span>
                  <button onClick={handleLogout} className="text-red-500 font-bold uppercase text-xs">Logout</button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setIsOpen(false)}
                  className="w-full block py-4 bg-white text-black text-center font-black uppercase tracking-widest text-xs"
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
