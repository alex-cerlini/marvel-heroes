import { HeroChartsProps } from "@/components/HeroCharts";
import { generateRandomHslColor } from "@/lib/utils";
import { HeroesResponse } from "../useHeroes/types";
import { useId } from "react"

export const useHeroCharts = ({ results }: HeroChartsProps) => {
    const heroes = results?.map((hero) => {
        const participations = []

        for (const key in hero) {
            const heroKey = key as keyof typeof hero;
            const available = (typeof hero[heroKey] === 'object' && 'available' in hero[heroKey]);

            if (available) {
                const actualValue = hero[heroKey] as Pick<HeroesResponse["data"]["results"][number], 'comics'>['comics'];

                participations.push({
                    "id": hero.id + heroKey,
                    "name": hero.name + ' - ' + heroKey,
                    "color": generateRandomHslColor(),
                    "children": actualValue.items?.map((item) => {
                        return {
                            "id": hero.id + heroKey + item.resourceURI,
                            "name": item.name,
                            "color": generateRandomHslColor(),
                            "loc": 1
                        }
                    })
                })
            }
        }

        return {
            "id": hero.id,
            "name": hero.name,
            "color": generateRandomHslColor(),
            "children": participations
        }
    })

    const data = {
        "id": useId(),
        "name": "Heroes",
        "color": generateRandomHslColor(),
        "children": heroes
    }

    return data
}