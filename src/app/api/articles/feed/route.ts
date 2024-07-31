import { NextRequest, NextResponse } from "next/server";

import axios from "axios";

export async function GET(req: NextRequest) {
    try {
        const token: string = req.headers.get('authorization') as string;
        const res = await axios
            .get(`${process.env.BASE_URL}/articles/feed`
                , {
                    headers: {
                        'Authorization': token
                    }
                })

        return NextResponse.json({ data: await res.data, status: res.status })

    } catch (error: any) {
        //console.error('API_ARTICLE_FEED_GET', error)
        if (error.response.status === 422) {
            return NextResponse.json({ data: error.response.data.errors, status: error.response.status })
        }
        if (error.response.status === 401) {
            return NextResponse.json({ data: { "User": ['missing authorization credentials'] }, status: error.response.status })
        }

        return new NextResponse('Internal server error', { status: 500, statusText: 'Internal server error' })
    }
}