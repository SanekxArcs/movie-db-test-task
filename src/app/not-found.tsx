import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center">
      <h1 className="text-8xl font-extrabold text-slate-900 mb-4">404</h1>
      <div className="mb-8">
        <div className="h-1 w-20 bg-blue-600 rounded-full mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">
          Strona nie została znaleziona
        </h2>
        <p className="text-slate-500 max-w-md mx-auto">
          Przepraszamy, nie mogliśmy znaleźć strony, której szukasz. Możliwe, że
          adres URL został wpisany niepoprawnie lub strona została przeniesiona.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-4"
        >
          Strona główna
        </Link>
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4"
        >
          Wróć do poprzedniej strony
        </button>
      </div>
    </div>
  );
}
