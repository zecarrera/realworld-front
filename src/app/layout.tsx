import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
	title: {
		default: "Conduit",
		template: "%s — Conduit",
	},
	description:
		"Conduit is realworld social blogging site. it uses a custom API for all requests, including authentication.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
