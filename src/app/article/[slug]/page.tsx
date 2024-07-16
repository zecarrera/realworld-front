import SingleArticleHeader from "@/components/article/SingleArticleHeader";


type TSingleArticleProps = {
	params: {
		slug: string;
	}
}
const SingleArticle: React.FC<TSingleArticleProps> = async ({params}) => {
	console.log(params)
	return (
		<div>
			<SingleArticleHeader />
		</div>
	);
};

export default SingleArticle;
