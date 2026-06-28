// ============================================================
// App.tsx — Root component orchestrating all sections
// ============================================================

import { useEffect } from "react";
import { useTheme } from "./hooks/useTheme";
import { useMetrics } from "./hooks/useApi";
import ParticlesBackground from "./components/ParticlesBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Classifier from "./components/Classifier";
import Dashboard from "./components/Dashboard";
import DataVisualization from "./components/DataVisualization";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import AboutML from "./components/AboutML";
import Footer from "./components/Footer";

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { fetchMetrics, metrics } = useMetrics();

  // Load metrics on mount
  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <ParticlesBackground />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Classifier />
        <Dashboard metrics={metrics} />
        <DataVisualization metrics={metrics} />
        <HowItWorks />
        <Features />
        <AboutML />
      </main>
      <Footer />
    </div>
  );
}
