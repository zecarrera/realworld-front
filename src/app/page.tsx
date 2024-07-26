import { Suspense } from "react";

import { Metadata } from "next";

import { getSession } from "@/actions";
import { Header } from "@/components/home/Header";
import { Loading } from "@/components/loading/Loading";
import { PopularTag } from "@/components/tag/PopularTag";
import { ArticleList } from "@/components/home/ArticleList";
import { ArticleHeader } from "@/components/home/ArticleHeader";

export const metadata: Metadata = {
	title: "Home — Conduit",
	description:
		"Conduit is realworld social blogging site. it uses a custom API for all requests, including authentication. home page of conduit",
};

export default async function Home({
	searchParams,
}: {
	searchParams: { [key: string]: string | number | undefined };
}) {
	const session = await getSession();
	console.log(searchParams);

	const page = searchParams["page"] ? (searchParams["page"] as number) : 0;
	const offset = searchParams["offset"]
		? (searchParams["offset"] as number)
		: 0;
	const tag = searchParams["tag"]
		? (searchParams["tag"] as string)
		: undefined;
	const limit = searchParams["limit"]
		? (searchParams["limit"] as number)
		: undefined;
	const author = searchParams["author"]
		? (searchParams["author"] as string)
		: undefined;
	const favorited = searchParams["favorited"]
		? (searchParams["favorited"] as string)
		: undefined;

	return (
		<main>
			<Header />
			<div className="min-w-full flex flex-col gap-5 md:flex-row  py-2 px-4 md:px-10 lg:px-14 mt-10">
				<div className="flex-1">
					<ArticleHeader
						choices={[
							{
								name: "Your Feed",
								query: `follow=${session.username}`,
							},
							{
								name: "Global Feed",
								query: ``,
							},
						]}
					/>
					<Suspense fallback={<Loading height={5} width={5} />}>
						<ArticleList
							tag={tag}
							page={page}
							limit={limit}
							offset={offset}
							author={author}
							favorited={favorited}
							token={session.token as string}
						/>
					</Suspense>
				</div>
				<Suspense fallback={<Loading height={5} width={5} />}>
					<PopularTag />
				</Suspense>
			</div>
		</main>
	);
}
