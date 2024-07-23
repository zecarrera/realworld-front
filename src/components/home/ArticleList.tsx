import axios from "axios";

import { Article } from "@/components/article/Article";
import { FormattedErrors } from "@/components/error/FormattedErrors";

export const ArticleList: React.FC<{ token: string }> = async ({ token }) => {
	try {
		const res = await axios.get(`http://localhost:4000/api/articles`, {
			headers: {
				Authorization: `Token ${token}`,
			},
		});

		const data = await res.data;
		if (data.status === 200) {
			const { articles } = await data.data;
			return (
				<div className="my-5">
					{articles.map((article: any, i: number) => (
						<Article
							key={i}
							slug={article.slug}
							title={article.title}
							date={article.updatedAt}
							description={article.description}
							username={article.author.username}
							favorited={article.favorited}
							favoritesCount={article.favoritesCount}
							tagList={article.tagList}
						/>
					))}
				</div>
			);
		} else {
			return (
				<h1 className="text-rose-500 w-fit mx-auto">
					<FormattedErrors
						data={data.data}
						className="ml-5 capitalize"
					/>
				</h1>
			);
		}
	} catch (err) {
		//console.log(err);
		return (
			<h1 className="text-rose-500 w-fit mx-auto">
				Internal server Error
			</h1>
		);
	}
};
