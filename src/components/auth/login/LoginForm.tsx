"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormItem,
	FormLabel,
	FormField,
	FormControl,
	FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export const LoginForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder="Email"
									{...field}
									className="py-3 px-6 text-xl rounded-s-md text-gray-400 placeholder:text-gray-400  focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-blue-custom"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									type="password"
									placeholder="Password"
									{...field}
									className="py-3 px-6 text-xl rounded-s-md text-gray-300 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-blue-custom"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex justify-end">
					<Button
						type="submit"
						className="bg-green-custom opacity-65 py-3 px-5 rounded-md  text-xl"
					>
						Sign in
					</Button>
				</div>
			</form>
		</Form>
	);
};
