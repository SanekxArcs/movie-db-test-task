import type { Movie } from "@/types/movie";

export const sortOptions = ["popularity.desc", "vote_average.desc", "primary_release_date.desc", "primary_release_date.asc", "title.asc"] as const;

export function matchesFilters(movie: Movie, params: URLSearchParams) {
  const genre = params.get("genre");
  const year = params.get("year");
  const rating = Number(params.get("rating") || 0);
  const original = params.get("original");
  const query = params.get("q")?.trim().toLocaleLowerCase();
  return (!genre || (movie.genre_ids?.includes(Number(genre)) ?? false) || (movie.genres?.some(g => g.id === Number(genre)) ?? false))
    && (!year || movie.release_date?.startsWith(year))
    && movie.vote_average >= rating
    && (!original || movie.original_language === original)
    && (!query || `${movie.title} ${movie.original_title || ""}`.toLocaleLowerCase().includes(query));
}
export function sortMovies(movies: Movie[], sort: string) {
  return [...movies].sort((a, b) => {
    if (sort === "vote_average.desc") return b.vote_average - a.vote_average;
    if (sort === "primary_release_date.desc") return (b.release_date || "").localeCompare(a.release_date || "");
    if (sort === "primary_release_date.asc") return (a.release_date || "").localeCompare(b.release_date || "");
    if (sort === "title.asc") return a.title.localeCompare(b.title);
    return b.popularity - a.popularity;
  });
}
