import axios from "axios";
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const body = await req.json();
        if (!body.token)
            return new NextResponse("Property token is required", {
                status: 400
            });
        if (!body.title)
            return new NextResponse("Property title is required", {
                status: 400
            });
        if (!body.description)
            return new NextResponse("Property description is required", {
                status: 400
            });
        if (!body.body)
            return new NextResponse("Property body is required", {
                status: 400
            });


        const res = await axios
            .post(`${process.env.BASE_URL}/articles`, {
                article: {
                    title: body.title,
                    description: body.description,
                    body: body.description,
                    tagList: body.tagList
                }
            }, {
                headers: {
                    'Authorization': `Token ${body.token}`
                }
            })

        return NextResponse.json({ data: await res.data, status: res.status })

    } catch (error: any) {
        console.error('API_ARTICLE_GET', error)
        if (
            error.response.status === 401 ||
            error.response.status === 422
        ) {
            return NextResponse.json({ data: error.response.data.errors, status: error.response.status })
        }

        return new NextResponse('Internal server error', { status: 500, statusText: 'Internal server error' })
    }
}
