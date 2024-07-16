import { NextResponse } from "next/server"

import axios from "axios";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        if (!body.token) {
            return new NextResponse("Property token is required", {
                status: 400
            });
        }

        const res = await axios
            .get(`${process.env.BASE_URL}/user`, {
                headers: {
                    'Authorization': `Token ${body.token}`
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

        const body = await req.json();

        if (!body.token) {
            return new NextResponse("Property token is required", {
                status: 400
            });
        }

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
                    'Authorization': `Token ${body.token}`
                }
            })

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