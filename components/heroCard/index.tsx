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
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export type HeroProps = { hero: HeroesResponse["data"]["results"][number] };

export const HeroCard = ({ hero }: HeroProps) => {
  const t = useTranslations("Home");

  return (
    <Card className="h-full w-full" id="hero-card">
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
        <Link href={`/character/${hero.id}`} className="w-full">
          <Button variant="default" className="w-full" type="button">
            {t("seeMore")}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
