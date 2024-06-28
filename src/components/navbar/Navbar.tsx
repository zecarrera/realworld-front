import Link from "next/link";
import { Titillium_Web } from "next/font/google";

import { Settings } from "lucide-react";

import { getSession } from "@/actions";

import NavLink from "@/components/navbar/NavLink";

const titilliumWeb = Titillium_Web({
	weight: "700",
	subsets: ["latin-ext"],
});

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
			isLoggedIn: session.isLoggedIn,
		},
		{
			href: "/settings",
			name: "Settings",
			isLoggedIn: !session.isLoggedIn,
		},
		{
			href: "/editor",
			name: "Transaction",
			isLoggedIn: session.isLoggedIn,
		},
		{
			href: "/profile",
			name: "username",
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
					/>
				))}
			</div>
		</div>
	);
};

export default NavBar;
