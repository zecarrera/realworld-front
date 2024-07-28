"use client";

import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

type TTagProps = {
	ele: string;
	className?: string;
	isClickable?: boolean;
};

export const Tag: React.FC<TTagProps> = ({ ele, className, isClickable }) => {
	const route = useRouter();

	let action = isClickable ? () => route.push(`/?tag=${ele}`) : undefined;

	return (
		<span
			onClick={action}
			className={cn(
				"border border-gray-300 rounded-full text-center text-gray-300 px-3 w-fit h-fit text-sm ",
				className
			)}
		>
			{ele}
		</span>
	);
};
