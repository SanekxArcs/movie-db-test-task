"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getCategories } from "@/lib/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";
import { Loader2 } from "lucide-react";

interface Genre {
  id: number;
  name: string;
}

export default function CategorySelector() {
  const [categories, setCategories] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "popular";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getCategories();
        console.log(data);
        setCategories(data.genres);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        
        setError("Failed to load categories. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", value);
    params.delete("page");
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex flex-row gap-2">
      <Label>Kategoria:</Label>
      <div className="flex-1 lg:w-60 md:w-50">
        <Select
          value={currentCategory}
          onValueChange={handleCategoryChange}
          disabled={isLoading}
        >
          <SelectTrigger className="w-full flex-1 sm:w-auto sm:min-w-[200px] md:min-w-[240px]">
            {isLoading ? (
              <div className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Ładowanie...</span>
              </div>
            ) : (
              <SelectValue placeholder="Select category" />
            )}
          </SelectTrigger>
          <SelectContent className="max-h-[300px] overflow-y-auto">
            <SelectItem value="popular">Popularne</SelectItem>
            <SelectItem value="top_rated">Najwyżej oceniane</SelectItem>
            <SelectItem value="upcoming">Nadchodzące</SelectItem>
            <SelectItem value="now_playing">Teraz odtwarzane</SelectItem>

            {categories.length > 0 && (
              <div className="py-2">
                <div className="px-2 text-xs font-semibold text-muted-foreground">
                  Gatunki
                </div>
                <div className="mt-1">
                  {categories.map((genre) => (
                    <SelectItem key={genre.id} value={`genre/${genre.id}`}>
                      {genre.name}
                    </SelectItem>
                  ))}
                </div>
              </div>
            )}
          </SelectContent>
        </Select>
      </div>

      {error && <p className="text-sm text-red-500 w-full">{error}</p>}
    </div>
  );
}
