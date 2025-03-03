import { Skeleton } from "@/components/ui/skeleton";

export function LoadingMovieGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {Array(10)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="flex flex-col">
            <Skeleton className="aspect-[2/3] w-full rounded-lg mb-2" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
    </div>
  );
}

export function LoadingMovieDetails() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <Skeleton className="aspect-[2/3] w-full rounded-lg md:col-span-1" />
      <div className="md:col-span-2 space-y-4">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}
