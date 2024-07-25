// src/stores/ArticleQuery-store.ts
import { createStore } from 'zustand/vanilla'

export type TArticleQueryState = {
    tag?: string;
    limit: number;
    offset: number;
    author?: string;
    favorited?: string;

}

export type TArticleQueryActions = {
    setTag: (tag: string) => void
    setLimit: (limit: number) => void
    setOffset: (offset: number) => void
    setAuthor: (author: string) => void
    setFavorited: (favorited: string) => void
}

export type TArticleQueryStore = TArticleQueryState & TArticleQueryActions


export const defaultInitState: TArticleQueryState = {
    limit: 10, offset: 0
}

export const createArticleQueryStore = (
    initState: TArticleQueryState = defaultInitState,
) => {
    return createStore<TArticleQueryStore>()((set) => ({
        ...initState,
        setTag: (tag) => set(_state => ({ tag })),
        setLimit: (limit) => set(_state => ({ limit })),
        setOffset: (offset) => set(_state => ({ offset })),
        setAuthor: (author) => set(_state => ({ author })),
        setFavorited: (favorited) => set(_state => ({ favorited })),
    }))
}