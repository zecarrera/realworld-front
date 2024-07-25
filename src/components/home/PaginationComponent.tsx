import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

export const PaginationComponent = () => {
	const paginationElements: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
							className="bg-transparent border p-1 rounded-none hover:bg-gray-300 focus:bg-green-custom focus:text-white"
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
