import { getSession } from "@/actions";
import SingleArticleHeader from "@/components/article/SingleArticleHeader";

type TSingleArticleProps = {
	params: {
		slug: string;
	};
};
const SingleArticle: React.FC<TSingleArticleProps> = async ({ params }) => {
	const session = await getSession();
	return (
		<div>
			<SingleArticleHeader
				token={session.token as string}
				slug={params.slug}
			/>
		</div>
	);
};

export default SingleArticle;
