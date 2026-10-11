"use client";
import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ImageOff, Star } from "lucide-react";
import { getMovieDetails, getImageUrl } from "@/lib/api";
import type { Movie } from "@/types/movie";
import { useApp } from "@/components/AppProvider";
import Header from "@/components/Header";
import MovieActions from "@/components/MovieActions";
import CastCarousel from "@/components/CastCarousel";
import { BackButton } from "@/components/BackButton";
import { LoadingMovieDetails } from "@/components/LoadingStates";
import { Button } from "@/components/ui/button";

function Details() {
  const { id } = useParams<{ id: string }>();
  const { t, language, ready } = useApp();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    if (!ready) return;
    const controller = new AbortController();
    setLoading(true); setError(false);
    getMovieDetails(id, language, controller.signal).then(data => { if (!controller.signal.aborted) setMovie(data); })
      .catch(() => { if (!controller.signal.aborted) setError(true); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [id, language, ready, retry]);
  return <><Header navigation={false} /><BackButton />
    {loading ? <LoadingMovieDetails /> : error || !movie ? <div role="alert" className="space-y-4 text-center"><p>{t.error}</p><Button onClick={() => setRetry(value => value + 1)}>{t.retry}</Button></div> :
      <div className="grid gap-8 md:grid-cols-3">
        <div>{movie.poster_path ? <Image src={getImageUrl(movie.poster_path)} alt={movie.title} width={500} height={750} className="h-auto w-full rounded-xl" loading="eager" fetchPriority="high" /> : <div className="flex aspect-2/3 items-center justify-center rounded-xl bg-muted"><ImageOff className="size-16" /></div>}</div>
        <div className="min-w-0 space-y-6 md:col-span-2"><h1 className="text-3xl font-bold sm:text-4xl">{movie.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm"><span className="flex items-center gap-1 rounded-md bg-amber-400 px-2 py-1 font-bold text-black"><Star className="size-4" />{movie.vote_average ? movie.vote_average.toFixed(1) : t.noRating}</span><span>{movie.release_date || t.noDate}</span>{movie.runtime ? <span>{movie.runtime} min</span> : null}</div>
          <MovieActions movie={movie} /><p className="text-xs text-muted-foreground">{t.savedNote}</p>
          <div className="flex flex-wrap gap-2">{movie.genres?.map(genre => <span key={genre.id} className="rounded-full bg-muted px-3 py-1 text-sm">{genre.name}</span>)}</div>
          <section><h2 className="mb-2 text-xl font-semibold">{t.overview}</h2><p className="leading-relaxed text-muted-foreground">{movie.overview || t.noOverview}</p></section>
          {!!movie.credits?.cast.length && <CastCarousel cast={movie.credits.cast} />}
        </div>
      </div>}
  </>;
}
export default function MoviePage() {
  return <main className="container mx-auto max-w-7xl px-4 py-6 sm:py-10"><Suspense fallback={<LoadingMovieDetails />}><Details /></Suspense></main>;
}
