import axios from "axios";
import { Plus, Heart } from "lucide-react";

import UserAvatar from "@/components//UserAvatar";
import { Button } from "@/components/ui/button";

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
				<div className="flex flex-col md:flex-row gap-2 md:items-center">
					<UserAvatar
						imageUrl={article.author.image}
						username={article.author.username}
						date={article.createdAt}
					/>
					<div className="flex gap-2">
						<Button
							variant="link"
							className="m-0 px-2 py-1 h-fit flex gap-1 bg-slate-300 opacity-75 border border-black-custom underline-offset-0 hover:no-underline  hover:opacity-100"
						>
							<Plus height={15} width={15} />
							<span>Unfollow {article.author.username}</span>
						</Button>
						<Button
							variant="link"
							className="m-0 px-2 py-1 h-fit flex gap-1 bg-transparent  border border-green-custom text-green-custom underline-offset-0 hover:no-underline hover:bg-green-custom hover:text-white"
						>
							<Heart height={15} width={15} />
							<span>
								Favorite Article ({article.favoritesCount})
							</span>
						</Button>
					</div>
				</div>
			</div>
		);
	} catch (err) {
		console.log(err);
		return (
			<h1 className="text-rose-500 w-fit mx-auto">
				Internal server Error
			</h1>
		);
	}
};

export default SingleArticleHeader;
