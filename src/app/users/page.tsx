export const dynamic = "force-dynamic";

import { deleteUser } from "@/lib/actions/actions";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function UsersPage() {
  const users = await prisma.user.findMany();

  return (
    <div className="h-screen w-full bg-black text-white">
      {/* MAIN CONTAINER */}
      <div className="max-w-7xl h-screen mx-auto flex items-center justify-center">
        {/* USER CONTAINER */}
        <div className="flex flex-col items-center h-full w-[80%]">
          <div className="flex items-center justify-between px-6 py-6 w-full">
            <h1 className="text-2xl font-bold uppercase py-5 ml-4">
              All Users
            </h1>
            <Link href={"/users/new"}>
              <button className="button mb-5 bg-blue-500 hover:bg-blue-400">
                Create User
              </button>
            </Link>
          </div>
          {users.length === 0 ? (
            <div className="h-full w-full flex flex-col items-center justify-center gap-4">
              <span className="text-2xl font-bold">No users found!</span>
              <span className="text-sm text-gray-500 font-semibold">
                You can create new users by clicking on the Create User button!
              </span>
            </div>
          ) : (
            <ul className="w-full text-center">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="px-16 flex justify-between items-center"
                >
                  <div>
                    <p className="text-lg font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>

                  <div className="flex gap-4 mb-6 items-center justify-center">
                    <Link href={`/users/${user.id}`}>
                      <button className="button bg-emerald-700 hover:bg-green-600">
                        Update
                      </button>
                    </Link>

                    <form action={deleteUser}>
                      <input type="hidden" name="id" value={user.id} />
                      <button
                        type="submit"
                        className="button bg-red-500 hover:bg-red-300"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
