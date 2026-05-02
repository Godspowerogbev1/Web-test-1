import { CaseStudy, Post, TeamMember, LabProject } from "./types";

export const LAB_PROJECTS: LabProject[] = [
  {
    id: "harmony-gen",
    title: "Chroma Pulse v1.0",
    description: "An algorithmic color harmony generator that uses motion-path physics to find perfect HEX pairings.",
    type: "Tool",
    tags: ["React", "Physics", "Design"]
  },
  {
    // ... we will implement this one interactively
    id: "noise-text",
    title: "Liquid Typography",
    description: "Experimental variable fonts that react to scroll velocity and cursor proximity.",
    type: "Experiment",
    tags: ["Typography", "Animation"]
  },
  {
    id: "ai-brand",
    title: "Gemini Brand Oracle",
    description: "A smart conceptualizer that uses AI to generate visual metaphors for complex tech abstractions.",
    type: "Tool",
    tags: ["AI", "Strategy"]
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "quantum-tech",
    client: "Quantum Dynamics",
    logo: "https://picsum.photos/seed/quantum/100/100",
    title: "Revolutionizing Cloud Security Visuals",
    category: "Branding",
    problem: "Quantum Dynamics had a cutting-edge product but a visual identity that felt like a legacy law firm. They were losing Gen-Z talent and enterprise trust due to an outdated look.",
    solution: "We developed a 'Neon-Logic' design system, incorporating kinetic typography and high-contrast glassmorphism to reflect their advanced tech stack.",
    results: [
      { metric: "Inbound Leads", value: "+145%" },
      { metric: "Time on Site", value: "3.5m" },
      { metric: "Brand Recognition", value: "+80%" }
    ],
    testimonial: {
      quote: "Lumina didn't just give us a logo; they gave us a language to communicate our future.",
      author: "Sarah Chen",
      role: "CTO at Quantum Dynamics",
      image: "https://picsum.photos/seed/sarah/200/200"
    },
    mainImage: "https://picsum.photos/seed/qmain/1200/800",
    gallery: [
      "https://picsum.photos/seed/q1/800/600",
      "https://picsum.photos/seed/q2/800/600"
    ]
  },
  {
    id: "vortex-media",
    client: "Vortex Gaming",
    logo: "https://picsum.photos/seed/vortex/100/100",
    title: "Viral Launch Campaign for Vortex Pro",
    category: "Video",
    problem: "With a saturated gaming market, Vortex Pro needed a launch video that wouldn't just be scrolled past on social media.",
    solution: "A 60-second high-octane 3D animation with custom foley sound design and hyper-kinetic editing patterns designed for TikTok and YouTube Shorts.",
    results: [
      { metric: "Total Views", value: "4.2M" },
      { metric: "Pre-orders", value: "25k" },
      { metric: "Shares", value: "120k" }
    ],
    testimonial: {
      quote: "The engagement rates were unlike anything our marketing team had ever seen before.",
      author: "Marcus Thorne",
      role: "Head of Marketing",
      image: "https://picsum.photos/seed/marcus/200/200"
    },
    mainImage: "https://picsum.photos/seed/vmain/1200/800",
    gallery: [
      "https://picsum.photos/seed/v1/800/600",
      "https://picsum.photos/seed/v2/800/600"
    ]
  },
  {
    id: "eco-style",
    client: "EcoStyle Interiors",
    logo: "https://picsum.photos/seed/eco/100/100",
    title: "E-Commerce Experience Redesign",
    category: "Web",
    problem: "High traffic but low conversion. Users were getting lost in a complex navigation system on mobile devices.",
    solution: "A mobile-first headless Shopify build with a custom 3D furniture customizer and streamlined one-tap checkout process.",
    results: [
      { metric: "Conversion Rate", value: "+4.2%" },
      { metric: "Mobile Revenue", value: "+210%" },
      { metric: "Bounce Rate", value: "-35%" }
    ],
    testimonial: {
      quote: "Our website is finally as beautiful and functional as our furniture.",
      author: "Elena Rossi",
      role: "Creative Director",
      image: "https://picsum.photos/seed/elena/200/200"
    },
    mainImage: "https://picsum.photos/seed/emain/1200/800",
    gallery: [
      "https://picsum.photos/seed/e1/800/600",
      "https://picsum.photos/seed/e2/800/600"
    ]
  }
];

export const BLOG_POSTS: Post[] = [
  {
    id: "1",
    title: "The Future of Kinetic Typography in 2026",
    excerpt: "How motion is becoming the primary language of digital brand identity...",
    category: "Trends",
    date: "May 12, 2026",
    image: "https://picsum.photos/seed/blog1/800/600"
  },
  {
    id: "2",
    title: "5 Tips for High-Conversion Web Landing Pages",
    excerpt: "The psychological triggers you're missing in your CTA designs...",
    category: "Tutorial",
    date: "May 05, 2026",
    image: "https://picsum.photos/seed/blog2/800/600"
  }
];

export const TEAM: TeamMember[] = [
  {
    id: "1",
    name: "Alex Lumina",
    role: "Founder & Creative Lead",
    bio: "12 years of pushing pixels and breaking the fourth wall in digital design.",
    image: "https://picsum.photos/seed/alex/300/300"
  },
  {
    id: "2",
    name: "Sonia Veda",
    role: "Head of Motion",
    bio: "Turning static concepts into living, breathing stories through frame-by-frame precision.",
    image: "https://picsum.photos/seed/sonia/300/300"
  }
];
