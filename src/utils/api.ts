// api.ts

import { useQuery } from 'react-query';

interface Character {
  id: number;
  name: string;
  // Otros campos relevantes
}

interface Movie {
  id: number;
  title: string;
  opening_crawl: string;
  // Otros campos relevantes
}

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

async function fetchCharacters(page: number): Promise<PaginatedResponse<Character>> {
  const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
  const data = await response.json();
  return data;
}

async function fetchMovie(movieId: number): Promise<Movie> {
  const response = await fetch(`https://swapi.dev/api/films/${movieId}/`);
  const data = await response.json();
  return data;
}

export function useCharacters(page: number) {
  return useQuery<PaginatedResponse<Character>, Error>(['characters', page], () => fetchCharacters(page));
}

export function useMovie(movieId: number) {
  return useQuery<Movie, Error>(['movie', movieId], () => fetchMovie(movieId));
}