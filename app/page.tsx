"use client";

import { useCallback, useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { Intro } from "@/components/intro/Intro";
import ProjectShowcase from "@/components/ProjectShowcase";
import Timeline from "@/components/Timeline";
import CommandPalette from "@/components/CommandPalette";
import Footer from "@/components/Footer";

export default function Page() {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [pastIntro, setPastIntro] = useState(false);

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

  useEffect(() => {
    const check = () => setPastIntro(window.scrollY > window.innerHeight * 0.85);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <>
      {pastIntro && <Navigation onCmdK={openCmd} />}

      <main className="flex flex-col items-center">
        <Intro />
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
