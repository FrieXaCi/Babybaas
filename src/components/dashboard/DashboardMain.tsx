"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

/**
 * Scrollcontainer voor de pagina-inhoud. `layoutScroll` laat Motion de
 * scrollpositie meenemen, zodat layout-animaties niet verspringen.
 */
export function DashboardMain({ children }: { children: ReactNode }) {
  return (
    <motion.main layoutScroll className="flex-1 overflow-y-auto p-5 md:p-3">
      {children}
    </motion.main>
  );
}
