import { HeroProps } from "@/components/heroCard";
import { createContext } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GlobalContext = createContext({ input: '', updateInput: (value: string) => { }, hero: {} as HeroProps, updateHero: (hero: HeroProps) => { } });