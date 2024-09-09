import { HomeFilter } from "@/components/homeFilter";
import { LoadingSpinner } from "@/components/loadingSpinner";
import { Providers } from "@/components/providers";
import { Suspense } from "react";
import { Heroes } from "@/components/heroes";
import { Pagination } from "@/components/pagination";

export default async function Home() {
  return (
    <Providers>
      <div className="min-h-[calc(100svh-175px)] gap-4 flex flex-col justify-start max-w-screen-xl w-full">
        <HomeFilter />
        <Suspense
          fallback={
            <div className="min-h-[calc(100svh-320px)] flex items-center justify-center max-w-screen-xl w-full">
              <LoadingSpinner size={112} />
            </div>
          }
        >
          <Heroes />
        </Suspense>

        <Suspense>
          <Pagination />
        </Suspense>
      </div>
    </Providers>
  );
}
