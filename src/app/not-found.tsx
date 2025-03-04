import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center">
      <h1 className="text-8xl font-extrabold text-slate-900 dark:text-slate-100 mb-4">404</h1>
      <div className="mb-8">
        <div className="h-1 w-20 bg-blue-600 dark:bg-blue-500 rounded-full mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-2">
          Strona nie została znaleziona
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Przepraszamy, nie mogliśmy znaleźć strony, której szukasz. Możliwe, że
          adres URL został wpisany niepoprawnie lub strona została przeniesiona.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/">
          <Button variant="default">Wróć do strony głównej</Button>
        </Link>
      </div>
    </div>
  );
}
