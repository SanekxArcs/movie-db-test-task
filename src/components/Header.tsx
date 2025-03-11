
import { Clapperboard } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import CategorySelector from "@/components/CategorySelector";
import MovieFilters from "@/components/MovieFilters";
import Link from "next/link";
import { TooltipWrapper } from "./ui/tooltip-wrapper";

export default function Header() {
  return (
    <>
      <div className="mb-6 flex items-start gap-2 flex-col justify-between">
        <Link href="/" className="hover:opacity-80 transition-opacity">
        <TooltipWrapper text="Wróć do strony głównej">
            <h1 className="text-3xl font-bold flex justify-center items-center">
            <Clapperboard className="mr-1 h-8 w-8" /> Movie DB App
            </h1>
        </TooltipWrapper>
        </Link>
        <p className="text-foreground text-sm">
          Zadanie rekrutacyjne dla hurtopony.pl
        </p>
      </div>
      <div className="fixed top-4 right-4 z-50">
        <ModeToggle />
      </div>
        <div className="flex flex-col justify-start md:flex-row gap-2 py-4 px-2">
          <CategorySelector />
          <MovieFilters />
        </div>
    </>
  );
}
