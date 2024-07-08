import { NextResponse } from "next/server"

import axios from "axios";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        if (!body.username)
            return new NextResponse("Property username is required", {
                status: 400
            });

        const res = await axios
            .get(`${process.env.BASE_URL}/profiles/${body.username}`, {
                headers: {
                    'Authorization': JSON.stringify(`Token ${body.token}`)
                }
            })

        return NextResponse.json({ data: await res.data, status: res.status })
    } catch (error: any) {
        console.error('API_PROFILE_GET', error)
        if (error.response.status === 403)
            return NextResponse.json({ data: error.response.data.errors, status: error.response.status })
        if (error.response.status === 422)
            return NextResponse.json({ data: error.response.data.errors, status: error.response.status })
        return new NextResponse('Error', { status: 500, statusText: 'Internal server error' })
    }
}