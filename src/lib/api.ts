

import { Movie, MovieResponse } from "@/types/movie";

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const cache = new Map();

export async function getMovies(
  categoryOrGenre = "popular",
  page = 1,
  language = "pl-PL",
  sort_by?: string
): Promise<MovieResponse> {
  let url;

  if (categoryOrGenre.startsWith("genre/")) {
    const genreId = categoryOrGenre.split("/")[1];
    url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}&language=${language}`;

    if (sort_by) {
      url += `&sort_by=${sort_by}`;
    }
  } else {
    url = `${BASE_URL}/movie/${categoryOrGenre}?api_key=${API_KEY}&page=${page}&language=${language}`;

    if (categoryOrGenre === "discover" && sort_by) {
      url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}&language=${language}&sort_by=${sort_by}`;
    }
  }

  const cacheKey = `movies-${categoryOrGenre}-${page}-${language}-${
    sort_by || "default"
  }`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.status}`);
  }

  const data = await response.json();
  cache.set(cacheKey, data);

  return data;
}



export async function getMovieDetails(
  id: string,
  language = "pl-PL"
): Promise<Movie> {
  const cacheKey = `movie-${id}-${language}`;

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos,similar&language=${language}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch movie details: ${response.status}`);
  }

  const data = await response.json();
  cache.set(cacheKey, data);

  return data;
}

export async function getCategories(language = "en-US") {
  const cacheKey = `genres-${language}`;

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=${language}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.status}`);
  }

  const data = await response.json();
  cache.set(cacheKey, data);

  return data;
}

export async function searchMovies(
  query: string,
  page = 1,
  language = "pl-PL"
): Promise<MovieResponse> {
  const cacheKey = `search-${query}-${page}-${language}`;

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=${language}&query=${encodeURIComponent(
        query
      )}&page=${page}`
    );

    if (!response.ok) {
      throw new Error("Nie udało się wyszukać filmów");
    }

    const data = await response.json();
    cache.set(cacheKey, data);

    return data;
  } catch (error) {
    console.error("Błąd podczas wyszukiwania filmów:", error);
    throw error;
  }
}

export const getImageUrl = (path: string | undefined) => {
  if (!path) return "/placeholder.png";
  return `${IMAGE_BASE_URL}${path}`;
};

export const movieCategories = [
  { id: "popular", name: "Popularne", endpoint: "/movie/popular" },
  { id: "top_rated", name: "Najwyżej oceniane", endpoint: "/movie/top_rated" },
  { id: "upcoming", name: "Nadchodzące", endpoint: "/movie/upcoming" },
  { id: "now_playing", name: "Teraz w kinach", endpoint: "/movie/now_playing" },
];

export const fetchMoviesByCategory = getMovies;
export const fetchMovieDetails = getMovieDetails;
