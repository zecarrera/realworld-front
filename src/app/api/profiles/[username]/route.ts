import axios from "axios";
import { NextResponse } from "next/server"

export async function POST(req: Request, ctx: { params: { username: string } }) {
    try {
        const body = await req.json();


        const res = await axios
            .get(`${process.env.BASE_URL}/profiles/${ctx.params.username}`, {
                headers: {
                    'Authorization': `Token ${body.token}`
                }
            })



        return NextResponse.json({ data: await res.data, status: res.status })
    } catch (error: any) {
        console.error('API_PROFILE_GET', error)
        if (error.response.status === 401)
            return NextResponse.json({ data: error.response.data.errors, status: error.response.status })
        if (error.response.status === 403)
            return NextResponse.json({ data: error.response.data.errors, status: error.response.status })
        if (error.response.status === 422)
            return NextResponse.json({ data: error.response.data.errors, status: error.response.status })
        return new NextResponse('Internal server error', { status: 500, statusText: 'Internal server error' })
    }
}