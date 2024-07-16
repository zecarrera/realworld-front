import { NextResponse } from "next/server"

export async function GET(req: Request) {
    try {

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