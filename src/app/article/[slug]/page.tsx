import axios from "axios";

import { getSession } from "@/actions";
import { Separator } from "@/components/ui/separator";
import { CommentForm } from "@/components/article/comments/CommentForm";
import SingleArticleHeader from "@/components/article/singleArticle/SingleArticleHeader";
import { SingleArticleTagList } from "@/components/article/singleArticle/SingleArticleTagList";
import { SingleArticleActivity } from "@/components/article/singleArticle/SingleArticleActivity";
import { AvatarImg } from "@/components/profiles/avatar/AvatarImage";
import { Comments } from "@/components/article/comments/Comments";

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
					createdAt={article.createdAt}
					favorited={article.favorited}
					username={article.author.username}
					following={article.author.following}
					favoritesCount={article.favoritesCount}
				/>
				<p className="py-5 px-4 md:px-10 lg:px-14 text-lg text-justify">
					{article.body}
				</p>
				<SingleArticleTagList tagList={article.tagList} />
				<div className="py-2 px-4 md:px-10 lg:px-14">
					<Separator />
				</div>

				<SingleArticleActivity
					slug={params.slug}
					favorited={article.favorited}
					createdAt={article.createdAt}
					username={article.author.username}
					following={article.author.following}
					favoritesCount={article.favoritesCount}
					className="my-5 mx-3 md:justify-center"
				/>
				<CommentForm
					avatar={
						<AvatarImg
							username={session.username as string}
							className="h-7 w-7"
						/>
					}
					token={session.token as string}
					slug={params.slug}
				/>
				<Comments slug={params.slug} token={session.token as string} />
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
