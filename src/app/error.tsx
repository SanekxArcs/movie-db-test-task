"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useApp } from "@/components/AppProvider";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { t, language } = useApp();
  return <div role="alert" className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
    <p>{t.error}</p><Button onClick={reset}>{t.retry}</Button><Link href={`/?lang=${language}`} className="underline">{t.discover}</Link>
  </div>;
}
