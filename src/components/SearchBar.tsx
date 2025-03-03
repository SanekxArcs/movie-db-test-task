
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
  placeholder = "Search for movies...",
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

    // Create new URLSearchParams object based on the current URL search params
    const params = new URLSearchParams(searchParams);

    // Set the query parameter
    params.set("query", query);

    // Reset to page 1 when searching
    params.delete("page");

    // Navigate to the search results page
    router.push(`/search?${params.toString()}`);

    // You could alternatively just filter on the current page:
    // router.push(`/?${params.toString()}`);

    // Simulate network delay for the loading indicator
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
        "relative flex w-full max-w-sm items-center space-x-2",
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
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>

      <Button type="submit" disabled={isSearching || !query.trim()}>
        {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
      </Button>
    </form>
  );
}
