import { Suspense } from "react";
import Header from "@/components/Header";
import MovieFilters from "@/components/MovieFilters";
import MovieGrid from "@/components/MovieGrid";
import { LoadingMovieGrid } from "@/components/LoadingStates";

export default function Home() {
  return <main className="container mx-auto max-w-7xl px-4 pt-6 pb-[calc(6rem+env(safe-area-inset-bottom))] sm:py-10"><Suspense fallback={<LoadingMovieGrid />}><Header /><MovieFilters /><MovieGrid /></Suspense></main>;
}
