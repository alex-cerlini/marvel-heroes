import { HomeFilter } from "@/components/homeFilter";
import { Providers } from "@/components/providers";
import { Heroes } from "@/components/heroes";

export default async function Home() {
  return (
    <Providers>
      <div className="min-h-[calc(100svh-175px)] gap-4 flex flex-col justify-start">
        <HomeFilter />
        <Heroes />
      </div>
    </Providers>
  );
}
