import { useEffect, useState, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "motion/react";

interface CounterProps {
  value: number;
  direction?: "up" | "down";
}

export function Counter({
  value,
  direction = "up",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  const spring = useSpring(0, {
    mass: 1,
    stiffness: 100,
    damping: 30,
  });

  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

export default Counter;
