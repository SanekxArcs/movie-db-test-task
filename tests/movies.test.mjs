import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import ts from "typescript";

const require = createRequire(import.meta.url);
function load(path, dependencies = {}, mockFetch) {
  const source = readFileSync(new URL(path, import.meta.url), "utf8");
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const module = { exports: {} };
  new Function("require", "module", "exports", "fetch", code)(name => dependencies[name] || require(name), module, module.exports, mockFetch);
  return module.exports;
}
const filters = load("../src/lib/movie-filters.ts");
const movie = { id: 1, title: "Arrival", original_title: "Arrival", original_language: "en", release_date: "2016-11-11", vote_average: 8, popularity: 50, genre_ids: [878] };

test("combined filters use genre, year, rating, language, and title", () => {
  assert.equal(filters.matchesFilters(movie, new URLSearchParams({ genre: "878", year: "2016", rating: "7", original: "en", q: " ARRIVAL " })), true);
  for (const params of [{ genre: "35" }, { year: "2020" }, { rating: "9" }, { original: "uk" }, { q: "Dune" }]) {
    assert.equal(filters.matchesFilters(movie, new URLSearchParams(params)), false);
  }
  assert.equal(filters.matchesFilters({ ...movie, genre_ids: undefined, genres: [{ id: 878, name: "Science Fiction" }] }, new URLSearchParams({ genre: "878" })), true);
});

test("sort works without mutating a saved list", () => {
  const second = { ...movie, id: 2, title: "Dune", release_date: "2021-10-01", popularity: 100, vote_average: 7 };
  const source = [movie, second];
  assert.deepEqual(filters.sortMovies(source, "popularity.desc").map(item => item.id), [2, 1]);
  assert.deepEqual(filters.sortMovies(source, "vote_average.desc").map(item => item.id), [1, 2]);
  assert.deepEqual(filters.sortMovies(source, "primary_release_date.desc").map(item => item.id), [2, 1]);
  assert.deepEqual(filters.sortMovies(source, "primary_release_date.asc").map(item => item.id), [1, 2]);
  assert.deepEqual(source.map(item => item.id), [1, 2]);
});

test("server API builds safe requests and handles search and failures", async () => {
  const previous = process.env.TMDB_API_KEY;
  const previousPublic = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  process.env.TMDB_API_KEY = "test-key";
  let upstream;
  let ok = true;
  const api = load("../src/app/api/movies/route.ts", {
    "next/server": { NextResponse: { json: (data, options) => Response.json(data, options) } },
    "@/lib/movie-filters": filters,
  }, async url => {
    upstream = new URL(url);
    return { ok, status: ok ? 200 : 401, json: async () => ({ page: 1, results: [movie, { ...movie, id: 2, vote_average: 4 }], total_pages: 3, total_results: 42 }) };
  });
  const request = query => ({ nextUrl: new URL(`http://localhost/api/movies?${query}`) });
  try {
    let response = await api.GET(request("genre=878&year=2016&rating=7&original=en&sort=vote_average.desc&page=999&language=pl-PL"));
    assert.equal(response.status, 200);
    assert.equal(upstream.pathname, "/3/discover/movie");
    assert.equal(upstream.searchParams.get("with_genres"), "878");
    assert.equal(upstream.searchParams.get("primary_release_year"), "2016");
    assert.equal(upstream.searchParams.get("vote_average.gte"), "7");
    assert.equal(upstream.searchParams.get("with_original_language"), "en");
    assert.equal(upstream.searchParams.get("page"), "500");
    assert.equal(upstream.searchParams.get("language"), "pl-PL");
    assert.equal(upstream.searchParams.get("api_key"), "test-key");
    response = await api.GET(request("q=Arrival&rating=7&genre=878&sort=vote_average.desc"));
    assert.equal(upstream.pathname, "/3/search/movie");
    assert.deepEqual((await response.json()).results.map(item => item.id), [1]);
    await api.GET(request("id=1&language=uk-UA"));
    assert.equal(upstream.pathname, "/3/movie/1");
    assert.equal(upstream.searchParams.get("append_to_response"), "credits,videos,similar");
    assert.equal((await api.GET(request("id=../unsafe"))).status, 400);
    await api.GET(request("language=invalid&sort=unsafe&category=top_rated"));
    assert.equal(upstream.searchParams.get("language"), "uk-UA");
    assert.equal(upstream.searchParams.get("sort_by"), "popularity.desc");
    ok = false;
    response = await api.GET(request(""));
    assert.equal(response.status, 502);
    assert.equal(JSON.stringify(await response.json()).includes("test-key"), false);
    delete process.env.TMDB_API_KEY; delete process.env.NEXT_PUBLIC_TMDB_API_KEY;
    assert.equal((await api.GET(request(""))).status, 503);
  } finally {
    if (previous === undefined) delete process.env.TMDB_API_KEY; else process.env.TMDB_API_KEY = previous;
    if (previousPublic === undefined) delete process.env.NEXT_PUBLIC_TMDB_API_KEY; else process.env.NEXT_PUBLIC_TMDB_API_KEY = previousPublic;
  }
});
