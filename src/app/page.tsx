import { Suspense } from "react";
import MovieGrid from "@/components/MovieGrid";
import MovieFilters from "@/components/MovieFilters";
import CategorySelector from "@/components/CategorySelector";
import { LoadingMovieGrid } from "@/components/LoadingStates";
import Loading from "./loading";
import SearchBar from "@/components/SearchBar";
import { Clapperboard } from "lucide-react";

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
      <div className="mb-6 flex items-start gap-2 flex-col justify-between">
        <h1 className="text-3xl font-bold flex justify-center items-center"><Clapperboard className="mr-1 h-8 w-8"/> Movie DB App</h1>
      <p className="text-foreground text-sm">Test task for hurtopony.pl</p>
      </div>
      

      <div className="mb-6 flex gap-2 flex-col lg:flex-row justify-between">
        <Suspense fallback={<Loading />}>
        <div className="flex flex-col justify-between md:flex-row gap-2">
          <CategorySelector />
          <MovieFilters />
        </div>
          <SearchBar />
        </Suspense>
      </div>
      <Suspense fallback={<LoadingMovieGrid />}>
        <MovieGrid category={category} page={page} sort={sort} />
      </Suspense>
    </main>
  );
}
