"use client";

import { useHeroById } from "@/hooks/useHeroById";
import { usePathname } from "next/navigation";

import { LoadingSpinner } from "@/components/loadingSpinner";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/accordion";
import { useTranslations } from "next-intl";
import { Suspense } from "react";
import { LanguageSelector } from "@/components/languageSelector";

export default function Character() {
  const pathname = usePathname();
  const heroId = Number(pathname.split("/").pop());

  const { data: response, isFetching, isError } = useHeroById(heroId);

  const hero = response?.data?.results?.find((hero) => hero.id === heroId);

  const galleryItems = ["comics", "series", "stories", "events"] as const;

  const tNotFound = useTranslations("NotFound");

  return (
    <div className="min-h-[calc(100svh-175px)] max-w-screen-xl w-full flex justify-center items-center px-8 md:px-0">
      <Suspense>
        <div className="absolute top-10 right-8 md:right-0 w-full">
          <div className="mx-auto max-w-screen-xl flex justify-end">
            <LanguageSelector />
          </div>
        </div>
      </Suspense>

      {isFetching ? (
        <div className="min-h-[calc(100svh-175px)] max-w-screen-xl w-full flex justify-center items-center">
          <LoadingSpinner size={112} />
        </div>
      ) : isError || response?.code !== 200 ? (
        <div className="text-center">{tNotFound("title")}</div>
      ) : (
        <div className="flex flex-col gap-y-10 md:flex-row justify-center gap-x-20 w-full">
          <div className="max-h-48 md:max-h-96 h-full w-full flex justify-center">
            <img
              src={hero?.thumbnail.path + "." + hero?.thumbnail.extension}
              alt="Hero thumbnail"
              className="object-cover max-h-48 md:max-h-96"
            />
          </div>
          <div className="w-full space-y-6 flex flex-col items-center md:items-start">
            <h1 className="text-3xl">{hero?.name}</h1>
            <p>{hero?.description || tNotFound("description")}</p>
            <div className="grid grid-cols-1 md:grid-cols-4 w-full justify-between gap-x-4">
              {galleryItems.map((item) => (
                <Accordion type="single" collapsible key={item}>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      {item} {hero && hero[item]?.available}
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col space-y-2">
                      {hero &&
                        hero[item]?.items?.map((value) => (
                          <span key={value.name}>{value?.name}</span>
                        ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
