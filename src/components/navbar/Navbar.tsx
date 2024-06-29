import Link from "next/link";

import { Titillium_Web } from "next/font/google";
import { Settings, FilePenLine } from "lucide-react";

export const titilliumWeb = Titillium_Web({
	weight: "700",
	subsets: ["latin"],
});

import { getSession } from "@/actions";

import NavLink from "@/components/navbar/NavLink";
import { TNavLink } from "@/components/navbar/interfaces/navlink";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const NavBar = async () => {
	const session = await getSession();

	const navLinks: TNavLink[] = [
		{
			href: "/",
			name: "Home",
			isLoggedIn: true,
		},
		{
			href: "/login",
			name: "Sign in",
			isLoggedIn: !session.isLoggedIn,
		},
		{
			href: "/register",
			name: "Sign up",
			isLoggedIn: !session.isLoggedIn,
		},
		{
			href: "/article",
			name: "New Article",
			icon: <FilePenLine className="m-auto" width={16} height={16} />,
			isLoggedIn: session.isLoggedIn,
		},
		{
			href: "/settings",
			name: "Settings",
			icon: <Settings className="m-auto" width={16} height={16} />,
			isLoggedIn: session.isLoggedIn,
		},
		{
			href: "/editor",
			name: "Transaction",
			isLoggedIn: session.isLoggedIn,
		},
		{
			href: "/profile",
			name: "username",
			icon: (
				<Avatar>
					<AvatarImage
						src="https://github.com/shadcn.png"
						alt="profile"
					/>
					<AvatarFallback>{session!.username!}</AvatarFallback>
				</Avatar>
			),
			isLoggedIn: session.isLoggedIn,
		},
	];

	return (
		<div className="flex justify-between min-w-full py-2 px-4 md:px-10 lg:px-14">
			<Link
				className={`${titilliumWeb.className} text-green-custom text-2xl font-bold`}
				href="/"
			>
				conduit
			</Link>
			<div className="flex  justify-end items-center">
				{navLinks.map((link) => (
					<NavLink
						isLoggedIn={link.isLoggedIn}
						key={link.name}
						href={link.href}
						name={link.name}
						icon={link.icon}
					/>
				))}
			</div>
		</div>
	);
};

export default NavBar;
