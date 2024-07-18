import Link from "next/link";

import { AvatarImg } from "@/components/profiles/avatar/AvatarImage";

type TUserAvatar = {
	username: string;
	date: string;
};

const UserAvatar: React.FC<TUserAvatar> = ({ username, date }) => {
	date = new Date(date).toDateString().slice(4);

	return (
		<div className="w-fit h-fit bg-transparent flex gap-1 items-center">
			<Link href={`/profile/${username}`}>
				<AvatarImg username={username} />
			</Link>
			<div className="w-fit h-fit flex flex-col justify-start">
				<Link href={`/profile/${username}`}>{username}</Link>
				<p className="opacity-65 font-light">{date}</p>
			</div>
		</div>
	);
};

export default UserAvatar;
