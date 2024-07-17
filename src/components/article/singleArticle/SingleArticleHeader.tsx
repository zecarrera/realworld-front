import axios from "axios";

import UserAvatar from "@/components//UserAvatar";
import FollowButton from "@/components/article/singleArticle/FollowButton";
import FavoriteArticleButton from "@/components/article/singleArticle/FavoriteButton";

type TSingleArticleHeaderProps = {
	token: string;
	slug: string;
};

const SingleArticleHeader: React.FC<TSingleArticleHeaderProps> = async ({
	token,
	slug,
}) => {
	try {
		const res = await axios.get(
			`http://localhost:4000/api/articles/${slug}`,
			{
				headers: {
					Authorization: `Token ${token}`,
				},
			}
		);
		const data = await res.data;

		const { article } = await data.data;

		return (
			<div className="min-w-full py-2 px-4 md:px-10 lg:px-14 flex flex-col gap-5 bg-black-custom shadow-custom text-white">
				<h1 className="text-5xl mx-auto w-fit h-fit">{slug}</h1>
				<div className="flex flex-col md:flex-row gap-5 md:items-end">
					<UserAvatar
						date={article.createdAt}
						imageUrl={article.author.image}
						username={article.author.username}
					/>
					<div className="flex gap-2 md:mb-1">
						<FollowButton
							username={article.author.username}
							following={article.author.following}
						/>
						<FavoriteArticleButton
							slug={slug}
							favorite={article.favorited}
							username={article.author.username}
							favoritesCount={article.favoritesCount}
						/>
					</div>
				</div>
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

export default SingleArticleHeader;
