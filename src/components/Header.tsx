"use client";
import { Clapperboard, Compass, Heart, Bookmark } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useApp } from "./AppProvider";
import { ModeToggle } from "./ui/mode-toggle";
import LanguageSelector from "./LanguageSelector";
import { Button } from "./ui/button";

export default function Header({ navigation = true }: { navigation?: boolean }) {
  const { t, language, lists, storageError } = useApp();
  const router = useRouter();
  const params = useSearchParams();
  const view = params.get("list") || "discover";
  return <header className="mb-8">
    <div className="flex flex-wrap items-center justify-between gap-4">
      <Link href={`/?lang=${language}`} className="flex items-center gap-3">
        <span className="rounded-xl bg-primary p-3 text-primary-foreground"><Clapperboard className="size-7" /></span>
        <div><h1 className="text-2xl font-bold tracking-tight">Movie DB</h1><p className="text-sm text-muted-foreground">{t.tagline}</p></div>
      </Link>
      <div className="flex items-center gap-2"><LanguageSelector /><ModeToggle /></div>
    </div>
    {navigation && <nav aria-label={t.category} className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 gap-1 border-t bg-background/95 px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-lg backdrop-blur-md sm:static sm:mt-6 sm:flex sm:flex-wrap sm:gap-2 sm:border-t-0 sm:border-b sm:bg-transparent sm:px-0 sm:pt-0 sm:pb-4 sm:shadow-none sm:backdrop-blur-none">
      {[{ id: "discover", label: t.discover, icon: Compass }, { id: "favorites", label: t.favorites, icon: Heart }, { id: "watchlist", label: t.watchlist, icon: Bookmark }].map(item =>
        <Button key={item.id} variant={view === item.id ? "default" : "ghost"} aria-pressed={view === item.id}
          aria-label={item.id === "discover" ? item.label : `${item.label}: ${lists[item.id as "favorites" | "watchlist"].length}`}
          className="h-auto min-h-14 min-w-0 flex-col gap-1 rounded-lg px-1 py-2 text-[11px] leading-tight whitespace-normal sm:h-9 sm:min-h-0 sm:flex-row sm:gap-2 sm:px-4 sm:text-sm sm:whitespace-nowrap"
          onClick={() => {
          const next = new URLSearchParams({ lang: language });
          if (item.id !== "discover") next.set("list", item.id);
          router.push(`/?${next}`);
        }}>
          <span className="relative">
            <item.icon className="size-5 sm:size-4" />
            {item.id !== "discover" && <span aria-hidden="true" className="absolute -top-1 -right-3 min-w-4 rounded-full bg-muted px-1 text-[9px] leading-4 text-foreground sm:hidden">{lists[item.id as "favorites" | "watchlist"].length}</span>}
          </span>
          <span>{item.label}</span>
          {item.id !== "discover" && <span aria-hidden="true" className="hidden rounded-full bg-background/20 px-2 text-xs sm:inline">{lists[item.id as "favorites" | "watchlist"].length}</span>}
        </Button>)}
    </nav>}
    {storageError && <p role="status" className="mt-6 text-sm text-amber-600 dark:text-amber-400">{t.storageError}</p>}
  </header>;
}
