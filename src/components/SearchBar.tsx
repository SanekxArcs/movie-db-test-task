
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  placeholder = "Wyszukaj filmy...",
  className,
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";

  const [query, setQuery] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    setIsSearching(true);

    const params = new URLSearchParams(searchParams);

    params.set("query", query);

    params.delete("page");

    router.push(`/search?${params.toString()}`);

    setTimeout(() => {
      setIsSearching(false);
    }, 300);
  };

  const clearSearch = () => {
    setQuery("");
    const params = new URLSearchParams(searchParams);
    params.delete("query");
    router.push(`/?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className={cn(
        "relative flex w-full lg:max-w-sm items-center space-x-2",
        className
      )}
    >
      <div className="relative w-full">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />

        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-9 pr-10"
          disabled={isSearching}
        />

        {query && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={clearSearch}
            disabled={isSearching}
          >
            <X className="h-4 w-4 text-muted-foreground" />
            <span className="sr-only">Wyczyść</span>
          </Button>
        )}
      </div>

      <Button type="submit" disabled={isSearching || !query.trim()}>
        {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : "Szukaj"}
      </Button>
    </form>
  );
}
