"use client";
import { HeroCard } from "@/components/heroCard";
import { useHeroes } from "@/hooks/useHeroes/index";
import { useSearchParams } from "next/navigation";
import { LoadingSpinner } from "../loadingSpinner";
import { useContext } from "react";
import { GlobalContext } from "@/context/global";
import { ChartPie } from "lucide-react";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/shadcn/drawer";
import { HeroCharts } from "../HeroCharts";
import { useTranslations } from "next-intl";

export const Heroes = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { data: response, isFetching, isError } = useHeroes(page);

  const { input: inputFilter } = useContext(GlobalContext);

  const results = inputFilter
    ? response?.data?.results?.filter((hero) => {
        return hero.name.toLowerCase().includes(inputFilter.toLowerCase());
      })
    : response?.data?.results;

  const t = useTranslations("NotFound");
  const tHome = useTranslations("Home");

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
        {t("title")}
      </div>
    );
  }

  return (
    <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center min-h-full gap-4">
      <div className="absolute -top-28 right-0">
        <Drawer>
          <DrawerTrigger>
            <ChartPie className="w-full h-full" id="open-chart-drawer" />
          </DrawerTrigger>
          <DrawerContent
            className="h-[500px] bg-black"
            aria-describedby={undefined}
          >
            <DrawerHeader className="flex items-center flex-col">
              <DrawerTitle>
                {tHome("chartsTitle")} {page}
              </DrawerTitle>
            </DrawerHeader>
            <HeroCharts results={results} />
          </DrawerContent>
        </Drawer>
      </div>
      {results?.map((hero) => (
        <HeroCard key={hero.id} hero={hero} />
      ))}
    </div>
  );
};
