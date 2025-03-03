import { Suspense } from "react";
import MovieGrid from "@/components/MovieGrid";
import { LoadingMovieGrid } from "@/components/LoadingStates";
import Header from "@/components/Header";

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
      <Header />
      <Suspense fallback={<LoadingMovieGrid />}>
        <MovieGrid category={category} page={page} sort={sort} />
      </Suspense>
    </main>
  );
}
