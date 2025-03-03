"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { getMovieDetails, IMAGE_BASE_URL } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { LoadingMovieDetails } from "@/components/LoadingStates";
import { Movie } from "@/types/movie";
import { motion } from "framer-motion";
import { ImageOff } from "lucide-react";

type Params = Promise<{ id: string }>;


const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

const posterVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7 } }
};

const detailsVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.15,
      delayChildren: 0.2
    } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const castVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.07,
      delayChildren: 0.6
    } 
  }
};

const castItemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
};


const MotionButton = motion(Button);

export default function MoviePage(props: { params: Params }) {
  const router = useRouter();
  const [movie, setMovie] = React.useState<Movie | null>(null);
  const [error, setError] = React.useState<boolean>(false);

  useEffect(() => {
    async function loadMovie() {
      try {
        const params = await props.params;
        const movieId = params.id;
        const movieData = await getMovieDetails(movieId);
        setMovie(movieData);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError(true);
      }
    }
    
    loadMovie();
  }, [props.params]);

  if (!movie && !error) {
    return <LoadingMovieDetails />;
  }

  if (error || !movie) {
    return (
      <motion.div 
        className="container mx-auto px-4 py-8"
        initial="hidden"
        animate="visible"
        variants={pageVariants}
      >
        <MotionButton 
          variant="outline" 
          className="mb-8"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          onClick={() => router.back()}
        >
          ← Wróć
        </MotionButton>
        <div className="flex flex-col items-center justify-center space-y-4">
          <motion.h1 variants={itemVariants} className="text-3xl font-bold mb-4">Film nie znaleziony</motion.h1>
        <motion.p variants={itemVariants}>Przepraszamy, nie mogliśmy znaleźć żądanego filmu.</motion.p>
        </div>
        
      </motion.div>
    );
  }

  return (
    <motion.main
      className="container mx-auto px-4 py-8"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <MotionButton
        variant="outline"
        className="mb-8"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        whileHover={{ x: -5 }}
        onClick={() => router.back()}
      >
        ← Wróć
      </MotionButton>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Movie poster */}
        <motion.div className="md:col-span-1" variants={posterVariants}>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              {movie.poster_path ? <Image
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                width={500}
                height={750}
                className="w-full h-auto"
              /> : <div className="w-full h-[750px] bg-gray-200 dark:bg-gray-800 flex justify-center items-center"><ImageOff /></div>}
              
            </motion.div>
          </div>
        </motion.div>

        {/* Movie details */}
        <motion.div className="md:col-span-2 " variants={detailsVariants}>
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-bold mb-4 cursor-default"
          >
            {movie.title}
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="flex items-center space-x-4 mb-4 cursor-default"
          >
            <motion.span
              className="bg-yellow-500 text-black font-bold px-2 py-1 rounded"
              whileHover={{ scale: 1.1 }}
            >
              {movie.vote_average.toFixed(1)}
            </motion.span>
            <span>{movie.release_date}</span>
            <span>{movie.runtime ?? 0} min</span>
          </motion.div>

          {/* Genres */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 mb-4 cursor-default"
          >
            {movie.genres && movie.genres.length > 0 ? (
              movie.genres.map((genre) => (
                <motion.span
                  key={genre.id}
                  className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {genre.name}
                </motion.span>
              ))
            ) : (
              <p>Brak dostępnych gatunków</p>
            )}
          </motion.div>

          {/* Movie overview */}
          <div className="col-span-2">
            <motion.h2
              variants={itemVariants}
              className="text-2xl font-semibold mb-2 cursor-default"
            >
              Omówienie
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-gray-700 dark:text-gray-300 mb-6 cursor-default"
            >
              {movie.overview}
            </motion.p>
          </div>

          {/* Cast list */}
          <div className="col-span-2">
            <motion.h2
              variants={itemVariants}
              className="text-2xl font-semibold cursor-default mb-2"
            >
              Obsada aktorska
            </motion.h2>
            <motion.div
              className="flex overflow-x-auto gap-4 py-4"
              variants={castVariants}
            >
              {(movie.credits?.cast ?? []).slice(0, 10).map((person) => (
                <motion.div
                  key={person.id}
                  className="flex-shrink-0 w-24 p-0 border-border border dark:border-border-dark rounded-md cursor-default hover:shadow-md transition-shadow duration-300"
                  variants={castItemVariants}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
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
                    <div className="w-full h-[150px] bg-gray-200 dark:bg-gray-800 rounded-md mb-1 flex justify-center items-center">
                      <ImageOff />
                    </div>
                  )}
                  <p className="text-sm  font-medium truncate px-1">
                    {person.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate pb-1 px-1">
                    {person.character}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}

