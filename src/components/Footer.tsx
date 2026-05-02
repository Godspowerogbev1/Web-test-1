import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <Link to="/" className="text-3xl font-black italic tracking-tighter text-white mb-6 block">
            LUMINA
          </Link>
          <p className="text-neutral-500 max-w-md text-lg leading-relaxed">
            We are a multi-disciplinary creative studio building high-performance brands, digital products, and motion experiences for the world's most ambitious companies.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Connect</h4>
          <div className="flex flex-col gap-4 text-neutral-500">
            <a href="#" className="hover:text-blue-500 transition-colors">Instagram</a>
            <a href="#" className="hover:text-blue-500 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Twitter (X)</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Behance</a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Studios</h4>
          <div className="flex flex-col gap-4 text-neutral-500">
            <p>San Francisco, CA</p>
            <p>London, UK</p>
            <p>New York, NY</p>
            <p>Remote / Global</p>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:row justify-between items-center gap-6">
        <p className="text-neutral-600 text-sm">© 2026 Lumina Creative Studio Corp. All rights reserved.</p>
        <div className="flex gap-8 text-neutral-600 text-sm">
          <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
