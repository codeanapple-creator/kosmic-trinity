import { ReactNode } from "react";
import { motion } from "framer-motion";

interface MotionSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

// One-time check at module load — avoids per-render cost and
// prevents framer-motion from registering IntersectionObservers on mobile.
// Mobile users never resize to desktop in a single session, so this is safe.
const isMobile =
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 767px)").matches;

export function MotionSection({ children, className = "", delay = 0 }: MotionSectionProps) {
  if (isMobile) {
    // On mobile: render immediately at full opacity/position — no scroll-triggered
    // reveal, no IntersectionObserver, no framer-motion compositing layer.
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeIn({ children, className = "", delay = 0 }: MotionSectionProps) {
  if (isMobile) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
