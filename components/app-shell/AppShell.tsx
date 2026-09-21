"use client";

import { useState } from "react";
import MobileNav from "./MobileNav";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

/**
 * The application frame: navigation, utility row, and the scrolling workspace.
 * Screens compose into `children` and stay unaware of the chrome around them.
 */
export default function AppShell({ children }: { children: React.ReactNode }) {
  // Destinations are not routed yet, so the shell owns the active state.
  const [activeId, setActiveId] = useState("today");

  return (
    <div className="flex min-h-screen w-full bg-base font-sans text-primary">
      <a
        href="#workspace"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-action focus:px-3 focus:py-2 focus:text-[13px] focus:font-semibold focus:text-[color:var(--text-on-cyan)]"
      >
        Skip to content
      </a>

      <Sidebar activeId={activeId} onSelect={setActiveId} />

      <div className="flex min-w-0 flex-1 flex-col px-4 py-4 pb-[76px] sm:px-6 sm:py-5 lg:pb-5 xl:px-9">
        <TopBar />
        <main id="workspace" className="flex min-w-0 flex-1 flex-col">
          {children}
        </main>
      </div>

      <MobileNav activeId={activeId} onSelect={setActiveId} />
    </div>
  );
}
