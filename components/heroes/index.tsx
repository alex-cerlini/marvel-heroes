"use client";
import { HeroCard } from "@/components/heroCard";
import { useHeroes } from "@/hooks/useHeroes/index";
import { useSearchParams } from "next/navigation";

export const Heroes = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { data: response } = useHeroes(page);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center min-h-full gap-4">
      {response?.data?.results?.map((hero) => (
        <HeroCard key={hero.id} hero={hero} />
      ))}
    </div>
  );
};
