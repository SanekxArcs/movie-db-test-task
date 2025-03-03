import Link from 'next/link';
import Image from 'next/image';
import { getImageUrl } from '@/lib/api';
import type { Movie } from '@/types/movie';
import { ImageOff } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { id, title, poster_path, vote_average, release_date } = movie;

  const releaseYear = release_date ? new Date(release_date).getFullYear() : null;

  const formattedRating = vote_average ? vote_average.toFixed(1) : 'N/A';
  
  return (
    <Link 
      href={`/movie/${id}`}
      className="block group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        {poster_path ? (
          <Image
            src={getImageUrl(poster_path)}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={false}
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full bg-gray-100">
            <ImageOff className="h-12 w-12 text-gray-400" />
          </div>
        )}
        
        <div className="absolute top-2 right-2 bg-black/70 text-white text-sm px-2 py-1 rounded-md">
          {formattedRating}
        </div>
      </div>
      
      <div className="p-3">
        <h3 className="font-medium truncate">{title}</h3>
        {releaseYear && (
          <p className="text-sm text-gray-500">{releaseYear}</p>
        )}
      </div>
    </Link>
  );
}
