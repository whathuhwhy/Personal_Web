"use client";

import { useCallback, useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProjectShowcase from "@/components/ProjectShowcase";
import Timeline from "@/components/Timeline";
import CommandPalette from "@/components/CommandPalette";
import Footer from "@/components/Footer";

export default function Page() {
  const [cmdOpen, setCmdOpen] = useState(false);

  const openCmd = useCallback(() => setCmdOpen(true), []);
  const closeCmd = useCallback(() => setCmdOpen(false), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <Navigation onCmdK={openCmd} />

      <main className="flex flex-col items-center">
        <Hero />
        <ProjectShowcase />
        <Timeline />
      </main>

      <div className="flex justify-center">
        <Footer />
      </div>

      <CommandPalette open={cmdOpen} onClose={closeCmd} />
    </>
  );
}
