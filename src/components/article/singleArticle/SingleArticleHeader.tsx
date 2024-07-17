import axios from "axios";

import UserAvatar from "@/components//UserAvatar";
import FollowButton from "@/components/article/singleArticle/FollowButton";
import FavoriteArticleButton from "@/components/article/singleArticle/FavoriteButton";

type TSingleArticleHeaderProps = {
	slug: string;
	image: string;
	username: string;
	createdAt: string;
	following: boolean;
	favorited: boolean;
	favoritesCount: number;
};

const SingleArticleHeader: React.FC<TSingleArticleHeaderProps> = async ({
	slug,
	image,
	username,
	createdAt,
	following,
	favorited,
	favoritesCount,
}) => {
	return (
		<div className="min-w-full py-2 px-4 md:px-10 lg:px-14 flex flex-col gap-5 bg-black-custom shadow-custom text-white">
			<h1 className="text-5xl mx-auto w-fit h-fit">{slug}</h1>
			<div className="flex flex-col md:flex-row gap-5 md:items-end">
				<UserAvatar
					date={createdAt}
					imageUrl={image}
					username={username}
				/>
				<div className="flex gap-2 md:mb-1">
					<FollowButton username={username} following={following} />
					<FavoriteArticleButton
						slug={slug}
						favorite={favorited}
						username={username}
						favoritesCount={favoritesCount}
					/>
				</div>
			</div>
		</div>
	);
};

export default SingleArticleHeader;
