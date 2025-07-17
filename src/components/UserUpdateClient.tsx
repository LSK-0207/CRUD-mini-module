"use client";

import { updateUser } from "@/lib/actions/actions";
import {
  updateFormSchema,
  UpdateFormSchema,
} from "@/lib/validations/validSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function UserUpdateClient({ user }: { user: UpdateFormSchema }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateFormSchema>({ resolver: zodResolver(updateFormSchema) });

  const [state, formAction, isPending] = useActionState(updateUser, {
    success: false,
    error: false,
  });
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.push("/users");
    }
  }, [state, router]);

  const onSubmit = (data: UpdateFormSchema) => {
    const patchedData = {
      id: data.id,
      name: data.name?.trim() === "" ? user.name : data.name,
      email: data.email?.trim() === "" ? user.email : data.email,
    };

    const formData = new FormData();
    formData.append("id", patchedData.id);
    formData.append("name", patchedData.name ?? "");
    formData.append("email", patchedData.email ?? "");

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <div className="h-screen max-w-7xl text-white mx-auto flex items-center justify-center border-l border-r border-gray-400 bg-black">
      {/* FORM CONTAINER */}
      <div className="border-2 border-gray-700 rounded-4xl h-[65%] w-[30%] flex flex-col items-center justify-center gap-6">
        <h1 className="text-2xl font-bold mb-6">Update User</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <input type="hidden" {...register("id")} value={user.id} />

          <label>Name</label>
          <input
            {...register("name")}
            placeholder="enter name"
            defaultValue={user.name || ""}
            className="input"
          />

          <label>Email</label>
          <input
            {...register("email")}
            placeholder="name@example.com"
            defaultValue={user.email || ""}
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
              Something went wrong. Pleease try again later.
            </span>
          )}

          <Link href={"/users"}>
            <button className="text-center text-gray-400 hover:text-gray-300 hover:underline w-full mt-5 hover:cursor-pointer">
              Back to all users page
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
