import type { FC } from "react";
import { useRef } from "react";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

type Book = {
  cover_i: number;
  has_fulltext: boolean;
  edition_count: number;
  title: string;
  author_name: string[];
  first_publish_year: number;
  key: string;
  ia: string[];
  author_key: string[];
  public_scan_b: boolean;
};

const searchURL = "https://openlibrary.org/search.json?q=";

export const loader = async (args: LoaderFunctionArgs) => {
  const response = await fetch(`${searchURL}the+lord+of+the+rings`);
  const books: Book[] = await response.json();
  return json({ books });
};

interface SearchFieldProps {
  width?: Number | String;
  height?: Number | String;
  fontFamily?: String;
  fontSize?: Number;
  placeholder?: String;
  onChange?: (e: any) => void;
  icon?: String;
  inputName?: String;
  defaultValue?: any;
}

export const SearchField: FC<SearchFieldProps> = (props: any) => {
  const data = useLoaderData();
  console.log(data);

  const {
    placeholder = "",
    onChange = () => {},
    icon = "",
    inputName,
    defaultValue,
  } = props;

  const searchField: any = useRef(null);

  return (
    <div ref={searchField} className={`relative`}>
      <input
        type="search"
        name={inputName || ""}
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={defaultValue || "hi"}
        className={`input relative
        `}
      />
      {icon && (
        <img
          alt=""
          src={icon}
          style={{
            position: "absolute",
            left: 15,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
      )}
    </div>
  );
};
