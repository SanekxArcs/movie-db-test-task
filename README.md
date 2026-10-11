
# Aplikacja do Przeglądania Filmów

Prosta aplikacja webowa umożliwiająca przeglądanie i eksplorowanie filmów, zbudowana przy użyciu nowoczesnych technologii internetowych.

## 🎬 Przegląd

Aplikacja umożliwia użytkownikom przeglądanie kolekcji filmów pobieranych z API The Movie Database (TMDB). Użytkownicy mogą przeglądać listę filmów, wyświetlać szczegóły filmów, filtrować według kategorii oraz sortować na podstawie różnych parametrów.

## ✨ Funkcje

- **Języki**: ukraiński (domyślny), angielski i polski, przypięte w selektorze. Wybrany język jest zapamiętywany i stosowany do interfejsu oraz danych TMDB.
- **Wyszukiwanie**: wyszukiwanie tytułów z paginacją.
- **Dodatkowe filtry**: gatunek, rok premiery, minimalna ocena i język oryginału. Sortowanie po popularności, ocenie, dacie i tytule.
- **Ulubione i chcę obejrzeć**: niezależne listy zapisywane lokalnie w przeglądarce, z wyszukiwaniem i filtrami.

Przy wyszukiwaniu tekstowym filtry gatunku, oceny i języka oryginału oraz sortowanie dotyczą bieżącej strony wyników TMDB. Przy przeglądaniu filmy są filtrowane przez API przed paginacją. Listy są dostępne tylko w przeglądarce, w której je zapisano; nie wymagają konta.

Klucz `TMDB_API_KEY` pozostaje na serwerze; przeglądarka korzysta z `/api/movies`. Zobacz `.env.example`.

- **Lista filmów**: Przeglądanie paginowanej listy filmów z podstawowymi informacjami
- **Szczegóły filmu**: Wyświetlanie kompleksowych informacji o wybranym filmie
- **Kategoryzacja**: Przeglądanie filmów według kategorii/gatunków
- **Filtrowanie i sortowanie**: Filtrowanie i sortowanie filmów na podstawie różnych parametrów
- **Responsywny design**: Optymalizacja dla wszystkich rozmiarów urządzeń
- **Stany ładowania**: Wizualna informacja zwrotna podczas ładowania danych
- **Obsługa błędów**: Eleganckie komunikaty o błędach, gdy wywołania API nie powiodą się

## 🛠️ Użyte technologie

- **Framework**: Next.js 16 z App Router
- **Język**: TypeScript
- **Style**: Tailwind CSS
- **Komponenty UI**: Shadcn/UI
- **Animacje**: Framer Motion

## 📋 Wymagania

- Node.js 22.13.0 lub nowszy
- Polecenia `dev` i `build` korzystają z Webpacka: worker CSS Turbopacka w Next.js 16 kończy się błędem w tym środowisku Windows.
- Klucz API z TMDB (The Movie Database)

## 🚀 Pierwsze kroki

### Instalacja

1. Sklonuj repozytorium:
   ```bash
   git clone https://github.com/SanekxArcs/movie-db-test-task.git
   cd movie-db-test-task
   ```

2. Zainstaluj zależności:
   ```bash
   npm install
   # lub
   yarn install
   # lub
   pnpm install
   ```

3. Utwórz plik `.env.local` w głównym katalogu projektu i dodaj swój klucz API TMDB:
   ```
   TMDB_API_KEY=twój_klucz_api_tutaj
   ```

### Uruchamianie aplikacji

Tryb deweloperski:
```bash
npm run dev
# lub
yarn dev
# lub
pnpm dev
```

Otwórz [http://localhost:3000](http://localhost:3000) w przeglądarce, aby zobaczyć aplikację.

Budowanie dla produkcji:
```bash
npm run build
npm run start
```

## 📁 Struktura projektu

```
/src
├── app              # Next.js app router
│   ├── movie/[id]   # Strona szczegółów filmu
│   └── page.tsx     # Strona główna z listą filmów
├── components       # Komponenty React
├── hooks            # Niestandardowe hooki React
├── lib              # Funkcje użytkowe i klienty API
├── types            # Definicje typów TypeScript
└── styles           # Style globalne
```

## 🌐 Integracja API

Aplikacja korzysta z [The Movie Database (TMDB) API](https://developer.themoviedb.org/docs) do pobierania danych o filmach. Aby uruchomić aplikację lokalnie, musisz zarejestrować się i uzyskać klucz API.

## 📱 Responsywny design

Aplikacja jest w pełni responsywna i działa na:
- Urządzeniach mobilnych
- Tabletach
- Komputerach stacjonarnych

## 🚀 Wdrożenie

Aplikację można wdrożyć na Vercel:

1. Wypchnij kod do repozytorium GitHub
2. Połącz repozytorium z Vercel 
3. Ustaw polecenie instalacji na `npm ci` (bez `--legacy-peer-deps`).
4. Dodaj zmienne środowiskowe w ustawieniach projektu Vercel
5. Wdróż

## 🤝 Współpraca

Mile widziane są wkłady, zgłaszanie problemów i prośby o funkcje!

## 📝 Licencja

Ten projekt jest dostępny jako open source na warunkach licencji MIT.
