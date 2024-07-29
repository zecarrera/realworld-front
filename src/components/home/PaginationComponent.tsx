"use client";

import {
	ReadonlyURLSearchParams,
	useRouter,
	useSearchParams,
} from "next/navigation";

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
import { useEffect } from "react";
import { setQuery } from "../tag/Tag";

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
	const param = useSearchParams();

	let paginationLimit: number = Math.ceil(articlesCount / 10);

	useEffect(() => {
		if (page > paginationLimit) {
			page = paginationLimit;
			const result = setQuery(new URLSearchParams(param.toString()), [
				{ key: "page", value: page },
				{ key: "offset", value: (page - 1) * 10 },
			]);

			router.push(`/?${result}`);
		} else if (offset / 10 + 1 !== page) {
			const result = setQuery(new URLSearchParams(param.toString()), [
				{ key: "page", value: page },
				{ key: "offset", value: (page - 1) * 10 },
			]);
			router.push(`/?${result}`);
		}
	}, []);

	let paginationElements: number[] = [];
	let paginationEnd: number =
		page > 10 ? page : paginationLimit < 10 ? paginationLimit : 10;
	let paginationStart: number = page > 10 ? page - 9 : 1;

	for (let i = paginationStart; i <= paginationEnd; i++) {
		paginationElements.push(i);
	}

	const onPaginationClick = (page: number) => {
		const result = setQuery(new URLSearchParams(param.toString()), [
			{ key: "page", value: page },
			{ key: "offset", value: (page - 1) * 10 },
		]);
		router.push(`/?${result}`);
	};
	const onNextClick = () => {
		let nextPage = +page + 1;
		const result = setQuery(new URLSearchParams(param.toString()), [
			{ key: "page", value: nextPage },
		]);

		if (nextPage <= paginationLimit) router.push(`/?${result}`);
	};
	const onPrevClick = () => {
		let prevPage = +page - 1;
		const result = setQuery(new URLSearchParams(param.toString()), [
			{ key: "page", value: prevPage },
		]);
		if (prevPage >= 1) router.push(`/?${result}`);
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
