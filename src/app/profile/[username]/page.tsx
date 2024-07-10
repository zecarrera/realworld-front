import Image from "next/image";

import { Button } from "@/components/ui/button";

type TProfilePageProps = {
	username: string;
};

const ProfilePage = async ({ params }: { params: TProfilePageProps }) => {
	console.log(params.username);

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
};

export default ProfilePage;
