import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export default function AppPagination({ data }: any) {
    const clearLinks = [...data?.links];
    clearLinks.shift();
    clearLinks.pop();
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    {data?.prev_page_url !== null ? (
                        <PaginationPrevious href={data?.prev_page_url} />
                    ) : (
                        <PaginationPrevious />
                    )}
                </PaginationItem>
                <PaginationItem>
                    {clearLinks.map((link: any, idx: number) => (
                        <PaginationLink key={idx} href={link.url} isActive={link.active ? true : false} >{link.label}</PaginationLink>
                    ))}
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    {data?.next_page_url !== null ? (
                        <PaginationNext href={data?.next_page_url} />
                    ) : (
                        <PaginationNext />
                    )}
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
