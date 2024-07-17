type TSingleArticleTagListProps = {
	tagList: string[];
};

export const SingleArticleTagList: React.FC<TSingleArticleTagListProps> = ({
	tagList,
}) => {
	return (
		<div className=" flex flex-wrap gap-2 items-center min-w-full py-7 px-4 md:px-10 lg:px-14">
			{tagList.map((ele, i) => (
				<span
					key={i}
					className="border border-gray-300 rounded-full text-center text-gray-300 px-3 w-fit h-fit text-sm "
				>
					{ele}
				</span>
			))}
		</div>
	);
};
