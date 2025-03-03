
export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="relative flex h-10 w-10">
        <div className="animate-spin h-10 w-10 border-4 border-slate-200 rounded-full"></div>
        <div className="animate-spin absolute top-0 left-0 h-10 w-10 border-4 border-t-emerald-600 rounded-full"></div>
      </div>
      <div className="text-lg font-medium text-slate-700">Ładowanie...</div>
      <p className="text-slate-500 text-sm text-center max-w-md">
        Trwa pobieranie danych, proszę chwilę zaczekać.
      </p>
    </div>
  );
}
