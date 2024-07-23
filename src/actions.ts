'use server'

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { permanentRedirect, redirect } from "next/navigation"

import axios, { AxiosResponse } from "axios"
import { getIronSession } from "iron-session"

import { ISessionData, defaultSession, sessionOptions } from "@/lib/config"

export const getSession = async () => {
    const session = await getIronSession<ISessionData>(cookies(), sessionOptions)
    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
    }
    return session;
}

export const logout = async () => {
    const session = await getSession();
    session.destroy();
    redirect('/')
}

//Profile

export const follow = async (username: string) => {
    const session = await getSession();
    try {
        const res = await axios.post(`${process.env.BASE_URL}/profiles/${username}/follow`, {

        }, {
            headers: {
                'Authorization': `Token ${session.token}`
            }
        })
        if (res.status === 200) {
            revalidatePath(`/profile/${username}`)
        }

    } catch (error: any) {
        console.log('FOLLOW_USER_ACTION', error)
    }
}

export const unFollow = async (username: string) => {
    const session = await getSession();

    try {
        const res = await axios.delete(`${process.env.BASE_URL}/profiles/${username}/follow`, {
            headers: {
                'Authorization': `Token ${session.token}`
            }
        })
        if (res.status === 200) {
            revalidatePath(`/profile/${username}`)
        }

    } catch (error: any) {
        console.log('UNFOLLOW_USER_ACTION', error)
    }
}

// Favorites

export const favoriteArticle = async (slug: string, username: string, refreshUrl: string) => {
    const session = await getSession();
    try {
        const res = await axios.post(`${process.env.BASE_URL}/articles/${slug}/favorite`, {

        }, {
            headers: {
                'Authorization': `Token ${session.token}`
            }
        })
        if (res.status === 200) {
            revalidatePath(refreshUrl)
        }

    } catch (error: any) {
        console.log('FAVORITE_ARTICLE_ACTION', error)
    }
}

export const unFavoriteArticle = async (slug: string, username: string, refreshUrl: string) => {
    const session = await getSession();

    try {
        const res = await axios.delete(`${process.env.BASE_URL}/articles/${slug}/favorite`, {
            headers: {
                'Authorization': `Token ${session.token}`
            }
        })
        if (res.status === 200) {
            revalidatePath(refreshUrl)
        }

    } catch (error: any) {
        console.log('UNFAVORITE_ARTICLE_ACTION', error)
    }
}

// Delete Article
export const deleteArticle = async (slug: string) => {
    const session = await getSession();
    let res: any = {}

    try {
        res = await axios.delete(`${process.env.BASE_URL}/articles/${slug}`, {
            headers: {
                'Authorization': `Token ${session.token}`
            }
        })

    } catch (error: any) {
        console.log('DELETE_ARTICLE_ACTION', error)
    }

    if (res.status === 204)
        redirect('/')
}


// Comments
export const deleteComment = async (slug: string, id: number) => {
    const session = await getSession();

    try {
        const res = await axios.delete(`${process.env.BASE_URL}/articles/${slug}/comments/${id}`, {
            headers: {
                'Authorization': `Token ${session.token}`
            }
        })
        if (res.status === 200) {
            revalidatePath(`/articles/${slug}`)
        }

    } catch (error: any) {
        console.log('DELETE_COMMENT_ACTION', error)
    }
}


