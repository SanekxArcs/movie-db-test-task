import { Suspense } from "react";
import MovieGrid from "@/components/MovieGrid";
import MovieFilters from "@/components/MovieFilters";
import CategorySelector from "@/components/CategorySelector";
import { LoadingMovieGrid } from "@/components/LoadingStates";
import Loading from "./loading";
import SearchBar from "@/components/SearchBar";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category = searchParams.category?.toString() || "popular";
  const page = parseInt(searchParams.page?.toString() || "1");
  const sort = searchParams.sort?.toString();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Movie Explorer</h1>

      <div className="mb-6 flex items-start justify-between">
        <Suspense fallback={<Loading />}>
          <CategorySelector /><MovieFilters /><SearchBar/>
        </Suspense>
      </div>
      <Suspense fallback={<Loading />}>
        
      </Suspense>

      <Suspense fallback={<LoadingMovieGrid />}>
        <MovieGrid category={category} page={page} sort={sort} />
      </Suspense>
    </main>
  );
}
