"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/shadcn/breadcrumb";
import { useHeroById } from "@/hooks/useHeroById";
import { usePathname, useRouter } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const pathname = usePathname();

  const heroId = Number(pathname.split("/").pop());

  const { data: response } = useHeroById(heroId);

  const hero = response?.data?.results?.find((hero) => hero.id === heroId);

  return (
    <div className="flex flex-col">
      <h1 className="p-8 pt-0 md:p-0 md:absolute top-20 left-20 cursor-pointer">
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
      {children}
    </div>
  );
}
