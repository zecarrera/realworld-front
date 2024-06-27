"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NavLink: React.FC<TNavLink> = ({ href, name, isLoggedIn }) => {
	const pathname = usePathname();

	return (
		<Button
			className={cn(
				"text-slate-300 last:pr-0",
				pathname == href && "text-slate-900 underline"
			)}
			asChild
			variant="link"
		>
			{isLoggedIn && <Link href={href}>{name}</Link>}
		</Button>
	);
};

export default NavLink;
