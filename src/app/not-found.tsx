"use client";
import Link from "next/link";
import { useApp } from "@/components/AppProvider";

export default function NotFound() {
  const { t, language } = useApp();
  return <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
    <h1 className="text-6xl font-bold">404</h1><Link href={`/?lang=${language}`} className="underline">{t.discover}</Link>
  </div>;
}
