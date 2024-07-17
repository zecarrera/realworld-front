import axios from "axios";

import { getSession } from "@/actions";
import { Separator } from "@/components/ui/separator";
import SingleArticleHeader from "@/components/article/singleArticle/SingleArticleHeader";
import { SingleArticleTagList } from "@/components/article/singleArticle/SingleArticleTagList";
import UserAvatar from "@/components/UserAvatar";
import FollowButton from "@/components/article/singleArticle/FollowButton";
import FavoriteArticleButton from "@/components/article/singleArticle/FavoriteButton";
import { SingleArticleActivity } from "@/components/article/singleArticle/SingleArticleActivity";

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
			<>
				<SingleArticleHeader
					slug={params.slug}
					image={article.author.image}
					createdAt={article.createdAt}
					favorited={article.favorited}
					username={article.author.username}
					following={article.author.following}
					favoritesCount={article.favoritesCount}
				/>
				<p className="py-5 px-4 md:px-10 lg:px-14 text-lg">
					{article.body}
				</p>
				<SingleArticleTagList tagList={article.tagList} />
				<div className="py-2 px-4 md:px-10 lg:px-14">
					<Separator />
				</div>

				<SingleArticleActivity
					slug={params.slug}
					image={article.author.image}
					favorited={article.favorited}
					createdAt={article.createdAt}
					username={article.author.username}
					following={article.author.following}
					favoritesCount={article.favoritesCount}
					className="my-5 mx-3 md:justify-center"
				/>
			</>
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
