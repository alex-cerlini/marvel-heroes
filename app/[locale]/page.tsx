"use client";
import { HomeFilter } from "@/components/homeFilter";
import { LoadingSpinner } from "@/components/loadingSpinner";
import { Suspense, useState } from "react";
import { Heroes } from "@/components/heroes";
import { Pagination } from "@/components/pagination";
import { HeroProps } from "@/components/heroCard";
import { GlobalContext } from "@/context/global";
import { useTranslations } from "next-intl";
import { LanguageSelector } from "@/components/languageSelector";

export default function Home() {
  const [input, setInput] = useState<string>("");

  const updateInput = (value: string) => {
    setInput(value);
  };

  const [hero, setHero] = useState<HeroProps>({} as HeroProps);

  const updateHero = (hero: HeroProps) => {
    setHero(hero);
  };

  const t = useTranslations("HomePage");

  console.log(t("title"));

  return (
    <div className="min-h-[calc(100svh-175px)] gap-4 flex flex-col justify-start max-w-screen-xl w-full">
      <GlobalContext.Provider value={{ input, updateInput, hero, updateHero }}>
        <div className="absolute top-10 left-0 w-full">
          <div className="mx-auto max-w-screen-xl flex justify-end">
            <LanguageSelector />
          </div>
        </div>
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
