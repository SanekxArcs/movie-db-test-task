"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CircleArrowLeft } from "lucide-react";
import { useApp } from "./AppProvider";

const MotionButton = motion(Button);

interface BackButtonProps {
  className?: string;
}

export const BackButton = ({ className = "mb-8" }: BackButtonProps) => {
  const router = useRouter();
  const { t, language } = useApp();
  
  return (
    <MotionButton
      variant="outline"
      className={className}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ x: -5 }}
      onClick={() => window.history.length > 1 ? router.back() : router.push(`/?lang=${language}`)}
    >
      <CircleArrowLeft/> {t.back}
    </MotionButton>
  );
};
