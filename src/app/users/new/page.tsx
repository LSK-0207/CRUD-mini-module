"use client";

import { createUser } from "@/lib/actions/actions";
import { UserInputSchema, userSchema } from "@/lib/validations/validSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function CreateUserPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInputSchema>({ resolver: zodResolver(userSchema) });

  const [state, formAction, isPending] = useActionState(createUser, {
    success: false,
    error: false,
  });

  useEffect(() => {
    if (state.success) {
      revalidatePath("/users");
      router.push("/users");
      router.refresh();
    }
  }, [state, router]);

  const onSubmit = (data: UserInputSchema) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <div className="h-screen max-w-7xl text-white mx-auto flex items-center justify-center border-l border-r border-gray-400 bg-black">
      {/* FORM CONTAINER */}
      <div className="border-2 border-gray-700 rounded-4xl h-[65%] w-[30%] flex flex-col items-center justify-center gap-6">
        <h1 className="text-2xl font-bold mb-6">Create User</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <input
            {...register("name")}
            placeholder="enter your name"
            type="text"
            className="input"
          />
          {errors.name && (
            <span className="error">{errors.name.message?.toString()}</span>
          )}
          <input
            {...register("email")}
            placeholder="enter your email"
            type="email"
            className="input"
          />
          {errors.email && (
            <span className="error">{errors.email.message?.toString()}</span>
          )}
          <button
            type="submit"
            className={`button ${
              isPending
                ? "disabled:bg-gray-500"
                : "bg-blue-500 hover:bg-blue-400"
            }`}
          >
            {isPending ? "Submitting..." : "Submit"}
          </button>
          {state.error && (
            <span className="error">
              Something went wrong. PLease try again later.
            </span>
          )}
          <Link href={"/users"}>
            <button className="text-center text-gray-400 hover:text-gray-300 hover:underline w-full mt-5 hover:cursor-pointer">
              See all existing users
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
