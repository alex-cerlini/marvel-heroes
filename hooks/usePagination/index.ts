import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useHeroes } from "@/hooks/useHeroes";

export const usePagination = () => {
    const router = useRouter();
    const pathname = usePathname();

    const searchParams = useSearchParams();

    const page = Number(searchParams.get("page")) || 1;

    const { data: queryData } = useHeroes(page);

    const activePage = Number(searchParams.get("page")) || 1;

    const totalPages =
        (queryData && Math.ceil(queryData?.data?.total / queryData?.data?.limit)) ??
        1;

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    const handleIncreasePage = () => {
        router.push(
            pathname + "?" + createQueryString("page", String(Number(activePage) + 1))
        );
    };

    const handleDecreasePage = () => {
        if (activePage === 1) return;

        router.push(
            pathname + "?" + createQueryString("page", String(Number(activePage) - 1))
        );
    };

    const handlePage = (page: number) => {
        router.push(pathname + "?" + createQueryString("page", String(page)));
    };

    const pagesArray = Array.from({ length: totalPages }, (_, index) => index);

    const [slicedPagesArray, setSlicedPagesArray] = useState<Array<number>>([]);

    useEffect(() => {
        const initialArrayPosition = activePage < 3 ? 0 : activePage - 2;
        const endArrayPosition = activePage + 1;

        setSlicedPagesArray(
            pagesArray.slice(initialArrayPosition, endArrayPosition)
        );
    }, [activePage, totalPages]);

    return { slicedPagesArray, handleIncreasePage, handleDecreasePage, handlePage, activePage }
}