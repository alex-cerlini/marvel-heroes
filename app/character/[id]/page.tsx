"use client";

import { useHeroById } from "@/hooks/useHeroById";
import { usePathname, useRouter } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/shadcn/breadcrumb";
import { LoadingSpinner } from "@/components/loadingSpinner";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/accordion";

export default function Character() {
  const pathname = usePathname();
  const heroId = Number(pathname.split("/").pop());

  const { data: response, isFetching, isError } = useHeroById(heroId);

  const hero = response?.data?.results?.find((hero) => hero.id === heroId);

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const galleryItems = ["comics", "series", "stories", "events"] as const;

  return (
    <div className="min-h-[calc(100svh-175px)] max-w-screen-xl w-full flex justify-center items-center">
      <h1 className="absolute top-20 left-20 cursor-pointer">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={handleBack}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>{hero?.name}</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </h1>
      {isFetching ? (
        <div className="min-h-[calc(100svh-175px)] max-w-screen-xl w-full flex justify-center items-center">
          <LoadingSpinner size={112} />
        </div>
      ) : isError || response?.code !== 200 ? (
        <div>
          No results were found for your search. Please try again in a few
          moments.
        </div>
      ) : (
        <div className="flex justify-center gap-x-20 w-full">
          <div className="max-h-96 h-full w-full">
            <img
              src={hero?.thumbnail.path + "." + hero?.thumbnail.extension}
              alt="Hero thumbnail"
              className="object-cover h-full"
            />
          </div>
          <div className="w-full space-y-6">
            <h1 className="text-3xl">{hero?.name}</h1>
            <p>{hero?.description || "No description available"}</p>
            <div className="grid grid-cols-4 w-full justify-between gap-x-4">
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
