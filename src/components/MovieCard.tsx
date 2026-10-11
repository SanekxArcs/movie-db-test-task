"use client";
import { useId, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ImageOff, Info, Star, X } from "lucide-react";
import { getImageUrl } from "@/lib/api";
import type { Movie } from "@/types/movie";
import { useApp } from "./AppProvider";
import MovieActions from "./MovieActions";

export default function MovieCard({ movie, eager = false }: { movie: Movie; eager?: boolean }) {
  const { language, t } = useApp();
  const previewId = useId();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const visible = !dismissed && (hovered || focused || pinned);
  const href = `/movie/${movie.id}?lang=${language}`;

  return (
    <article
      className={`group relative overflow-hidden rounded-xl border bg-card transition-[box-shadow,transform] duration-300 motion-reduce:transition-none ${visible ? "z-10 shadow-xl motion-safe:-translate-y-1" : ""}`}
      onPointerEnter={event => {
        if (event.pointerType === "touch") return;
        setHovered(true);
        setDismissed(false);
      }}
      onPointerLeave={event => {
        if (event.pointerType === "touch") return;
        setHovered(false);
      }}
      onFocusCapture={() => { setFocused(true); setDismissed(false); }}
      onBlurCapture={event => {
        if (event.currentTarget.contains(event.relatedTarget)) return;
        setFocused(false);
        setPinned(false);
        setDismissed(false);
      }}
      onKeyDown={event => {
        if (event.key === "Escape") {
          setDismissed(true);
          setPinned(false);
        }
      }}
    >
      <div className="relative aspect-2/3 overflow-hidden bg-muted">
        <Link href={href} className="absolute inset-0 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring" aria-label={`${t.details}: ${movie.title}`} aria-describedby={visible ? previewId : undefined}>
          {movie.poster_path ? (
            <Image src={getImageUrl(movie.poster_path)} alt={movie.title} fill loading={eager ? "eager" : "lazy"} sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" className={`object-cover transition-transform duration-500 motion-reduce:transition-none ${visible ? "motion-safe:scale-110" : ""}`} />
          ) : (
            <div className="flex h-full items-center justify-center"><ImageOff className="size-12 text-muted-foreground" /></div>
          )}
          <div aria-hidden={!visible} className={`absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/85 to-black/10 p-3 text-white transition-[opacity,transform] duration-300 sm:p-4 motion-reduce:transition-none ${visible ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-3"}`}>
            <h3 className="mb-2 line-clamp-2 text-sm font-bold sm:text-lg">{movie.title}</h3>
            <div className="mb-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-white/80">
              <span>{movie.release_date?.slice(0, 4) || t.noDate}</span>
              {movie.runtime ? <span>{movie.runtime} min</span> : null}
              {movie.original_language && <span className="uppercase">{movie.original_language}</span>}
            </div>
            {!!movie.genres?.length && <p className="mb-2 line-clamp-1 text-xs text-white/80">{movie.genres.map(genre => genre.name).join(" · ")}</p>}
            <p id={previewId} className="line-clamp-3 text-xs leading-relaxed text-white/90 sm:line-clamp-4 sm:text-sm">{movie.overview || t.noOverview}</p>
            <span className="mt-3 flex items-center gap-1 text-xs font-semibold sm:text-sm">{t.details}<ArrowUpRight className="size-4" /></span>
          </div>
        </Link>
        <span className="pointer-events-none absolute right-2 top-2 flex items-center gap-1 rounded-lg bg-black/80 px-2 py-1 text-xs font-semibold text-white"><Star className="size-3 fill-amber-400 text-amber-400" />{movie.vote_average ? movie.vote_average.toFixed(1) : t.noRating}</span>
        <button
          type="button"
          aria-label={`${visible ? t.closePreview : t.preview}: ${movie.title}`}
          aria-expanded={visible}
          aria-controls={previewId}
          className="absolute left-2 top-2 flex size-9 items-center justify-center rounded-full bg-black/75 text-white transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          onPointerDown={event => { if (event.pointerType === "touch") event.preventDefault(); }}
          onClick={() => { setPinned(!visible); setDismissed(visible); }}
        >
          {visible ? <X className="size-4" /> : <Info className="size-4" />}
        </button>
      </div>
      <Link href={href} className="block px-3 pt-3"><h3 className="truncate font-semibold" title={movie.title}>{movie.title}</h3><p className="mt-1 text-sm text-muted-foreground">{movie.release_date?.slice(0, 4) || t.noDate}</p></Link>
      <div className="p-3"><MovieActions movie={movie} compact /></div>
    </article>
  );
}
