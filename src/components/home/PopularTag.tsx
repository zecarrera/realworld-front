import { TagList } from "@/components/tag/TagList";

export const PopularTag = () => {
	return (
		<div className="bg-slate-100  shadow-custom rounded p-3 md:w-52">
			<h1>Popular Tags</h1>
			<TagList
				tagList={["a", "b", "c", "a", "b", "c", "a", "b", "c"]}
				className="p-0 md:px-0 lg:px-0 mt-2"
				innerClassName="cursor-pointer bg-gray-500 opacity-90 hover:opacity-100 text-white border-none"
			/>
		</div>
	);
};
