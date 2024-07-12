import Image from "next/image";

import axios from "axios";
import { Settings } from "lucide-react";

import { getSession } from "@/actions";
import { Button } from "@/components/ui/button";

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
				<div className="px-3 py-5 shadow-custom bg-gray-100 h-fit">
					<div className="w-full md:w-4/5 lg:w-3/5 mx-auto flex flex-col align-middle items-center justify-center gap-2">
						<div className="relative w-24 h-24 rounded-full">
							<Image
								src={profile.image}
								alt={profile.username}
								fill
								className="rounded-full object-fit"
							/>
						</div>
						<h1 className=" font-bold text-2xl w-fit h-fit">
							{params.username}
						</h1>
						<p className="w-fit h-fit font-light text-gray-400">
							{profile.bio}
						</p>
						<Button className=" bg-transparent border border-gray-400 rounded-sm cursor-pointer text-gray-400 p-1 h-7 hover:bg-gray-200 ml-auto">
							<Settings height={15} width={15} className="mr-1" />
							Edit Profile Settings
						</Button>
					</div>
				</div>
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
