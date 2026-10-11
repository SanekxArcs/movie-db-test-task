"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import { useApp } from "./AppProvider";
import { getCategories } from "@/lib/api";
import type { Genre } from "@/types/movie";
import { sortOptions } from "@/lib/movie-filters";
import CategorySelector from "./CategorySelector";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

export default function MovieFilters() {
  const { t, language, ready } = useApp();
  const router = useRouter();
  const params = useSearchParams();
  const query = params.get("q") || "";
  const activeFilterCount = ["q", "genre", "year", "rating", "original"].filter(key => params.get(key)).length
    + (params.get("category") && params.get("category") !== "popular" ? 1 : 0)
    + (params.get("sort") && params.get("sort") !== "popularity.desc" ? 1 : 0);
  const [expanded, setExpanded] = useState(activeFilterCount > 0);
  const [search, setSearch] = useState(query);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [genreError, setGenreError] = useState(false);
  const saved = ["favorites", "watchlist"].includes(params.get("list") || "");
  useEffect(() => setSearch(query), [query]);
  useEffect(() => {
    if (!ready) return;
    const controller = new AbortController();
    setGenres([]); setGenreError(false);
    getCategories(language, controller.signal).then(data => setGenres(data.genres)).catch(() => { if (!controller.signal.aborted) setGenreError(true); });
    return () => controller.abort();
  }, [language, ready]);
  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value && value !== "all") next.set(key, value); else next.delete(key);
    next.delete("page"); next.set("lang", language);
    router.push(`/?${next}`);
  };
  const select = (key: string, label: string, options: { value: string; label: string }[], fallback = "all") =>
    <label className="grid gap-2 text-sm font-medium" key={key}>{label}
      <Select value={params.get(key) || fallback} onValueChange={value => update(key, value)}>
        <SelectTrigger className="w-full" aria-label={label}><SelectValue /></SelectTrigger>
        <SelectContent>{options.map(item => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectContent>
      </Select>
    </label>;
  return <Collapsible open={expanded} onOpenChange={setExpanded} asChild>
    <section className="mb-8 rounded-xl border bg-card" aria-label={t.searchFilters}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="h-auto min-h-14 w-full justify-between rounded-xl px-4 py-4 text-left sm:px-6">
          <span className="flex flex-wrap items-center gap-2 sm:gap-3">
            <SlidersHorizontal className="size-4" />
            <span>{t.searchFilters}</span>
            {activeFilterCount > 0 && <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground" aria-label={`${t.activeFilters}: ${activeFilterCount}`}>{activeFilterCount}</span>}
          </span>
          <ChevronDown className={`size-4 transition-transform motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`} />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-5 px-4 pb-4 sm:px-6 sm:pb-6">
    <form className="flex gap-2" onSubmit={event => { event.preventDefault(); update("q", search.trim()); }}>
      <div className="relative flex-1"><Search className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" />
        <Input className="h-10 pl-10 pr-10" value={search} onChange={event => setSearch(event.target.value)} placeholder={t.searchPlaceholder} aria-label={t.search} maxLength={200} />
        {search && <button type="button" aria-label={t.clearSearch} className="absolute right-2 top-2 rounded p-1 hover:bg-muted" onClick={() => { setSearch(""); update("q", ""); }}><X className="size-4" /></button>}
      </div><Button type="submit" className="h-10">{t.search}</Button>
    </form>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {!saved && !query && <CategorySelector />}
      {select("genre", t.genre, [{ value: "all", label: t.allGenres }, ...genres.map(genre => ({ value: String(genre.id), label: genre.name }))])}
      {select("year", t.year, [{ value: "all", label: t.allYears }, ...Array.from({ length: new Date().getFullYear() + 5 - 1900 }, (_, i) => ({ value: String(new Date().getFullYear() + 4 - i), label: String(new Date().getFullYear() + 4 - i) }))])}
      {select("rating", t.rating, [{ value: "all", label: t.anyRating }, ...[5, 6, 7, 8, 9].map(value => ({ value: String(value), label: `${value}+ / 10` }))])}
      {select("original", t.original, [{ value: "all", label: t.anyLanguage }, ...[{ value: "uk", label: t.ukrainian }, { value: "en", label: t.english }, { value: "pl", label: t.polish }, { value: "de", label: t.german }, { value: "fr", label: t.french }, { value: "es", label: t.spanish }, { value: "it", label: t.italian }, { value: "ja", label: t.japanese }, { value: "ko", label: t.korean }]])}
      {select("sort", t.sort, sortOptions.map((value, index) => ({ value, label: [t.popularity, t.best, t.newest, t.oldest, t.title][index] })), params.get("category") === "top_rated" ? "vote_average.desc" : "popularity.desc")}
    </div>
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-xs text-muted-foreground">{saved ? t.savedNote : query ? t.searchNote : "TMDB"}</p>
      <Button variant="ghost" size="sm" onClick={() => { const next = new URLSearchParams({ lang: language }); if (saved) next.set("list", params.get("list")!); router.push(`/?${next}`); }}><SlidersHorizontal className="size-4" />{t.reset}</Button>
    </div>
    {genreError && <p role="status" className="text-sm text-muted-foreground">{t.genreError}</p>}
      </CollapsibleContent>
    </section>
  </Collapsible>;
}
