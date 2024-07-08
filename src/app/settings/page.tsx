import axios from "axios";

import { getSession } from "@/actions";
import Logout from "@/components/settings/Logout";
import { Separator } from "@/components/ui/separator";
import { SettingForm } from "@/components/settings/SettingForm";

const SettingsPage = async () => {
	const session = await getSession();

	try {
		const res = await axios.post("http://localhost:4000/api/user", {
			token: session.token,
		});
		const data = await res.data;

		const { user } = await data.data;
		return (
			<div className="max-w-96 mx-5 md:mx-auto flex flex-col gap-3">
				<h1 className="text-5xl mx-auto w-fit h-fit">Your Settings</h1>
				<SettingForm
					bio={user.bio}
					email={user.email}
					imageUrl={user.image}
					username={user.username}
				/>
				<Separator />
				<Logout />
			</div>
		);
	} catch (err) {
		return (
			<h1 className="text-rose-500 w-fit mx-auto">
				Internal server Error
			</h1>
		);
	}
};

export default SettingsPage;
