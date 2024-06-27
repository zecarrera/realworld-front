import Link from "next/link";

import { getSession } from "@/actions";

import NavLink from "@/components/navbar/NavLink";
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
			name: "Login",
			isLoggedIn: !session.isLoggedIn,
		},
		{
			href: "/dashboard",
			name: "Dashboard",
			isLoggedIn: session.isLoggedIn,
		},
		{
			href: "/transaction",
			name: "Transaction",
			isLoggedIn: session.isLoggedIn,
		},
	];

	return (
		<div className="flex justify-between min-w-full p-2 md:px-5 lg:px-8">
			<Link href="/">
				<Avatar>
					<AvatarImage src="https://lh3.googleusercontent.com/a/ACg8ocJ7MBdV5cQ4zvbpTTy8B9wBR_HQ3gaPj28XA_6BBu2z2TLMso_T=s288-c-no" />
					<AvatarFallback>Qubi</AvatarFallback>
				</Avatar>
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
				{session.isLoggedIn && <Profile userId={session!.userId!} />}
			</div>
		</div>
	);
};

export default NavBar;
