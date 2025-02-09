import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "https://november7-730026606190.europe-west1.run.app/movies";

export interface Movie {
  id: string;
  description: string;
  image_url: string;
  title: string;
  rating: number;
}

export interface MovieResponse {
  items: Movie[];
  total: number;
}

interface FetchMoviesProps {
  skip: number;
  limit: number;
  query?: string;
}

const fetchMovies = async ({ skip, limit, query }: FetchMoviesProps) => {
  const params = new URLSearchParams();
  params.append("skip", skip.toString());
  params.append("limit", limit.toString());
  if (query) params.append("query", query);

  const { data } = await axios.get<MovieResponse>(API_URL, { params });
  return data;
};

export const useMovies = (skip: number, limit: number, query?: string) =>
  useQuery({
    queryKey: ["movies", skip, limit, query],
    queryFn: () => fetchMovies({ skip, limit, query }),
    staleTime: 5000,
  });
