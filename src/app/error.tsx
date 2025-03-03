"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ErrorProps {
  error?: Error;
  resetErrorBoundary?: () => void;
  message?: string;
}

export default function Error({
  error,
  resetErrorBoundary,
  message = "Wystąpił nieoczekiwany błąd",
}: ErrorProps) {
  const router = useRouter();

  const handleRetry = () => {
    // Refresh the current page
    router.refresh();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
      <div className="rounded-full bg-red-100 p-4 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-10 w-10 text-red-600"
        >
          <path d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">
        Coś poszło nie tak
      </h1>
      <p className="text-slate-500 mb-6 max-w-md">
        {message ||
          error?.message ||
          "Wystąpił nieoczekiwany błąd podczas ładowania strony."}
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        {resetErrorBoundary && (
          <Button
            onClick={handleRetry}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-4"
          >
            Spróbuj ponownie
          </Button>
        )}
        <Link
          href={"/"}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4"
        >
          Wróć do strony głównej
        </Link>
      </div>
    </div>
  );
}
