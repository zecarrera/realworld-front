import { cn } from "@/lib/utils";
import { Tag } from "@/components/tag/Tag";

type TTagListProps = {
	tagList: string[];
	className?: string;
	isClickable?: boolean;
	innerClassName?: string;
};

export const TagList: React.FC<TTagListProps> = ({
	tagList,
	className,
	isClickable,
	innerClassName,
}) => {
	return (
		<div
			className={cn(
				"flex flex-wrap gap-2 items-center min-w-full py-7 px-4 md:px-10 lg:px-14",
				className
			)}
		>
			{tagList.map((ele, i) => (
				<Tag
					key={i}
					ele={ele}
					className={innerClassName}
					isClickable={isClickable}
				/>
			))}
		</div>
	);
};
