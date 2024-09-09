"use client";
import { HomeFilter } from "@/components/homeFilter";
import { LoadingSpinner } from "@/components/loadingSpinner";
import { Providers } from "@/components/providers";
import { Suspense, useState } from "react";
import { Heroes } from "@/components/heroes";
import { Pagination } from "@/components/pagination";
import { FiltersContext } from "@/context/filters";

export default function Home() {
  const [input, setInput] = useState<string>("");

  const updateInput = (value: string) => {
    setInput(value);
  };

  return (
    <Providers>
      <div className="min-h-[calc(100svh-175px)] gap-4 flex flex-col justify-start max-w-screen-xl w-full">
        <FiltersContext.Provider value={{ input, updateInput }}>
          <HomeFilter />
          <Suspense
            fallback={
              <div className="min-h-[calc(100svh-320px)] flex items-center justify-center max-w-screen-xl w-full">
                <LoadingSpinner size={112} />
              </div>
            }
          >
            <Heroes />
          </Suspense>
        </FiltersContext.Provider>

        <Suspense>
          <Pagination />
        </Suspense>
      </div>
    </Providers>
  );
}
