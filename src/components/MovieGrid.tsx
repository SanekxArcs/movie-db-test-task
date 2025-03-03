import { getMovies } from "@/lib/api";
import MovieCard from "./MovieCard";
import PaginationLinks from "./PaginationLinks";
import { Movie } from "@/types/movie";

export default async function MovieGrid({ 
  category = "popular", 
  page = 1,
  sort 
}: { 
  category: string; 
  page: number;
  sort?: string;
}) {
  
  const data = await getMovies(category, page, "pl-PL", sort);
  const totalPages = Math.min(data.total_pages, 10);

  if (!data.results || data.results.length === 0) {
    return <div className="text-center py-10">No movies found</div>;
  }
  
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {data.results.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <PaginationLinks 
          totalPages={totalPages}
          currentPage={page}
          category={category}
        />
      </div>
    </div>
  );
}