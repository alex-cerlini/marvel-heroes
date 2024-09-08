"use client";

import { HeroCard } from "@/components/heroCard";
import { apiResponseMock } from "./tmp-response-mock";
import { HomeFilter } from "@/components/homeFilter";
import { createContext, useState } from "react";

export const HeroesContext = createContext({
  results: apiResponseMock,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateResults: (inputValue: string) => {},
});

export default function Home() {
  const [results, setResults] =
    useState<typeof apiResponseMock>(apiResponseMock);

  const updateResults = (inputValue: string) => {
    if (inputValue === "") {
      setResults(apiResponseMock);
      return;
    }

    const filteredResults = apiResponseMock.data.results.filter((hero) =>
      hero.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    if (filteredResults.length === 0) return;

    setResults({
      ...results,
      data: { ...results.data, results: filteredResults },
    });
  };

  return (
    <HeroesContext.Provider value={{ results, updateResults }}>
      <div className="min-h-[calc(100svh-175px)] gap-0 flex flex-col justify-start">
        <HomeFilter />

        <div className="grid grid-cols-5 items-center min-h-full gap-4">
          {results.data.results.map((hero) => (
            <HeroCard key={hero.id} hero={hero} />
          ))}
        </div>
      </div>
    </HeroesContext.Provider>
  );
}
