"use client";

import { Heart } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { favoriteArticle, unFavoriteArticle } from "@/actions";

type TFavoriteArticleButtonProps = {
	slug: string;
	username: string;
	favorite: boolean;
	favoritesCount: number;
};
const FavoriteArticleButton: React.FC<TFavoriteArticleButtonProps> = ({
	slug,
	username,
	favorite,
	favoritesCount,
}) => {
	return (
		<Button
			variant="link"
			onClick={
				favorite
					? async () => await unFavoriteArticle(slug, username)
					: async () => await favoriteArticle(slug, username)
			}
			className={cn(
				"m-0 px-2 py-1 h-fit flex gap-1 bg-transparent  border border-green-custom text-green-custom underline-offset-0 hover:no-underline hover:bg-green-custom hover:text-white",
				favorite &&
					"bg-green-custom text-white hover:bg-transparent hover:text-green-custom"
			)}
		>
			<Heart height={15} width={15} />
			<span>
				{favorite ? "UnFavorite " : "Favorite "}
				Article ({favoritesCount})
			</span>
		</Button>
	);
};

export default FavoriteArticleButton;
