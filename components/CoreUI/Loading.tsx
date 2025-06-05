import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Loading() {
    const isFetching = useIsFetching();
    const isMutating = useIsMutating();

    const [isLoading, setIsLoading] = useState(true);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        setIsLoading(true);
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 500); // Add a small delay to prevent flickering

        return () => clearTimeout(timeout);
    }, [pathname, searchParams]);

    if (isFetching || isMutating || isLoading) {
        return (
            <div className="fixed inset-0 z-[9999999999] flex items-center justify-center bg-black/50">
                <div className="w-10 h-10 border-8 border-[#f6c61a] border-solid rounded-full border-t-transparent animate-spin"></div>
            </div>
        );
    }
    return null;
}
