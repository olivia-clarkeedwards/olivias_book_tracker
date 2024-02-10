import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { BookIcon } from "lucide-react";
import { BookDisplayCard } from "~/components/bookDisplayCard";
import { DataPanel } from "~/components/dataPanel";
import { Input } from "~/components/input";

import { getBookListItems } from "~/models/book.server";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  const bookListItems = await getBookListItems({ userId });
  return json({ bookListItems });
};

export default function BooksPage() {
  const data = useLoaderData<typeof loader>();
  const user = useUser();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-gray-800 p-4 text-stone-100">
        <h1 className="text-3xl font-bold text-stone-100">
          <Link to="." className="flex items-center gap-2">
            <BookIcon className="mt-1" />
            <div>
              track<i>ka</i>
            </div>
          </Link>
        </h1>
        <p>{user.email}</p>
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-gray-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>
      </header>

      <main className="flex h-full w-full">
        <div className="flex h-full w-full grid-cols-2">
          <aside className="sticky flex h-full w-96 flex-col gap-4 bg-gray-800 p-8 text-gray-800">
            <form className="flex w-80 flex-col items-center gap-3 bg-gray-600 bg-opacity-20 px-8 py-10 text-xs">
              <Input name="title" />
              <Input name="author" />
              <Input name="image" />
              <Input name="genre" />
              <div>
                <button className="mt-6 rounded-full bg-gray-600 px-4 py-3 text-stone-300">
                  Add new book
                </button>
              </div>
            </form>
            <div className="flex w-80 flex-col items-center gap-6 bg-gray-600 bg-opacity-20 px-8 py-8 text-xs">
              <div className="h-24 w-24 rounded-full bg-gray-50" />
              <div className="h-32 w-full  bg-gray-50" />
            </div>
          </aside>
          <div className="flex w-full flex-col gap-8 overflow-y-auto bg-gray-800 p-12">
            <DataPanel />
            {data.bookListItems.length === 0 ? (
              <p className="p-4">No books yet</p>
            ) : (
              <div className="justify-left flex w-full flex-1 grid-cols-3 flex-wrap gap-8">
                {data.bookListItems.map((book) => (
                  <li key={book.id}>
                    <BookDisplayCard title={book.title} author={book.author} />
                  </li>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
