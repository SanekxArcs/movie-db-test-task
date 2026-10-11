import type { Genre, Movie, MovieResponse } from "@/types/movie";

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
export const getImageUrl = (path: string) => `${IMAGE_BASE_URL}${path}`;

async function request<T>(params: URLSearchParams, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`/api/movies?${params}`, { signal });
  if (!response.ok) throw new Error("Unable to load movies");
  return response.json();
}
export function getMovies(params: URLSearchParams, signal?: AbortSignal) {
  return request<MovieResponse>(params, signal);
}
export function getMovieDetails(id: string, language = "uk-UA", signal?: AbortSignal) {
  return request<Movie>(new URLSearchParams({ id, language }), signal);
}
export function getCategories(language = "uk-UA", signal?: AbortSignal) {
  return request<{ genres: Genre[] }>(new URLSearchParams({ resource: "genres", language }), signal);
}
