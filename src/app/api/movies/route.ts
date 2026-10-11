import { NextRequest, NextResponse } from "next/server";
import type { MovieResponse } from "@/types/movie";
import { matchesFilters, sortMovies, sortOptions } from "@/lib/movie-filters";

export async function GET(request: NextRequest) {
  const input = request.nextUrl.searchParams;
  const key = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;
  if (!key) return NextResponse.json({ error: "Configure TMDB_API_KEY in .env.local" }, { status: 503 });
  const language = ["uk-UA", "en-US", "pl-PL"].includes(input.get("language") || "") ? input.get("language")! : "uk-UA";
  const params = new URLSearchParams({ api_key: key, language, include_adult: "false" });
  let endpoint = "discover/movie";
  const id = input.get("id");
  const query = input.get("q")?.trim().slice(0, 200);
  if (id) {
    if (!/^\d+$/.test(id)) return NextResponse.json({ error: "Invalid movie" }, { status: 400 });
    endpoint = `movie/${id}`;
    params.set("append_to_response", "credits,videos,similar");
  } else if (input.get("resource") === "genres") {
    endpoint = "genre/movie/list";
  } else {
    const page = Math.min(500, Math.max(1, Number(input.get("page")) || 1));
    params.set("page", String(Math.floor(page)));
    const sort = input.get("sort") || "popularity.desc";
    params.set("sort_by", sortOptions.includes(sort as typeof sortOptions[number]) ? sort : "popularity.desc");
    const year = input.get("year");
    if (year && /^\d{4}$/.test(year)) params.set("primary_release_year", year);
    if (query) {
      endpoint = "search/movie";
      params.set("query", query);
    } else {
      const genre = input.get("genre");
      if (genre && /^\d+$/.test(genre)) params.set("with_genres", genre);
      const rating = Math.min(10, Math.max(0, Number(input.get("rating")) || 0));
      if (rating) params.set("vote_average.gte", String(rating));
      const original = input.get("original");
      if (original && /^[a-z]{2}$/.test(original)) params.set("with_original_language", original);
      if (rating || sort === "vote_average.desc" || input.get("category") === "top_rated") params.set("vote_count.gte", "100");
      if (input.get("category") === "top_rated" && !input.has("sort")) params.set("sort_by", "vote_average.desc");
      const today = new Date().toISOString().slice(0, 10);
      if (input.get("category") === "upcoming") params.set("primary_release_date.gte", today);
      if (input.get("category") === "now_playing") {
        params.set("with_release_type", "2|3");
        params.set("release_date.lte", today);
        params.set("release_date.gte", new Date(Date.now() - 45 * 86400000).toISOString().slice(0, 10));
      }
    }
  }
  try {
    const response = await fetch(`https://api.themoviedb.org/3/${endpoint}?${params}`, { next: { revalidate: 300 }, signal: request.signal });
    if (!response.ok) return NextResponse.json({ error: "Movie service unavailable" }, { status: response.status === 404 ? 404 : 502 });
    const data = await response.json();
    if (query && !id && input.get("resource") !== "genres") {
      const result = data as MovieResponse;
      // TMDB search supports year but not genre/rating/original-language filtering.
      const filters = new URLSearchParams(input);
      filters.delete("q");
      result.results = sortMovies(result.results.filter(movie => matchesFilters(movie, filters)), input.get("sort") || "popularity.desc");
    }
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Movie service unavailable" }, { status: 502 });
  }
}
