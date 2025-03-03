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
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="w-full gap-2 flex">
        <Label>Sortuj według:</Label>
        <Select value={currentSort} onValueChange={handleSortChange}>
          <SelectTrigger>
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
