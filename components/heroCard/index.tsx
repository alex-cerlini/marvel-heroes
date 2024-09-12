/* eslint-disable @next/next/no-img-element */

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { Button } from "@/components/shadcn/button";
import { HeroesResponse } from "@/hooks/useHeroes/types";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export type HeroProps = { hero: HeroesResponse["data"]["results"][number] };

export const HeroCard = ({ hero }: HeroProps) => {
  const router = useRouter();
  const t = useTranslations("Home");

  return (
    <Card className="h-full w-full">
      <CardHeader className="p-2 flex flex-col items-center">
        <CardDescription className="max-h-44 max-w-52">
          <img
            src={hero.thumbnail.path + "." + hero.thumbnail.extension}
            alt={`Name: ${hero.name}`}
            className="object-cover h-44 w-52 rounded-t-lg"
          />
        </CardDescription>
        <CardTitle className="text-base">{hero.name}</CardTitle>
      </CardHeader>
      <CardFooter className="w-full p-2">
        <Button
          variant="default"
          className="w-full"
          onClick={() => router.push(`/character/${hero.id}`)}
        >
          {t("seeMore")}
        </Button>
      </CardFooter>
    </Card>
  );
};
