import { useState, useEffect } from 'react'
import { Switch } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Home() {
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookGenre, setBookGenre] = useState("");
  const [founder, setFounder] = useState("");
  const [apiRes, setApiRes] = useState(null);

  const readDb = async () => {
    try {
      const response = await fetch("/api/books", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      setApiRes(await response.json())
      if (response.status != 200) {
        console.log("Oops something went wrong with the request");
      } else {
        console.log("200 Success");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const resetForm = () => {
    setBookTitle("");
    setBookAuthor("");
    setBookGenre("");
    setFounder("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { bookTitle, bookAuthor, bookGenre, founder }
    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.status != 200) {
        console.log("Oops something went wrong with the request");
      } else {
        resetForm();
        readDb();
        console.log("Form submitted successfully");
      }
    } catch (error) {
      console.log("There was an error with the request", error);
    }
  }



  return (
    <div className="overflow-hidden bg-white py-16 px-4 sm:px-6 lg:px-8 lg:py-24">
      <div className="relative mx-auto max-w-xl">
        <svg
          className="absolute left-full translate-x-1/2 transform"
          width={404}
          height={404}
          fill="none"
          viewBox="0 0 404 404"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="85737c0e-0916-41d7-917f-596dc7edfa27"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
            </pattern>
          </defs>
          <rect width={404} height={404} fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
        </svg>
        <svg
          className="absolute right-full bottom-0 -translate-x-1/2 transform"
          width={404}
          height={404}
          fill="none"
          viewBox="0 0 404 404"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="85737c0e-0916-41d7-917f-596dc7edfa27"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
            </pattern>
          </defs>
          <rect width={404} height={404} fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
        </svg>
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Book Docker</h2>
          <p className="mt-4 text-lg leading-6 text-gray-500">
            Curated reading list from Founders & CEOs in the United States
          </p>
        </div>
        <div className="mt-12">
          <form action="#" method="POST" onSubmit={(e) => handleSubmit(e)} className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div>
              <label htmlFor="book-title" className="block text-sm font-medium text-gray-700">
                Book Title
              </label>
              <div className="mt-1">
                <input
                  onChange={(e) => setBookTitle(e.target.value)}
                  type="text"
                  name="book-title"
                  id="book-title"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="author-name" className="block text-sm font-medium text-gray-700">
                Author Name
              </label>
              <div className="mt-1">
                <input
                  onChange={(e) => setBookAuthor(e.target.value)}
                  type="text"
                  name="author-name"
                  id="author-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
                Genre
              </label>
              <div className="mt-1">
                <input
                  onChange={(e) => setBookGenre(e.target.value)}
                  type="text"
                  name="genre"
                  id="genre"
                  autoComplete="organization"
                  className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="founder" className="block text-sm font-medium text-gray-700">
                Founder or CEO
              </label>
              <div className="mt-1">
                <input
                  onChange={(e) => setFounder(e.target.value)}
                  type="text"
                  name="founder"
                  id="founder"
                  autoComplete="organization"
                  className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Send Book To DB
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        {apiRes?.map((book) => (
          <li key={book.id}>{book.bookTitle}</li>
        ))}
      </div>
    </div>
  )
}
