import { cn } from "@/lib/utils";
import UserAvatar from "@/components/profiles/avatar/UserAvatar";
import FollowButton from "@/components/article/singleArticle/FollowButton";
import FavoriteArticleButton from "@/components/article/singleArticle/FavoriteButton";

export type TSingleArticleActivity = {
	slug: string;
	username: string;
	className?: string;
	createdAt: string;
	following: boolean;
	favorited: boolean;
	favoritesCount: number;
};

export const SingleArticleActivity: React.FC<TSingleArticleActivity> = ({
	slug,
	username,
	createdAt,
	className,
	following,
	favorited,
	favoritesCount,
}) => {
	return (
		<div
			className={cn(
				`flex flex-col md:flex-row gap-5 md:items-end ${className}`
			)}
		>
			<UserAvatar date={createdAt} username={username} />
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
	);
};
