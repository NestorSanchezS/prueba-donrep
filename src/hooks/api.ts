import { useQuery } from 'react-query';
import {Person} from '../models/index';
import { Film } from '../models/index';


const apiUrl = import.meta.env.VITE_API_URL;

export function usePeople(page:number){

    async function fetchPeople(page: number): Promise<Person[]> {
        const response = await fetch(`${apiUrl}/?page=${page}`);
        const data = await response.json();
        return data.results;
      }
    const { data: people, isLoading } = useQuery(['people', page], () => fetchPeople(page));

    return {
        people, isLoading
    }
}

export async function fetchFilm(url: string): Promise<Film> {
  const response = await fetch(url);
  const data = await response.json();
  return data;

}





