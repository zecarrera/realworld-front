import axios from "axios";

import { Article } from "@/components/article/Article";
import { FormattedErrors } from "@/components/error/FormattedErrors";
import { PaginationComponent } from "@/components/home/PaginationComponent";

type TArticleListProps = {
	token: string;
	page: number;
	tag: string | undefined;
	limit: number | undefined;
	offset: number | undefined;
	author: string | undefined;
	favorited: string | undefined;
};

export const ArticleList: React.FC<TArticleListProps> = async ({
	token,
	tag,
	page,
	limit,
	offset,
	author,
	favorited,
}) => {
	try {
		const res = await axios.get(
			`http://localhost:4000/api/articles?tag=${tag}&limit=${limit}&offset=${offset}&author=${author}&favorited=${favorited} `,
			{
				headers: {
					Authorization: token ? `Token ${token}` : undefined,
				},
			}
		);

		const data = await res.data;
		if (data.status === 200) {
			const { articles, articlesCount } = await data.data;

			return (
				<>
					<div className="my-5">
						{[].map((article: any, i: number) => (
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
					<PaginationComponent
						articlesCount={articlesCount}
						page={page}
					/>
				</>
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
