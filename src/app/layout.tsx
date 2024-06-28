import type { Metadata } from "next";
import { Titillium_Web, Source_Serif_4, Merriweather, Source_Sans_3} from "next/font/google";

import "./globals.css";
import NavBar from "@/components/navbar/Navbar";

const titilliumWeb = Titillium_Web({
	weight: "700",
	subsets: ["latin"],
});
const sourceSerifPro400 = Source_Serif_4({
	weight: "400",
	subsets: ["latin"],
});
const sourceSerifPro700 = Source_Serif_4({
	weight: "700",
	subsets: ["latin"],
});
const merriWeather400 = Merriweather({
	weight: "400",
	subsets: ["latin"],
});
const merriWeather700 = Merriweather({
	weight: "700",
	subsets: ["latin"],
});
const sourceSansPro300 = Merriweather({
	weight: "300",
	subsets: ["latin"],
	style: 'italic'
});
const sourceSansPro400 = Merriweather({
	weight: "400",
	subsets: ["latin"],
	style: 'italic'
});
const sourceSansPro600 = Merriweather({
	weight: "400",
	subsets: ["latin"],
	style: 'italic'
});
const sourceSansPro700 = Merriweather({
	weight: "400",
	subsets: ["latin"],
	style: 'italic'
});

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
			<body className={`${titilliumWeb.className} text-[1rem]`}>
				<header>
					<NavBar />
				</header>
				<main>{children}</main>
				<footer></footer>
			</body>
		</html>
	);
}
