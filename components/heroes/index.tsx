"use client";
import { HeroCard } from "@/components/heroCard";
import { useHeroes } from "@/hooks/useHeroes/index";
import { useSearchParams } from "next/navigation";
import { LoadingSpinner } from "../loadingSpinner";
import { useContext } from "react";
import { FiltersContext } from "@/context/filters";

export const Heroes = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { data: response, isFetching, isError } = useHeroes(page);

  const { input: inputFilter } = useContext(FiltersContext);

  const results = inputFilter
    ? response?.data?.results?.filter((hero) => {
        return hero.name.toLowerCase().includes(inputFilter.toLowerCase());
      })
    : response?.data?.results;

  if (isFetching) {
    return (
      <div className="min-h-[calc(100svh-320px)] flex items-center justify-center max-w-screen-xl w-full">
        <LoadingSpinner size={112} />
      </div>
    );
  }

  if (isError || results?.length === 0) {
    return (
      <div className="min-h-[calc(100svh-320px)] flex items-center justify-center max-w-screen-xl w-full">
        No results were found for your search. Please try again in a few
        moments.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center min-h-full gap-4">
      {results?.map((hero) => (
        <HeroCard key={hero.id} hero={hero} />
      ))}
    </div>
  );
};
