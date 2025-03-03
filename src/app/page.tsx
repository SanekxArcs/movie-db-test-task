import { Suspense } from "react";
import MovieGrid from "@/components/MovieGrid";
import MovieFilters from "@/components/MovieFilters";
import CategorySelector from "@/components/CategorySelector";
import { LoadingMovieGrid } from "@/components/LoadingStates";
import Loading from "./loading";
import { Clapperboard } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";

type Params = Promise<{
  key: string;
  category?: string;
  page?: string;
  sort?: string;
}>;

export default async function Home(props: { searchParams: Params }) {
  const searchParams = await props.searchParams;
  const category =
    typeof searchParams.category === "string"
      ? searchParams.category
      : "popular";
  const page =
    typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1;
  const sort =
    typeof searchParams?.sort === "string" ? searchParams.sort : undefined;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-start gap-2 flex-col justify-between">
        <h1 className="text-3xl font-bold flex justify-center items-center">
          <Clapperboard className="mr-1 h-8 w-8" /> Movie DB App
        </h1>
        <p className="text-foreground text-sm">
          Zadanie rekrutacyjne dla hurtopony.pl
        </p>
      </div>
      <div className="fixed top-4 right-4 z-50">
        <ModeToggle />
      </div>
      <Suspense fallback={<Loading />}>
        <div className="flex flex-col justify-start md:flex-row gap-2 py-4 px-2">
          <CategorySelector />
          <MovieFilters />
        </div>
      </Suspense>
      <Suspense fallback={<LoadingMovieGrid />}>
        <MovieGrid category={category} page={page} sort={sort} />
      </Suspense>
    </main>
  );
}
