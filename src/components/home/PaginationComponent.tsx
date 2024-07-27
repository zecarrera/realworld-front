"use client";

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type TPaginationComponents = {
	page: number;
	articlesCount: number;
};
export const PaginationComponent: React.FC<TPaginationComponents> = ({
	page,
}) => {
	const router = useRouter();

	let paginationEnd: number = page > 10 ? page : 10;
	let paginationStart: number = page > 10 ? page - 10 : 1;
	let paginationElements: number[] = [];


	for (let i = paginationStart; i <= paginationEnd; i++) {
		paginationElements.push(i);
	}
	

	const onPaginationClick = (page: number) => {
		router.push(`/?page=${page}`);
	};
	return (
		<Pagination>
			<PaginationContent className="flex-wrap gap-0">
				<PaginationItem>
					<PaginationPrevious
						href="#"
						className="bg-transparent border p-1 hover:bg-gray-300 focus:bg-green-custom focus:text-white rounded-none rounded-l"
					/>
				</PaginationItem>
				<PaginationItem>
					<PaginationEllipsis className="bg-transparent border p-1 h-10 cursor-pointer hover:bg-gray-300 focus:bg-green-custom focus:text-white" />
				</PaginationItem>
				{paginationElements.map((element) => (
					<PaginationItem key={element}>
						<PaginationLink
							href="#"
							onClick={() => onPaginationClick(element)}
							className={cn(
								"bg-transparent border p-1 rounded-none hover:bg-gray-300 ",
								page == element && "bg-green-custom text-white"
							)}
						>
							{element}
						</PaginationLink>
					</PaginationItem>
				))}
				<PaginationItem>
					<PaginationEllipsis className="bg-transparent border h-10 p-1 cursor-pointer  hover:bg-gray-300 focus:bg-green-custom focus:text-white" />
				</PaginationItem>
				<PaginationItem>
					<PaginationNext
						href="#"
						className="bg-transparent border p-1 hover:bg-gray-300 focus:bg-green-custom focus:text-white rounded-none rounded-r"
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};
