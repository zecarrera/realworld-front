"use client";

import { useState } from "react";

import { z } from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	Form,
	FormItem,
	FormField,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TError } from "@/app/api/(auth)/login/interfaces/error";
import { FormattedErrors } from "@/components/error/FormattedErrors";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const formSchema = z.object({
	comment: z.string().min(1),
});

export type TStateProp = {
	loading: boolean;
	isError: boolean;
	errors: {
		[key: string]: string[];
	};
	tagList: string[];
};

type TCommentProps = {
	token: string;
};

export const CommentForm: React.FC<TCommentProps> = ({ token }) => {
	const [state, setState] = useState<TStateProp>({
		loading: false,
		isError: false,
		errors: {},
		tagList: [],
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			comment: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setState((prevState) => ({ ...prevState, loading: true }));
		await axios
			.post(
				"/api/articles",
				{
					...values,
					tagList: state.tagList,
				},
				{
					headers: {
						Authorization: `Token ${token}`,
					},
				}
			)
			.then((res) => {
				if (res.data.status === 201) {
					const { article } = res.data.data;
					setState((prevState) => ({ ...prevState, loading: false }));
					window.location.assign(`/article/${article.slug}`);
				} else {
					setState((prevState) => ({
						...prevState,
						loading: false,
						isError: true,
						errors: res.data.data,
					}));
				}
			})
			.catch((err) => {
				console.log("From Editor page", err);
				const errors: TError = {
					"": [err.response.statusText],
				};
				setState((prevState) => ({
					...prevState,
					loading: false,
					isError: true,
					errors,
				}));
			});
	}

	return (
		<div className="w-4/5 md:w-3/6 mx-auto my-5 ">
			{state.isError && (
				<FormattedErrors data={state.errors} className="ml-5" />
			)}

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="border rounded-md border-gray-200"
				>
					<FormField
						control={form.control}
						name="comment"
						disabled={state.loading}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Textarea
										placeholder="Write a comment..."
										{...field}
										className="text-md p-5 rounded-none border-t-0 border-x-0 border-b text-gray-400 placeholder:text-gray-400  focus-visible:ring-0 focus-visible:ring-offset-0"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="flex justify-between items-center p-3 bg-gray-100">
						<Avatar className="border">
							<AvatarImage src="" />
							<AvatarFallback>{"username"}</AvatarFallback>
						</Avatar>
						<Button
							type="submit"
							disabled={state.loading}
							className="bg-green-custom opacity-85 h-fit py-1 rounded-md  text-sm hover:bg-green-custom hover:opacity-100"
						>
							Post Comment
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};
