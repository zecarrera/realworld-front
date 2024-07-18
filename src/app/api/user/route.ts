import { NextResponse } from "next/server"

import axios from "axios";
import { getSession } from "@/actions";

export async function GET(req: Request) {
    try {
        const token: string = req.headers.get('authorization') as string;


        const res = await axios
            .get(`${process.env.BASE_URL}/user`, {
                headers: {
                    'Authorization': token
                }
            })

        return NextResponse.json({ data: await res.data, status: res.status })
    } catch (error: any) {
        //console.error('API_USER_POST', error)
        if (
            error.response.status === 401 ||
            error.response.status === 422
        ) {
            return NextResponse.json({ data: error.response.data.errors, status: error.response.status })
        }
        return new NextResponse('Error', { status: 500, statusText: 'Internal server error' })
    }
}


export async function PUT(req: Request) {
    try {
        const token: string = req.headers.get('authorization') as string;
        const body = await req.json();

        const res = await axios
            .put(`${process.env.BASE_URL}/user`, {
                user: {
                    email: body.email,
                    password: body.password,
                    username: body.username,
                    bio: body.bio,
                    image: body.imageUrl,
                }
            }, {

                headers: {
                    'Authorization': token
                }
            })

        const data = await res.data
        const session = await getSession();

        session.isLoggedIn = true;
        session.email = data.user.email;
        session.username = data.user.username;
        session.token = data.user.token;
        await session.save();

        return NextResponse.json({ data: await res.data, status: res.status })
    } catch (error: any) {
        console.error('API_USER_PUT', error)
        if (error.response.status === 401)
            return NextResponse.json({ data: error.response.data.errors, status: error.response.status })
        if (error.response.status === 403)
            return NextResponse.json({ data: error.response.data.errors, status: error.response.status })
        if (error.response.status === 422)
            return NextResponse.json({ data: error.response.data.errors, status: error.response.status })
        return new NextResponse('Error', { status: 500, statusText: 'Internal server error' })
    }
}