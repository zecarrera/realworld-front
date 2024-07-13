"use client";

import { useState } from "react";

import { z } from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
	Form,
	FormItem,
	FormField,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { TError } from "@/app/api/(auth)/login/interfaces/error";
import { FormattedErrors } from "@/components/error/FormattedErrors";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
	title: z.string(),
	description: z.string(),
	body: z.string(),
	tagList: z.string().optional(),
});

type TStateProp = {
	loading: boolean;
	isError: boolean;
	errors: {
		[key: string]: string[];
	};
	tagList: string[];
};

const EditorPage = () => {
	const [state, setState] = useState<TStateProp>({
		loading: false,
		isError: false,
		errors: {},
		tagList: [],
	});
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			description: "",
			body: "",
			tagList: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		// setState((prevState) => ({ ...prevState, loading: true }));
		// await axios
		// 	.post("/api/login", values)
		// 	.then((res) => {
		// 		if (res.data.status === 200) {
		// 			setState((prevState) => ({ ...prevState, loading: false }));
		// 			window.location.assign("/");
		// 		} else {
		// 			setState((prevState) => ({
		// 				...prevState,
		// 				loading: false,
		// 				isError: true,
		// 				errors: res.data.data,
		// 			}));
		// 		}
		// 	})
		// 	.catch((err) => {
		// 		console.log("From Editor page", err);
		// 		const errors: TError = {
		// 			"": [err.response.statusText],
		// 		};
		// 		setState((prevState) => ({
		// 			...prevState,
		// 			loading: false,
		// 			isError: true,
		// 			errors,
		// 		}));
		// 	});
	}

	return (
		<div className="flex flex-col gap-3 mx-5 md:mx-auto md:w-4/5 lg:w-3/5">
			{state.isError && (
				<FormattedErrors data={state.errors} className="ml-5" />
			)}

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8"
				>
					<FormField
						control={form.control}
						name="title"
						disabled={state.loading}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder="Article Title"
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
						name="description"
						disabled={state.loading}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder="What's this article about?"
										{...field}
										className="py-3 px-6 text-xl rounded-s-md text-gray-400 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-blue-custom"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="body"
						disabled={state.loading}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Textarea
										placeholder="Write your article(in markdown)"
										{...field}
										className="py-3 px-6 h-52 text-xl rounded-s-md text-gray-400 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-blue-custom"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<fieldset>
						<FormField
							control={form.control}
							name="tagList"
							disabled={state.loading}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											placeholder="Enter tags"
											{...field}
											onKeyUp={(_e) => {
												state.tagList.push(
													field.value as string
												);
											}}
											className="py-3 px-6 text-xl rounded-s-md text-gray-400 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-blue-custom"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{state.tagList.map((ele, index) => (
							<span key={index}>{ele}</span>
						))}
					</fieldset>
					<div className="flex justify-end">
						<Button
							type="submit"
							disabled={state.loading}
							className="bg-green-custom opacity-85 py-3 px-5 rounded-md  text-xl hover:bg-green-custom hover:opacity-100"
						>
							Publish Article
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};
export default EditorPage;
