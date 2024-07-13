import axios from "axios";

import { getSession } from "@/actions";
import ProfileHeader from "@/components/profiles/ProfileHeader";

// todo: remove if not used
type TProfilePageProps = {
	username: string;
};

const ProfilePage = async ({ params }: { params: TProfilePageProps }) => {
	const session = await getSession();

	try {
		const res = await axios.post(
			`http://localhost:4000/api/profiles/${session.username}`,
			{
				token: session.token,
			}
		);

		const data = await res.data;

		const { profile } = await data.data;

		return (
			<div className="">
				<ProfileHeader profile={profile} />
			</div>
		);
	} catch (err) {
		console.log(err);
		return (
			<h1 className="text-rose-500 w-fit mx-auto">
				Internal server Error
			</h1>
		);
	}
};

export default ProfilePage;
