import React from 'react'
import NavBar from './NavBar'
import { useRouteError } from 'react-router-dom'

// const error = useRouteError();

export default function Error() {
  return (
    <>
      <NavBar />
      <main
        className="min-h-screen bg-[#686868]"
      >
        <div className="flex flex-col items-center mx-auto max-w-7xl px-4 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-2">Uh oh! Something unexpected occurred.</h1>
          <img src='https://i.postimg.cc/gcKrtv1H/ghost.png' alt='ghost picture' className='animate-[wiggle_2s_ease-in-out_infinite]' />
          <p className="mt-2 text-lg font-medium text-black text-opacity-50">
            It looks like a ghost has taken over this page.
          </p>
          <div className="mt-6">
            <a
              href="/"
              className="inline-flex items-center rounded-md border border-transparent bg-white bg-opacity-75 px-4 py-2 text-sm font-medium text-black text-opacity-75 sm:bg-opacity-25 sm:hover:bg-opacity-50"
            >
              Go back home
            </a>
          </div>
        </div>
      </main>
    </>
  )
}
