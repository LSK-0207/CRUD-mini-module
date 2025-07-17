import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="font-bold text-2xl text-center text-white">
        <h1>
          Visit this link for the main app {"-->"}{" "}
          <Link href={"/users"}>
            <span className="text-blue-500 hover:text-blue-400 hover:underline">
              /users
            </span>
          </Link>
        </h1>
      </div>
    </div>
  );
}
