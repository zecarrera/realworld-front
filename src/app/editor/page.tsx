import { getSession } from "@/actions";
import { NewArticle } from "@/components/editor/NewArticle";

const EditorPage = async () => {
	const session = await getSession();
	return (
		<div className="flex flex-col gap-3 mx-5 md:mx-auto md:w-4/5 lg:w-3/5">
			<NewArticle token={session.token as string} />
		</div>
	);
};

export default EditorPage;
