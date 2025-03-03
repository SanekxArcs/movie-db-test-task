"use client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";

export default function MovieFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "popularity.desc";

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex flex-row gap-2">
      <Label>Sortuj:</Label>
      <div className="flex-1 lg:w-60 md:w-50">
        <Select value={currentSort} onValueChange={handleSortChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popularity.desc">Najpopularniejsze</SelectItem>
            <SelectItem value="vote_average.desc">Najwyżej oceniany</SelectItem>
            <SelectItem value="release_date.desc">Najnowsze</SelectItem>
            <SelectItem value="release_date.asc">Najstarszy</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
