import { ReactNode } from "react";
import { motion } from "framer-motion";

interface MotionSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function MotionSection({ children, className = "", delay = 0 }: MotionSectionProps) {
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
