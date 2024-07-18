import axios from "axios";

import { getSession } from "@/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type TAvatarImageProps = {
	username: string;
};

export const AvatarImg: React.FC<TAvatarImageProps> = async ({ username }) => {
	const session = await getSession();

	try {
		const res = await axios.get(
			`http://localhost:4000/api/profiles/${username}`,
			{
				headers: {
					Authorization: `Token ${session.token}`,
				},
			}
		);
		const data = await res.data;

		const { profile } = await data.data;

		return (
			<Avatar>
				<AvatarImage src={profile.image} />
				<AvatarFallback>{profile.username}</AvatarFallback>
			</Avatar>
		);
	} catch (err) {
		//console.log(err)
		return (
			<h1 className="text-rose-500 w-fit mx-auto">
				Internal server Error
			</h1>
		);
	}
};
