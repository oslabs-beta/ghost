import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}


export default function Example() {
  return (
    <Disclosure as="nav" className="bg-[#353535] fixed w-full">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-4 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex items-center px-2 lg:px-0">
                {/* GHOST LOGO TOP LEFT */}
                <div className="flex-shrink-0">
                  <img
                    className="block h-8 w-auto lg:hidden hover:animate-[wiggle_1.5s_ease-in-out_infinite]"
                    src="https://i.postimg.cc/zf8ZDycV/ghost.png"
                    alt="ghost"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block hover:animate-[wiggle_1.5s_ease-in-out_infinite]"
                    src="https://i.postimg.cc/zf8ZDycV/ghost.png"
                    alt="ghost"
                  />
                </div>

                {/* NORMAL WINDOW NAV BAR */}
                <div className="flex space-x-4 pl-3">                    
                  <Link to="/" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-[#9cb59d] hover:text-white">
                    Home
                  </Link>
                  <Link
                    to="/docs"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-[#9cb59d] hover:text-white"
                  >
                    Docs
                  </Link>
                  <Link
                    to="#"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-[#9cb59d] hover:text-white"
                  >
                    Blog
                  </Link>
                  <a
                    href="https://github.com/oslabs-beta/ghost"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-[#9cb59d] hover:text-white"
                  >
                    GitHub
                  </a>
                </div>
              </div>

              {/* DOWNLOAD BUTTON ON TOP RIGHT */}
              <div className="flex items-center">
                <a href="https://github.com/oslabs-beta/ghost/releases">
                <button
                  type="button"
                  className="rounded-md bg-[#9cb59d] px-3 py-2 text-sm font-medium text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2  hover:bg-[#798f7a]"
                >
                  Download
                </button>
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  )
}
