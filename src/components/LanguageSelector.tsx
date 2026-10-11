"use client";
import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Languages, Pin } from "lucide-react";
import { useApp } from "./AppProvider";
import { isLanguage, languages } from "@/lib/translations";
import { Select, SelectContent, SelectGroup, SelectLabel, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export default function LanguageSelector() {
  const { language, setLanguage, t, ready } = useApp();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const selected = params.get("lang");
  useEffect(() => { if (ready && isLanguage(selected)) setLanguage(selected); }, [selected, ready, setLanguage]);
  return <Select value={language} onValueChange={value => {
    if (!isLanguage(value)) return;
    setLanguage(value);
    const next = new URLSearchParams(params);
    next.set("lang", value);
    router.replace(`${pathname}?${next}`, { scroll: false });
  }}>
    <SelectTrigger aria-label={t.language} className="w-[170px]"><Languages className="size-4 shrink-0" /><SelectValue /></SelectTrigger>
    <SelectContent><SelectGroup><SelectLabel className="flex items-center gap-2"><Pin className="size-3" />{t.pinned}</SelectLabel>
      {languages.map(item => <SelectItem key={item.code} value={item.code}>{item.short} · {item.label}</SelectItem>)}
    </SelectGroup></SelectContent>
  </Select>;
}
