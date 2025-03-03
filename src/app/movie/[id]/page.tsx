/* eslint-disable */

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getMovieDetails, IMAGE_BASE_URL } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { LoadingMovieDetails } from "@/components/LoadingStates";
import type { Metadata } from "next";
import { Movie } from "@/types/movie";



export default async function MoviePage({
  params,
  _searchParams,
}: {
  params: { id: string };
  _searchParams: { [key: string]: string | string[] | undefined };
}): Promise<React.ReactElement> {
  const movie: Movie | null = await getMovieDetails(params.id);

  if (!movie) {
    return <LoadingMovieDetails />;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Link href="/">
        <Button variant="outline" className="mb-8">
          ← Wróć do filmów
        </Button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Movie poster */}
        <div className="md:col-span-1">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <Image
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
              width={500}
              height={750}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Movie details */}
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-4 cursor-default">
            {movie.title}
          </h1>

          <div className="flex items-center space-x-4 mb-4 cursor-default">
            <span className="bg-yellow-500 text-black font-bold px-2 py-1 rounded">
              {movie.vote_average.toFixed(1)}
            </span>
            <span>{movie.release_date}</span>
            <span>{movie.runtime ?? 0} min</span>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mb-4 cursor-default">
            {movie.genres && movie.genres.length > 0 ? (
              movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))
            ) : (
              <p>Brak dostępnych gatunków</p>
            )}
          </div>

          {/* Movie overview */}
          <h2 className="text-2xl font-semibold mb-2 cursor-default">
            Omówienie
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 cursor-default">
            {movie.overview}
          </p>

          {/* Cast list */}
          <h2 className="text-2xl font-semibold cursor-default mb-2">
            Obsada aktorska
          </h2>
          <div className="flex overflow-x-auto gap-4 pb-4">
            {(movie.credits?.cast ?? []).slice(0, 10).map((person) => (
              <div
                key={person.id}
                className="flex-shrink-0 md:w-24 p-0 border-border border dark:border-border-dark rounded-md cursor-default hover:shadow-md transition-shadow duration-300"
              >
                {person.profile_path ? (
                  <Image
                    src={`${IMAGE_BASE_URL}${person.profile_path}`}
                    alt={person.name}
                    width={100}
                    height={150}
                    className="rounded-md mb-1"
                  />
                ) : (
                  <div className="w-full h-[150px] bg-gray-200 dark:bg-gray-800 rounded-md mb-1" />
                )}
                <p className="text-sm font-medium truncate px-1">
                  {person.name}
                </p>
                <p className="text-xs text-gray-500 truncate pb-1 px-1">
                  {person.character}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}


export async function generateMetadata({
  params,
  _searchParams,
}: {
  params: { id: string };
  _searchParams: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const movie: Movie | null = await getMovieDetails(params.id);
  return {
    title: movie?.title || "Szczegóły filmu",
    description: movie?.overview || "Zobacz szczegóły dotyczące tego filmu",
  };
}
