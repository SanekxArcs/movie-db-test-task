import Link from "next/link";
import { cn } from "@/lib/utils";

interface PaginationLinksProps {
  totalPages: number;
  currentPage: number;
  category: string;
}

export default function PaginationLinks({
  totalPages,
  currentPage,
  category,
}: PaginationLinksProps) {

  const generatePaginationItems = () => {
    const items = [];
    const maxVisiblePages = 3;

    items.push(1);

    let startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 2);

    if (startPage === 2) {
      endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);
    }

    if (endPage === totalPages - 1) {
      startPage = Math.max(2, endPage - (maxVisiblePages - 2));
    }

    if (startPage > 2) {
      items.push("ellipsis1");
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(i);
    }

    if (endPage < totalPages - 1) {
      items.push("ellipsis2");
    }

    if (totalPages > 1) {
      items.push(totalPages);
    }
    
    return items;
  };
  
  const paginationItems = generatePaginationItems();
  
  return (
    <nav className="flex justify-center items-center space-x-2 mt-8">
      {currentPage > 1 && (
        <Link 
          href={`/${category}?page=${currentPage - 1}`}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-10 w-10 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
          aria-label="Go to previous page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </Link>
      )}
      
      {paginationItems.map((item, index) => {
        if (item === "ellipsis1" || item === "ellipsis2") {
          return (
            <span 
              key={`ellipsis-${index}`}
              className="flex items-center justify-center h-10 w-10 text-sm"
            >
              ...
            </span>
          );
        }
        
        const pageNum = item as number;
        return (
          <Link
            key={`page-${pageNum}`}
            href={`/${category}?page=${pageNum}`}
            className={cn(
              "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-10 w-10",
              pageNum === currentPage
                ? "bg-primary text-primary-foreground"
                : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            )}
            aria-label={`Go to page ${pageNum}`}
            aria-current={pageNum === currentPage ? "page" : undefined}
          >
            {pageNum}
          </Link>
        );
      })}
      
      {currentPage < totalPages && (
        <Link
          href={`/${category}?page=${currentPage + 1}`}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-10 w-10 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
          aria-label="Go to next page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </Link>
      )}
    </nav>
  );
}
