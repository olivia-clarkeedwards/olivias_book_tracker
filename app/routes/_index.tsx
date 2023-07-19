import type { V2_MetaFunction } from "@remix-run/node";
import { Link, Form } from "@remix-run/react";
import { SearchField } from "~/components/searchField";

// import { useOptionalUser } from "~/utils";

const PROGRESS_STATES = ["toread", "reading", "read"];

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Olivia's Booktracker" },
    { name: "Keep track of what I'm reading", content: "Happy reading!" },
  ];
};

export default function Index() {
  // const user = useOptionalUser();
  return (
    <main className="h1 relative h-screen min-h-screen bg-red-200 sm:flex sm:items-center sm:justify-center">
      <h1>BookTracker</h1>
      <Form>
        <SearchField inputName="search book" placeholder="search book" />
      </Form>

      {PROGRESS_STATES.map((state: string) => (
        <div className="card" key={state}>
          <h2>{state.toUpperCase()}</h2>
          <Link to={`/books/${state}`}>View all</Link>
        </div>
      ))}
    </main>
  );
}
