"use client";
import { HeroCard } from "@/components/heroCard";
import { useHeroes } from "@/hooks/useHeroes/index";
import { useSearchParams } from "next/navigation";
import { LoadingSpinner } from "../loadingSpinner";
import { useContext } from "react";
import { GlobalContext } from "@/context/global";
import { ChartPie } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/tooltip";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/shadcn/drawer";

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
    <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center min-h-full gap-4">
      <div className="absolute -top-28 right-0">
        <Drawer>
          <DrawerTrigger>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger type="reset">
                  <ChartPie className="w-full h-full" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Open Charts</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DrawerTrigger>
          <DrawerContent className="h-[500px] bg-black">
            <DrawerHeader className="flex items-center flex-col">
              <DrawerTitle>The charts will be here !</DrawerTitle>
              <DrawerDescription>Chart right here</DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      </div>
      {results?.map((hero) => (
        <HeroCard key={hero.id} hero={hero} />
      ))}
    </div>
  );
};
