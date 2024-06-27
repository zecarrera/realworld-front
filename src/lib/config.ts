import { SessionOptions } from "iron-session";

import { TProfile } from "@/components/auth/interfaces/profile";

export interface ISessionData extends Partial<TProfile> {
    isLoggedIn: boolean;
}

export const defaultSession: ISessionData = {
    isLoggedIn: false
}

export const sessionOptions: SessionOptions = {
    password: process.env.COOKIE_PASSWORD!,
    cookieName: process.env.COOKIE_NAME!,
    cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24,
    },

}