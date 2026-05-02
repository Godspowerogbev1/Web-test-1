import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Services from "./pages/Services";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import CaseStudyDetails from "./pages/CaseStudyDetails";
import ProjectDiagnostic from "./pages/ProjectDiagnostic";
import Lab from "./pages/Lab";
import Auth from "./pages/Auth";
import ScrollToTop from "./components/ScrollToTop";
import CustomCursor from "./components/CustomCursor";

import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <CustomCursor />
        <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-600 selection:text-white">
          <Navbar />
          <main className="pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/case-studies/:id" element={<CaseStudyDetails />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/diagnostic" element={<ProjectDiagnostic />} />
              <Route path="/lab" element={<Lab />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
