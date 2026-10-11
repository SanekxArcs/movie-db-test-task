"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useApp } from "./AppProvider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export default function CategorySelector() {
  const { t } = useApp();
  const params = useSearchParams();
  const router = useRouter();
  return <label className="grid gap-2 text-sm font-medium">{t.category}
    <Select value={params.get("category") || "popular"} onValueChange={value => {
      const next = new URLSearchParams(params); next.set("category", value); next.delete("page"); next.delete("sort");
      router.push(`/?${next}`);
    }}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent>
      {(["popular", "top_rated", "upcoming", "now_playing"] as const).map(id => <SelectItem key={id} value={id}>{t[id]}</SelectItem>)}
    </SelectContent></Select>
  </label>;
}
