"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Film } from "lucide-react";
import { getMovies } from "@/lib/api";
import { matchesFilters, sortMovies } from "@/lib/movie-filters";
import type { MovieResponse } from "@/types/movie";
import { useApp } from "./AppProvider";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import { LoadingMovieGrid } from "./LoadingStates";
import { Button } from "./ui/button";

export default function MovieGrid() {
  const params = useSearchParams();
  const router = useRouter();
  const key = params.toString();
  const { t, language, ready, lists } = useApp();
  const [data, setData] = useState<MovieResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);
  const list = params.get("list");
  const saved = list === "favorites" || list === "watchlist" ? list : null;
  const page = Math.min(500, Math.max(1, Math.floor(Number(params.get("page")) || 1)));
  useEffect(() => {
    if (!ready || saved) return;
    const controller = new AbortController();
    setLoading(true); setError(false);
    const query = new URLSearchParams(key); query.set("language", language);
    getMovies(query, controller.signal).then(result => { if (!controller.signal.aborted) setData(result); })
      .catch(() => { if (!controller.signal.aborted) setError(true); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [key, language, ready, saved, retry]);
  const local = saved ? sortMovies(lists[saved].filter(movie => matchesFilters(movie, new URLSearchParams(key))), params.get("sort") || "popularity.desc") : [];
  const movies = saved ? local.slice((page - 1) * 20, page * 20) : data?.results || [];
  const totalPages = saved ? Math.ceil(local.length / 20) : Math.min(data?.total_pages || 0, 500);
  useEffect(() => {
    if (!ready || !saved || page <= Math.max(1, totalPages)) return;
    // Removing the last movie on a saved-list page should return to a valid page.
    const next = new URLSearchParams(key);
    next.set("page", String(Math.max(1, totalPages)));
    router.replace(`/?${next}`, { scroll: false });
  }, [key, page, ready, router, saved, totalPages]);
  if (!ready || (!saved && loading)) return <LoadingMovieGrid />;
  if (!saved && error) return <div role="alert" className="rounded-xl border p-10 text-center"><p className="mb-4">{t.error}</p><Button onClick={() => setRetry(value => value + 1)}>{t.retry}</Button></div>;
  return <section aria-live="polite">
    <div className="mb-5 flex flex-wrap items-center justify-between gap-2"><h2 className="text-xl font-semibold">{saved ? t[saved] : params.get("q") ? t.search : t.discover}</h2>
      <p className="text-sm text-muted-foreground">{saved ? local.length : params.get("q") ? movies.length : data?.total_results || 0} {t.results}</p></div>
    {movies.length ? <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">{movies.map((movie, index) => <MovieCard key={movie.id} movie={movie} eager={index < 5} />)}</div>
      : <div className="rounded-xl border border-dashed px-4 py-16 text-center"><Film className="mx-auto mb-4 size-10 text-muted-foreground" /><h3 className="mb-2 text-lg font-semibold">{t.empty}</h3><p className="text-sm text-muted-foreground">{saved && !lists[saved].length ? saved === "favorites" ? t.favoritesHint : t.watchlistHint : t.emptyHint}</p></div>}
    {totalPages > 1 && <div className="mt-8"><Pagination currentPage={page} totalPages={totalPages} /></div>}
  </section>;
}
