import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

type TUserAvatar = {
	username: string;
	date: string;
	imageUrl?: string;
};

const UserAvatar: React.FC<TUserAvatar> = ({ username, date, imageUrl }) => {
	date = new Date(date).toDateString().slice(4);

	return (
		<div className="w-fit h-fit bg-transparent flex gap-1 items-center">
			<Link href={`/profile/${username}`}>
				<Avatar>
					<AvatarImage src={imageUrl} />
					<AvatarFallback>{username}</AvatarFallback>
				</Avatar>
			</Link>
			<div className="w-fit h-fit flex flex-col justify-start">
				<Link href={`/profile/${username}`}>{username}</Link>
				<p className="opacity-65 font-light">{date}</p>
			</div>
		</div>
	);
};

export default UserAvatar;
