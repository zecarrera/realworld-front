'use server'

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

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