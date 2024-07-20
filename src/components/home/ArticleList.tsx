import axios from "axios";

import { FormattedErrors } from "@/components/error/FormattedErrors";

export const ArticleList = async () => {
	try {
		const res = await axios.get(`http://localhost:4000/api/articles`);

		const data = await res.data;
		if (data.status === 200) {
			const { articles } = await data.data;
			console.log(articles)
			return (
				<>
					{articles.map((article: any) => (
						<h1>{article.slug}</h1>
					))}
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
