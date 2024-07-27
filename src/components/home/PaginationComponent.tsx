"use client";

import { useRouter } from "next/navigation";

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

type TPaginationComponents = {
	page: number;
	offset: number;
	articlesCount: number;
};
export const PaginationComponent: React.FC<TPaginationComponents> = ({
	page,
	offset,
	articlesCount,
}) => {
	const router = useRouter();

	let paginationLimit: number = Math.ceil(articlesCount / 10);

	if (page > paginationLimit) {
		page = paginationLimit;
		router.push(`/?page=${page}&offset=${(page - 1) * 10}`);
	} else if (offset / 10 + 1 !== page) {
		router.push(`/?page=${page}&offset=${(page - 1) * 10}`);
	}

	let paginationElements: number[] = [];
	let paginationEnd: number = page > 10 ? page : 10;
	let paginationStart: number = page > 10 ? page - 9 : 1;

	for (let i = paginationStart; i <= paginationEnd; i++) {
		paginationElements.push(i);
	}

	const onPaginationClick = (page: number) => {
		router.push(`/?page=${page}&offset=${(page - 1) * 10}`);
	};
	const onNextClick = () => {
		let nextPage = +page + 1;
		if (nextPage <= paginationLimit) router.push(`/?page=${nextPage}`);
	};
	const onPrevClick = () => {
		let prevPage = +page - 1;
		if (prevPage >= 1) router.push(`/?page=${prevPage}`);
	};

	return (
		<Pagination>
			<PaginationContent className="flex-wrap gap-0">
				<PaginationItem>
					<PaginationPrevious
						onClick={onPrevClick}
						className="cursor-pointer bg-transparent border p-1 hover:bg-gray-300 focus:bg-green-custom focus:text-white rounded-none rounded-l"
					/>
				</PaginationItem>
				<PaginationItem>
					<PaginationEllipsis
						className={cn(
							"bg-transparent  p-1 h-10  border",

							paginationStart === 1 && "hidden"
						)}
					/>
				</PaginationItem>
				{paginationElements.map((element) => (
					<PaginationItem key={element}>
						<PaginationLink
							onClick={() => onPaginationClick(element)}
							className={cn(
								"bg-transparent border p-1 rounded-none cursor-pointer hover:bg-gray-300 ",
								page == element && "bg-green-custom text-white"
							)}
						>
							{element}
						</PaginationLink>
					</PaginationItem>
				))}
				<PaginationItem>
					<PaginationEllipsis
						className={cn(
							"bg-transparent  p-1 h-10  border",

							paginationEnd == paginationLimit && "hidden"
						)}
					/>
				</PaginationItem>
				<PaginationItem>
					<PaginationNext
						onClick={onNextClick}
						className="cursor-pointer bg-transparent border p-1 hover:bg-gray-300 focus:bg-green-custom focus:text-white rounded-none rounded-r"
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};
