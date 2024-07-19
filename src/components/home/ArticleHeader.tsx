"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type TArticleHeader = {
	choices: {
		name: string;
		query: string;
	}[];
};

export const ArticleHeader: React.FC<TArticleHeader> = ({ choices }) => {
	const searchParams = useSearchParams();
	const search = searchParams.entries().next();
	let query: string = search.value ? search.value.join("=") : "";

	return (
		<div>
			<div className="flex gap-3 ">
				{choices.map((choice, i) => (
					<Link
						className={cn(
							"opacity-85 pb-2 hover:opacity-100 border-b border-b-white",

							query === choice.query &&
								" border-b-green-custom text-green-custom"
						)}
						key={i}
						href={`/?${choice.query}`}
						id=""
					>
						{choice.name}
					</Link>
				))}
			</div>
			<Separator />
		</div>
	);
};
