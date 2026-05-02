export interface LabProject {
  id: string;
  title: string;
  description: string;
  type: "Tool" | "Experiment" | "Concept";
  tags: string[];
}

export interface CaseStudy {
  id: string;
  client: string;
  logo: string;
  title: string;
  category: "Branding" | "Video" | "Web";
  problem: string;
  solution: string;
  results: {
    metric: string;
    value: string;
  }[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    image: string;
  };
  mainImage: string;
  gallery: string[];
}

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}
