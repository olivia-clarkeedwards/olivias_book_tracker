import { json, type ActionArgs, type V2_MetaFunction } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
// import { Link, Form } from "@remix-run/react";
// import { SearchField } from "~/components/searchField";

// import { useOptionalUser } from "~/utils";

// const PROGRESS_STATES = ["toread", "reading", "read"];

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Olivia's Booktracker" },
    { name: "Keep track of what I'm reading", content: "Happy reading!" },
  ];
};

type Book = { title: string; author: string; coverURL: string };

export default function Index() {
  // const user = useOptionalUser();
  const fetcher = useFetcher();
  const { Form } = fetcher;
  const [currentBook, setCurrentBook] = useState<Book>({} as Book);

  useEffect(() => {
    if (fetcher.data) {
      setCurrentBook(fetcher.data);
    }
  });
  return (
    <main className="h1 relative h-screen min-h-screen bg-red-200 sm:flex sm:items-center sm:justify-center">
      <h1>BookTracker</h1>
      <Form method="post" action=".">
        <input hidden name="__action" value="add-book" />
        {/* <SearchField inputName="search book" placeholder="search book" /> */}
        <label htmlFor="title">Title</label>
        <input
          name="title"
          className="w-full rounded-full px-2 py-1 text-center text-lg"
        />
        <br />
        <label htmlFor="author">Author</label>
        <input
          name="author"
          className="w-full rounded-full px-2 py-1 text-center text-lg"
        />
        <br />
        <label htmlFor="cover">Cover image URL</label>
        <input
          name="cover"
          className="w-full rounded-full px-2 py-1 text-center text-lg"
        />
        <br />
        <button
          className="w-full rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-400 focus:bg-blue-300"
          type="submit"
        >
          Add book to library
        </button>
      </Form>

      <h2>My Library</h2>
      <ul>
        {currentBook && (
          <>
            <li>{`${currentBook?.title} by ${currentBook.author}`}</li>
            <img
              src={currentBook.coverURL}
              alt={`${currentBook.title} cover`}
              className="h-20"
            />
          </>
        )}
        <li>Book2</li>
        <li>Book3</li>
      </ul>

      {/* {PROGRESS_STATES.map((state: string) => (
        <div className="card" key={state}>
          <h2>{state.toUpperCase()}</h2>
          <Link to={`/books/${state}`}>View all</Link>
        </div>
      ))} */}
    </main>
  );
}

export const action = async (args: ActionArgs) => {
  const { request } = args;
  const data = await request.formData();

  const __action = data.get("__action");

  switch (__action) {
    case "add-book": {
      return actionAddBook(args, data);
    }
  }
};

const actionAddBook = async (
  { request, context, params }: ActionArgs,
  data: FormData
) => {
  //get user id?

  const bookTitle = data.get("title");
  const author = data.get("author");
  const coverURL = data.get("cover");

  return json({ title: bookTitle, author, coverURL });
};
