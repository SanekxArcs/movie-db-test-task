"use client";
import { Bookmark, Heart } from "lucide-react";
import type { Movie } from "@/types/movie";
import { useApp } from "./AppProvider";
import { Button } from "./ui/button";

export default function MovieActions({ movie, compact = false }: { movie: Movie; compact?: boolean }) {
  const { lists, toggle, t, ready } = useApp();
  const favorite = lists.favorites.some(item => item.id === movie.id);
  const watched = lists.watchlist.some(item => item.id === movie.id);
  return <div className="flex flex-wrap gap-2">
    <Button variant={favorite ? "default" : "outline"} size={compact ? "icon" : "default"} disabled={!ready}
      aria-label={`${favorite ? t.removeFavorite : t.addFavorite}: ${movie.title}`} title={favorite ? t.removeFavorite : t.addFavorite}
      aria-pressed={favorite} onClick={() => toggle("favorites", movie)}>
      <Heart className={favorite ? "fill-current" : ""} />{!compact && t.favorites}
    </Button>
    <Button variant={watched ? "default" : "outline"} size={compact ? "icon" : "default"} disabled={!ready}
      aria-label={`${watched ? t.removeWatchlist : t.addWatchlist}: ${movie.title}`} title={watched ? t.removeWatchlist : t.addWatchlist}
      aria-pressed={watched} onClick={() => toggle("watchlist", movie)}>
      <Bookmark className={watched ? "fill-current" : ""} />{!compact && t.watchlist}
    </Button>
  </div>;
}
