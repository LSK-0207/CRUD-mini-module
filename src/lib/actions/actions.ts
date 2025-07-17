"use server";

import { prisma } from "@/lib/prisma";
import { updateFormSchema, userSchema } from "../validations/validSchema";
import { revalidatePath } from "next/cache";

type ActionState = { success: boolean; error: boolean };

export async function createUser(
  _: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsedData = userSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
  });

  if (!parsedData.success) {
    const errors = parsedData.error.flatten().fieldErrors;
    console.log(errors);
    return { success: false, error: true };
  }

  const data = parsedData.data;

  try {
    await prisma.user.create({ data });
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
}

export async function deleteUser(formData: FormData) {
  const userId = formData.get("id") as string;

  if (!userId) return;

  try {
    await prisma.user.delete({ where: { id: userId } });
    revalidatePath("/users");
  } catch (error) {
    console.log("Error while deleting the user: ", error);
  }
}

export async function updateUser(_: ActionState, formData: FormData) {
  const userId = formData.get("id");
  if (!userId || typeof userId !== "string") {
    return { success: false, error: true };
  }

  const parsedData = updateFormSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    email: formData.get("email"),
  });

  if (!parsedData.success) {
    console.log("error while parsing the data");
    return { success: false, error: true };
  }

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: parsedData.data,
    });

    return { success: true, error: false };
  } catch (error) {
    console.log("Error while updating: ", error);
    return { success: false, error: true };
  }
}
