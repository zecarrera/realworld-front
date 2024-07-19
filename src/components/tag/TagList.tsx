import { cn } from "@/lib/utils";

type TTagListProps = {
	tagList: string[];
	className?: string;
	onClick?: () => void;
	innerClassName?: string;
};

export const TagList: React.FC<TTagListProps> = ({
	tagList,
	className,
	innerClassName,
	onClick,
}) => {
	return (
		<div
			className={cn(
				"flex flex-wrap gap-2 items-center min-w-full py-7 px-4 md:px-10 lg:px-14",
				className
			)}
		>
			{tagList.map((ele, i) => (
				<span
					key={i}
					onClick={onClick}
					className={cn(
						"border border-gray-300 rounded-full text-center text-gray-300 px-3 w-fit h-fit text-sm ",
						innerClassName
					)}
				>
					{ele}
				</span>
			))}
		</div>
	);
};
