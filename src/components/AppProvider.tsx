"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Movie } from "@/types/movie";
import { isLanguage, languages, translations, type Language, type Messages } from "@/lib/translations";

type Lists = { favorites: Movie[]; watchlist: Movie[] };
type List = keyof Lists;
const emptyLists: Lists = { favorites: [], watchlist: [] };
const storageKey = "movie-db-lists-v1";
function readLists(value: string | null): Lists {
  if (!value) return emptyLists;
  try {
    const data = JSON.parse(value);
    const valid = (list: unknown): Movie[] => Array.isArray(list) ? list.filter(movie => movie && Number.isInteger(movie.id) && typeof movie.title === "string" && typeof movie.vote_average === "number") : [];
    return { favorites: valid(data?.favorites), watchlist: valid(data?.watchlist) };
  } catch { return emptyLists; }
}
const Context = createContext<{
  language: Language; setLanguage: (language: Language) => void; t: Messages;
  lists: Lists; toggle: (list: List, movie: Movie) => void; ready: boolean; storageError: boolean;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, updateLanguage] = useState<Language>("uk-UA");
  const [lists, setLists] = useState<Lists>(emptyLists);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState(false);
  useEffect(() => {
    const selected = new URLSearchParams(window.location.search).get("lang");
    if (isLanguage(selected)) updateLanguage(selected);
    try {
      const stored = localStorage.getItem("movie-db-language");
      if (!isLanguage(selected) && isLanguage(stored)) updateLanguage(stored);
      setLists(readLists(localStorage.getItem(storageKey)));
    } catch { setStorageError(true); }
    setReady(true);
    const sync = (event: StorageEvent) => {
      if (event.key === storageKey) setLists(readLists(event.newValue));
      if (event.key === "movie-db-language" && isLanguage(event.newValue)) updateLanguage(event.newValue);
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  useEffect(() => {
    document.documentElement.lang = languages.find(item => item.code === language)!.html;
    if (!ready) return;
    try { localStorage.setItem("movie-db-language", language); } catch { setStorageError(true); }
  }, [language, ready]);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(storageKey, JSON.stringify(lists)); } catch { setStorageError(true); }
  }, [lists, ready]);
  function toggle(list: List, movie: Movie) {
    setLists(previous => ({ ...previous, [list]: previous[list].some(item => item.id === movie.id)
      ? previous[list].filter(item => item.id !== movie.id)
      : [...previous[list], { ...movie, credits: undefined, videos: undefined, similar: undefined }] }));
  }
  return <Context.Provider value={{ language, setLanguage: updateLanguage, t: translations[language], lists, toggle, ready, storageError }}>{children}</Context.Provider>;
}
export function useApp() {
  const context = useContext(Context);
  if (!context) throw new Error("AppProvider is required");
  return context;
}
