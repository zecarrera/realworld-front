import Link from "next/link";
import Image from "next/image";

import { Settings } from "lucide-react";

export type TProfileHeaderProps = {
	profile: {
		username: "string";
		bio: "string";
		image: "string";
		following: true;
	};
};

const ProfileHeader: React.FC<TProfileHeaderProps> = ({ profile }) => {
	return (
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
					{profile.username}
				</h1>
				<p className="w-fit h-fit font-light text-gray-400">
					{profile.bio}
				</p>
				<Link
					href="/settings"
					className="flex items-center align-middle bg-transparent border border-gray-400 rounded-sm cursor-pointer text-gray-400 p-1 hover:bg-gray-200 ml-auto"
				>
					<Settings height={15} width={15} className="mr-1" />
					Edit Profile Settings
				</Link>
			</div>
		</div>
	);
};

export default ProfileHeader;
