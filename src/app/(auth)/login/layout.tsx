import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "sign in",
	description:
		"Conduit is realworld social blogging site. it uses a custom API for all requests, including authentication. login page of conduit",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <main>{children}</main>;
}
