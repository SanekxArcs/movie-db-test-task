export const languages = [
  { code: "uk-UA", label: "Українська", short: "UA", html: "uk" },
  { code: "en-US", label: "English", short: "EN", html: "en" },
  { code: "pl-PL", label: "Polski", short: "PL", html: "pl" },
] as const;
export type Language = typeof languages[number]["code"];
export function isLanguage(value: string | null): value is Language {
  return languages.some(language => language.code === value);
}
const en = {
  searchFilters: "Search & filters", activeFilters: "Active filters",
  dragCast: "Drag or swipe to explore the cast", previousActors: "Previous actors", nextActors: "Next actors",
  preview: "Show movie preview", closePreview: "Close movie preview", details: "More details",
  tagline: "Find your next favorite film.", discover: "Discover", favorites: "Favorites", watchlist: "Want to watch",
  language: "Language", pinned: "Pinned languages", search: "Search", searchPlaceholder: "Search movies…",
  category: "Collection", popular: "Popular", top_rated: "Top rated", upcoming: "Upcoming", now_playing: "In cinemas",
  genre: "Genre", allGenres: "All genres", year: "Release year", allYears: "Any year", rating: "Minimum rating", anyRating: "Any rating",
  original: "Original language", anyLanguage: "Any language", sort: "Sort by", popularity: "Most popular", best: "Highest rated",
  newest: "Newest first", oldest: "Oldest first", title: "Title A–Z", reset: "Reset filters", loading: "Loading…",
  error: "Couldn’t load movies. Check your connection and the app’s TMDB API key.", retry: "Try again", empty: "No movies found",
  emptyHint: "Try another search or adjust your filters.", favoritesHint: "Tap the heart on a movie to save it here.",
  watchlistHint: "Save movies you want to watch with the bookmark button.", addFavorite: "Add to favorites", removeFavorite: "Remove from favorites",
  addWatchlist: "Add to want to watch", removeWatchlist: "Remove from want to watch", back: "Back", overview: "Overview", cast: "Cast",
  noOverview: "No overview available in this language.", noRating: "Unrated", noDate: "Unknown year", previous: "Previous page", next: "Next page",
  theme: "Theme", light: "Light", dark: "Dark", system: "System", savedNote: "Your lists are saved in this browser.",
  searchNote: "Genre, rating, original language, and sorting apply to the current page of search results.",
  storageError: "Browser storage is unavailable. Your changes will last for this session only.", genreError: "Genres couldn’t load.",
  results: "movies", page: "Page", of: "of", clearSearch: "Clear search", ukrainian: "Ukrainian", english: "English", polish: "Polish",
  german: "German", french: "French", spanish: "Spanish", italian: "Italian", japanese: "Japanese", korean: "Korean",
};
export type Messages = typeof en;
const uk: Messages = {
  searchFilters: "Пошук і фільтри", activeFilters: "Активні фільтри",
  dragCast: "Перетягуйте або гортайте, щоб переглянути акторів", previousActors: "Попередні актори", nextActors: "Наступні актори",
  preview: "Показати огляд фільму", closePreview: "Закрити огляд фільму", details: "Докладніше",
  tagline: "Знайдіть свій наступний улюблений фільм.", discover: "Огляд", favorites: "Улюблені", watchlist: "Хочу подивитися",
  language: "Мова", pinned: "Закріплені мови", search: "Пошук", searchPlaceholder: "Пошук фільмів…",
  category: "Добірка", popular: "Популярні", top_rated: "Найкращі за рейтингом", upcoming: "Скоро на екранах", now_playing: "У кінотеатрах",
  genre: "Жанр", allGenres: "Усі жанри", year: "Рік виходу", allYears: "Будь-який рік", rating: "Мінімальний рейтинг", anyRating: "Будь-який рейтинг",
  original: "Мова оригіналу", anyLanguage: "Будь-яка мова", sort: "Сортування", popularity: "За популярністю", best: "За рейтингом",
  newest: "Спочатку нові", oldest: "Спочатку старі", title: "За назвою", reset: "Скинути фільтри", loading: "Завантаження…",
  error: "Не вдалося завантажити фільми. Перевірте з’єднання та ключ TMDB API у застосунку.", retry: "Спробувати знову", empty: "Фільмів не знайдено",
  emptyHint: "Спробуйте інший запит або змініть фільтри.", favoritesHint: "Натисніть на серце біля фільму, щоб зберегти його тут.",
  watchlistHint: "Зберігайте фільми для перегляду за допомогою закладки.", addFavorite: "Додати до улюблених", removeFavorite: "Видалити з улюблених",
  addWatchlist: "Додати до списку перегляду", removeWatchlist: "Видалити зі списку перегляду", back: "Назад", overview: "Опис", cast: "Актори",
  noOverview: "Опис цією мовою відсутній.", noRating: "Без оцінки", noDate: "Рік невідомий", previous: "Попередня сторінка", next: "Наступна сторінка",
  theme: "Тема", light: "Світла", dark: "Темна", system: "Системна", savedNote: "Ваші списки зберігаються в цьому браузері.",
  searchNote: "Жанр, рейтинг, мова оригіналу та сортування застосовуються до поточної сторінки результатів пошуку.",
  storageError: "Сховище браузера недоступне. Зміни збережуться лише протягом цього сеансу.", genreError: "Не вдалося завантажити жанри.",
  results: "фільмів", page: "Сторінка", of: "з", clearSearch: "Очистити пошук", ukrainian: "Українська", english: "Англійська", polish: "Польська",
  german: "Німецька", french: "Французька", spanish: "Іспанська", italian: "Італійська", japanese: "Японська", korean: "Корейська",
};
const pl: Messages = {
  searchFilters: "Wyszukiwanie i filtry", activeFilters: "Aktywne filtry",
  dragCast: "Przeciągnij lub przesuń, aby zobaczyć obsadę", previousActors: "Poprzedni aktorzy", nextActors: "Następni aktorzy",
  preview: "Pokaż podgląd filmu", closePreview: "Zamknij podgląd filmu", details: "Więcej szczegółów",
  tagline: "Znajdź swój kolejny ulubiony film.", discover: "Odkrywaj", favorites: "Ulubione", watchlist: "Chcę obejrzeć",
  language: "Język", pinned: "Przypięte języki", search: "Szukaj", searchPlaceholder: "Szukaj filmów…",
  category: "Kolekcja", popular: "Popularne", top_rated: "Najwyżej oceniane", upcoming: "Wkrótce", now_playing: "W kinach",
  genre: "Gatunek", allGenres: "Wszystkie gatunki", year: "Rok premiery", allYears: "Dowolny rok", rating: "Minimalna ocena", anyRating: "Dowolna ocena",
  original: "Język oryginału", anyLanguage: "Dowolny język", sort: "Sortuj według", popularity: "Popularność", best: "Najwyższa ocena",
  newest: "Od najnowszych", oldest: "Od najstarszych", title: "Tytuł A–Z", reset: "Resetuj filtry", loading: "Ładowanie…",
  error: "Nie udało się załadować filmów. Sprawdź połączenie i klucz TMDB API aplikacji.", retry: "Spróbuj ponownie", empty: "Nie znaleziono filmów",
  emptyHint: "Spróbuj innego wyszukiwania lub zmień filtry.", favoritesHint: "Kliknij serce przy filmie, aby go tutaj zapisać.",
  watchlistHint: "Zapisuj filmy do obejrzenia przyciskiem zakładki.", addFavorite: "Dodaj do ulubionych", removeFavorite: "Usuń z ulubionych",
  addWatchlist: "Dodaj do listy do obejrzenia", removeWatchlist: "Usuń z listy do obejrzenia", back: "Wróć", overview: "Opis", cast: "Obsada",
  noOverview: "Brak opisu w tym języku.", noRating: "Brak oceny", noDate: "Nieznany rok", previous: "Poprzednia strona", next: "Następna strona",
  theme: "Motyw", light: "Jasny", dark: "Ciemny", system: "Systemowy", savedNote: "Twoje listy są zapisywane w tej przeglądarce.",
  searchNote: "Gatunek, ocena, język oryginału i sortowanie dotyczą bieżącej strony wyników wyszukiwania.",
  storageError: "Pamięć przeglądarki jest niedostępna. Zmiany zostaną zachowane tylko podczas tej sesji.", genreError: "Nie udało się załadować gatunków.",
  results: "filmów", page: "Strona", of: "z", clearSearch: "Wyczyść wyszukiwanie", ukrainian: "Ukraiński", english: "Angielski", polish: "Polski",
  german: "Niemiecki", french: "Francuski", spanish: "Hiszpański", italian: "Włoski", japanese: "Japoński", korean: "Koreański",
};
export const translations: Record<Language, Messages> = { "uk-UA": uk, "en-US": en, "pl-PL": pl };
