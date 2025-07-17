import UserUpdateClient from "@/components/UserUpdateClient";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function UserUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) return notFound();

  return <UserUpdateClient user={user} />;
}
