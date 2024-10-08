"use client";
import { HomeFilter } from "@/components/homeFilter";
import { LoadingSpinner } from "@/components/loadingSpinner";
import { Suspense, useState } from "react";
import { Heroes } from "@/components/heroes";
import { Pagination } from "@/components/pagination";
import { GlobalContext } from "@/context/global";
import { LanguageSelector } from "@/components/languageSelector";

export default function Home() {
  const [input, setInput] = useState<string>("");

  const updateInput = (value: string) => {
    setInput(value);
  };

  return (
    <div className="min-h-[calc(100svh-175px)] gap-4 flex flex-col justify-start max-w-screen-xl w-full px-8 md:px-0">
      <GlobalContext.Provider value={{ input, updateInput }}>
        <Suspense>
          <div className="absolute top-10 right-8 md:right-0 w-full">
            <div className="mx-auto md:max-w-screen-xl flex justify-end">
              <LanguageSelector />
            </div>
          </div>
        </Suspense>
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
      </GlobalContext.Provider>

      <Suspense>
        <Pagination />
      </Suspense>
    </div>
  );
}
