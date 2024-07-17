import axios from "axios";

import { getSession } from "@/actions";
import SingleArticleHeader from "@/components/article/singleArticle/SingleArticleHeader";
import { SingleArticleTagList } from "@/components/article/singleArticle/SingleArticleTagList";

type TSingleArticleProps = {
	params: {
		slug: string;
	};
};
const SingleArticle: React.FC<TSingleArticleProps> = async ({ params }) => {
	const session = await getSession();
	try {
		const res = await axios.get(
			`http://localhost:4000/api/articles/${params.slug}`,
			{
				headers: {
					Authorization: `Token ${session.token}`,
				},
			}
		);
		const data = await res.data;

		const { article } = await data.data;

		return (
			<div>
				<SingleArticleHeader
					slug={params.slug}
					createdAt={article.createdAt}
					favorited={article.favorited}
					favoritesCount={article.favoritesCount}
					following={article.author.followed}
					image={article.author.image}
					username={article.author.username}
				/>
				<SingleArticleTagList tagList={article.tagList} />
			</div>
		);
	} catch (err) {
		//console.log(err);
		return (
			<h1 className="text-rose-500 w-fit mx-auto">
				Internal server Error
			</h1>
		);
	}
};

export default SingleArticle;
