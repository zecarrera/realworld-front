import { NextResponse } from "next/server";

import axios from "axios";

export async function POST(req: Request) {
	try {

		const body = await req.json();

		if (!body.email)
			return new NextResponse("Property email is required", {
				status: 400
			});
		if (!body.password)
			return new NextResponse("Property password is required", {
				status: 400,
			});

		await axios
			.post(`${process.env.BASE_URL}/users/login`, {
				user: {
					email: body.email,
					password: body.password,
				},
			})

	} catch (error: any) {
		// console.error('API_LOGIN_POST', error.response.data.errors)
		if (error.response.status === 403)
			return NextResponse.json({ data: error.response.data.errors, status: error.response.status })
		return new NextResponse('Error', { status: 500, statusText: 'Internal server error' })
	}

}
