import type { MetaFunction } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { BookIcon } from "lucide-react";

import { useOptionalUser } from "~/utils";

export const meta: MetaFunction = () => [{ title: "Remix Notes" }];

export default function Index() {
  const user = useOptionalUser();
  return (
    <main className="relative min-h-screen bg-slate-800 sm:flex sm:items-center sm:justify-center">
      <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
        {user ? (
          <div className="flex flex-col items-center gap-16 text-center text-stone-100">
            <div className="flex flex-col gap-4">
              <p className="text-xs">
                You are already logged in as {user.email}
              </p>
              <Link to="/books" className="text-3xl">
                enter{" "}
                <span className="font-bold">
                  track<i>ka</i>
                </span>
              </Link>
            </div>
            <Link to="/logout" className="text-sm underline opacity-50">
              Log out
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-16">
            <h1 className="text-3xl font-bold text-stone-100">
              <Link to="." className="flex items-center gap-2">
                <BookIcon className="mt-1" />
                <div>
                  track<i>ka</i>
                </div>
              </Link>
            </h1>
            <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
              <Link
                to="/join"
                className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
              >
                Sign up
              </Link>
              <Link
                to="/login"
                className="flex items-center justify-center rounded-md bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600"
              >
                Log In
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
