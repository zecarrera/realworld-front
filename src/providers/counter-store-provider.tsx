"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
	type TArticleQueryStore,
	createArticleQueryStore,
} from "@/stores/article-query-store";

export type ArticleQueryStoreApi = ReturnType<typeof createArticleQueryStore>;

export const ArticleQueryStoreContext = createContext<
	ArticleQueryStoreApi | undefined
>(undefined);

export interface ArticleQueryStoreProviderProps {
	children: ReactNode;
}

export const ArticleQueryStoreProvider = ({
	children,
}: ArticleQueryStoreProviderProps) => {
	const storeRef = useRef<ArticleQueryStoreApi>();
	if (!storeRef.current) {
		storeRef.current = createArticleQueryStore();
	}

	return (
		<ArticleQueryStoreContext.Provider value={storeRef.current}>
			{children}
		</ArticleQueryStoreContext.Provider>
	);
};

export const useArticleQueryStore = <T,>(
	selector: (store: TArticleQueryStore) => T
): T => {
	const articleQueryStoreContext = useContext(ArticleQueryStoreContext);

	if (!articleQueryStoreContext) {
		throw new Error(
			`useArticleQueryStore must be used within ArticleQueryStoreProvider`
		);
	}

	return useStore(articleQueryStoreContext, selector);
};
