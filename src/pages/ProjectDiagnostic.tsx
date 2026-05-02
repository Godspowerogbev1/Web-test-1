import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, ChevronRight, ChevronLeft, Send, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const STEPS = [
  {
    id: "focus",
    question: "What is your primary focus?",
    options: [
      { id: "brand", label: "Brand Identity", icon: "🎨", score: "visual" },
      { id: "motion", label: "Motion & Content", icon: "🎬", score: "motion" },
      { id: "web", label: "Digital Platform", icon: "💻", score: "digital" },
      { id: "full", label: "Full Strategic Partnership", icon: "⚡", score: "strategy" },
    ],
  },
  {
    id: "stage",
    question: "What stage is your business at?",
    options: [
      { id: "startup", label: "Seed / Series A", icon: "🚀" },
      { id: "growth", label: "Growth / Series B+", icon: "📈" },
      { id: "enterprise", label: "Established Enterprise", icon: "🏢" },
    ],
  },
  {
    id: "pain",
    question: "What's the biggest bottleneck?",
    options: [
      { id: "converting", label: "Low Conversion Rates", icon: "📉" },
      { id: "premium", label: "Not Feeling 'Premium' Enough", icon: "💎" },
      { id: "speed", label: "Speed to Market", icon: "⏱️" },
      { id: "consistency", label: "Brand Inconsistency", icon: "🧩" },
    ],
  },
];

export default function ProjectDiagnostic() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  const handleSelect = (stepId: string, optionId: string) => {
    setAnswers({ ...answers, [stepId]: optionId });
    if (currentStep < STEPS.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    } else {
      setIsComplete(true);
    }
  };

  const progress = ((currentStep + (isComplete ? 1 : 0)) / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center pt-32 pb-20 px-6">
      <div className="max-w-3xl w-full">
        {!isComplete ? (
          <>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <span className="text-blue-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Free Assessment Tool</span>
              <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-6">PROJECT <br /> PULSE™ CHECK.</h1>
              <p className="text-neutral-500 text-lg italic">Answer 3 questions to identify your brand's growth path.</p>
            </motion.div>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-white/5 rounded-full mb-12 overflow-hidden">
              <motion.div 
                animate={{ width: `${progress}%` }}
                className="h-full bg-blue-600"
              />
            </div>

            <div className="relative min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-12"
                >
                  <h2 className="text-2xl md:text-4xl font-bold text-center tracking-tight text-white mb-20">{STEPS[currentStep].question}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {STEPS[currentStep].options.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleSelect(STEPS[currentStep].id, opt.id)}
                        className={`group p-8 border-2 text-left transition-all rounded-sm flex items-center justify-between ${
                          answers[STEPS[currentStep].id] === opt.id
                            ? "border-blue-600 bg-blue-600/10 text-white"
                            : "border-white/5 hover:border-white/20 text-neutral-400 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-6">
                          <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{opt.icon}</span>
                          <span className="text-xl font-black italic uppercase tracking-tight">{opt.label}</span>
                        </div>
                        <ChevronRight className={`transition-transform ${answers[STEPS[currentStep].id] === opt.id ? "translate-x-1" : "opacity-0"}`} />
                      </button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-20 flex justify-between items-center text-neutral-600">
              <button 
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest disabled:opacity-0"
              >
                <ChevronLeft size={16} /> Back
              </button>
              <span className="text-[10px] font-black tracking-widest uppercase">Step {currentStep + 1} / {STEPS.length}</span>
            </div>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-neutral-950 border border-white/5 p-12 md:p-24 rounded-sm text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 blur-3xl -z-10 rounded-full" />
            <Sparkles className="mx-auto text-blue-500 mb-8" size={64} />
            <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-8 italic">DIAGNOSIS COMPLETE.</h2>
            <p className="text-xl text-neutral-400 mb-12 max-w-xl mx-auto leading-relaxed">
              Based on your inputs, your brand is in a <strong>High-Growth Friction</strong> phase. You require an <strong>Aesthetic Performance Overhaul</strong> to match your premium product value.
            </p>
            
            <div className="space-y-6 mb-12">
               <div className="flex items-center gap-4 text-white font-bold justify-center">
                  <CheckCircle2 className="text-blue-500" />
                  <span>Personalized Roadmap Ready</span>
               </div>
               <div className="flex items-center gap-4 text-white font-bold justify-center">
                  <CheckCircle2 className="text-blue-500" />
                  <span>Competitor Visual Audit Included</span>
               </div>
            </div>

            <div className="flex flex-col gap-4 max-w-sm mx-auto">
               <input 
                 type="email" 
                 placeholder="Enter email to receive roadmap" 
                 className="bg-neutral-900 border border-white/10 p-4 rounded-sm text-white focus:outline-none focus:border-blue-600"
               />
               <button className="bg-blue-600 text-white py-4 font-black italic tracking-tight uppercase hover:bg-blue-700 transition-all">Send Me Digital Legacy Pack</button>
               <Link to="/contact" className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors">Or Skip and Book Consultation</Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
