/* eslint-disable @next/next/no-img-element */

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { Button } from "@/components/shadcn/button";

type HeroCardProps = {
  hero: {
    id: number;
    name: string;
    description: string;
    modified: string;
    thumbnail: {
      path: string;
      extension: string;
    };
    resourceURI: string;
    comics: {
      available: number;
      collectionURI: string;
      items: {
        resourceURI: string;
        name: string;
      }[];
      returned: number;
    };
    series: {
      available: number;
      collectionURI: string;
      items: {
        resourceURI: string;
        name: string;
      }[];
      returned: number;
    };
    stories: {
      available: number;
      collectionURI: string;
      items: {
        resourceURI: string;
        name: string;
        type: string;
      }[];
      returned: number;
    };
    events: {
      available: number;
      collectionURI: string;
      items: {
        resourceURI: string;
        name: string;
      }[];
      returned: number;
    };
    urls: {
      type: string;
      url: string;
    }[];
  };
};

export const HeroCard = ({ hero }: HeroCardProps) => {
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
        <Button variant="default" className="w-full">
          See more
        </Button>
      </CardFooter>
    </Card>
  );
};
