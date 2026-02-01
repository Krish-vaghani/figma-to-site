import { motion, useInView, Variants } from "framer-motion";
import { useRef, ReactNode, Children } from "react";

interface StaggerRevealProps {
  children: ReactNode;
  staggerDelay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    }
  },
};

const StaggerReveal = ({
  children,
  staggerDelay = 0.1,
  duration = 0.5,
  className = "",
  once = true,
}: StaggerRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  const customContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const customItemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      }
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={customContainerVariants}
      className={className}
    >
      {Children.map(children, (child) => (
        <motion.div variants={customItemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StaggerReveal;
