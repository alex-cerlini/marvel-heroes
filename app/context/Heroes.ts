import { createContext } from "react";
import { apiResponseMock } from "../tmp-response-mock";

export const HeroesContext = createContext({
    results: apiResponseMock,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateResults: (inputValue: string) => { },
});