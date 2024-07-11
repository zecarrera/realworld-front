import Image from "next/image";

import axios from "axios";

import { getSession } from "@/actions";
import { Button } from "@/components/ui/button";

type TProfilePageProps = {
	username: string;
};

const ProfilePage = async ({ params }: { params: TProfilePageProps }) => {
	const session = await getSession();

	try {
		const res = await axios.get(`/profile/${session.username}`, {
			data: {
				token: session.token,
			},
		});

		const data = await res.data;

		const { user } = await data.data;
		console.log(user)
		return (
			<div>
				<div>
					<Image src="" alt="" />
					<h1>{params.username}</h1>
					<p>bio</p>
					<Button>Edit Profile Settings</Button>
				</div>
			</div>
		);
	} catch (err) {
		console.log(err)
		return (
			<h1 className="text-rose-500 w-fit mx-auto">
				Internal server Error
			</h1>
		);
	}
};

export default ProfilePage;
