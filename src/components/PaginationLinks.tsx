import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface PaginationLinksProps {
  totalPages: number;
  currentPage: number;
}

export default function PaginationLinks({ totalPages, currentPage }: PaginationLinksProps) {

  const createPageURL = (pageNumber: number) => {
    return `?page=${pageNumber}`;
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 3;
    
    let startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    if (startPage > 1) {
      pageNumbers.push(
        <Button key="1" variant={1 === currentPage ? "default" : "outline"} asChild>
          <Link href={createPageURL(1)}>1</Link>
        </Button>
      );
      if (startPage > 2) {
        pageNumbers.push(<span key="ellipsis1" className="px-3">...</span>);
      }
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Button key={i} variant={i === currentPage ? "default" : "outline"} asChild>
          <Link href={createPageURL(i)}>{i}</Link>
        </Button>
      );
    }
    
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="ellipsis2" className="px-3">...</span>);
      }
      pageNumbers.push(
        <Button key={totalPages} variant={totalPages === currentPage ? "default" : "outline"} asChild>
          <Link href={createPageURL(totalPages)}>{totalPages}</Link>
        </Button>
      );
    }
    
    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center gap-2 my-8 flex-wrap">
      <Button 
        variant="outline"
        disabled={currentPage <= 1}
        asChild
      >
        <Link href={createPageURL(currentPage - 1)}>Previous</Link>
      </Button>
      
      <div className="flex items-center gap-1">
        {renderPageNumbers()}
      </div>
      
      <Button 
        variant="outline"
        disabled={currentPage >= totalPages}
        asChild
      >
        <Link href={createPageURL(currentPage + 1)}>Next</Link>
      </Button>
    </div>
  );
}
