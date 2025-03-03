"use client";

import { useEffect, useState } from 'react';
import { fetchMoviesByCategory } from '@/lib/api';
import { Movie } from '@/types/movie';
import MovieCard from './MovieCard';
import Pagination from './Pagination';
import { LoadingMovieGrid } from './LoadingStates';
import { motion } from 'framer-motion';

interface MovieGridProps {
  category: string;
  page: number;
  sort?: string;
}

export default function MovieGrid({ category, page, sort }: MovieGridProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchMoviesByCategory(category, page, 'pl-PL', sort);
        setMovies(response.results);
        setTotalPages(response.total_pages > 500 ? 500 : response.total_pages);
      } catch (err) {
        console.error('Error loading movies:', err);
        setError('Failed to load movies. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [category, page, sort]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  if (loading) {
    return (
      <LoadingMovieGrid />
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (movies.length === 0) {
    return <div className="text-center">Nie znaleziono</div>;
  }

  return (
    <>
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {movies.map((movie) => (
          <motion.div key={movie.id} variants={item}>
            <MovieCard movie={movie} />
          </motion.div>
        ))}
      </motion.div>
      <motion.div 
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Pagination currentPage={page} totalPages={totalPages} />
      </motion.div>
    </>
  );
}