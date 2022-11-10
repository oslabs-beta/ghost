import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

const navigation = [
  { name: 'Docs', href: 'docs' },
]

export default function App() {
  return (
    <div className="relative overflow-hidden bg-[#353535]">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 bg-[#353535] pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
          <svg
            className="absolute inset-y-0 right-0 hidden h-full w-48 translate-x-1/2 transform text-[#2e2e2e] lg:block"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <Popover>
            <div className="relative px-4 pt-6 sm:px-6 lg:px-8">
              <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
                <div className="flex flex-shrink-0 flex-grow items-center lg:flex-grow-0">
                  <div className="flex w-full items-center justify-between md:w-auto">
                    <a href="#">
                      <span className="sr-only">Ghost</span>
                      <img
                        alt="Ghost logo"
                        className="h-8 w-auto sm:h-10 transition ease-in-out delay-50 hover:animate-[wiggle_1.5s_ease-in-out_infinite]"
                        src="https://i.postimg.cc/zf8ZDycV/ghost.png"
                      />
                    </a>
                    <div className="-mr-2 flex items-center md:hidden">
                      <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#cdcdcd]">
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                </div>
                <div className="hidden md:ml-10 md:block md:space-x-8 md:pr-4">
                  {navigation.map((item) => (
                    <Link key={item.name} to={item.href} className="font-medium text-[#cdcdcd] hover:text-[#9cb59d]">
                      {item.name}
                    </Link>
                  ))}
                  <a href="https://github.com/oslabs-beta/ghost/" className="font-medium text-[#cdcdcd] hover:text-[#9cb59d]">
                    GitHub
                  </a>
                  <a href="https://github.com/oslabs-beta/ghost/releases" className="font-medium text-[#9cb59d] hover:text-[#798f7a]">
                    Download
                  </a>
                </div>
              </nav>
            </div>

            <Transition
              as={Fragment}
              enter="duration-150 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                focus
                className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden"
              >
                <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
                  <div className="flex items-center justify-between px-5 pt-4">
                    <div>
                      <img
                        className="h-8 w-auto"
                        src="https://i.postimg.cc/zf8ZDycV/ghost.png"
                        alt=""
                      />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#cdcdcd]">
                        <span className="sr-only">Close main menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>

                  {/* MOBILE MENU CONTENTS */}
                  <div className="space-y-1 px-2 pt-2 pb-3">
                    {navigation.map((item) => (
                      <Link key={item.name} to={item.href} className="block rounded-md px-3 py-2 text-center font-medium text-gray-900 hover:bg-gray-50 hover:text-[#9cb59d]">
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <a
                    href="https://github.com/oslabs-beta/ghost"
                    className="block w-full px-5 py-3 text-center font-medium text-gray-900 hover:bg-gray-50 hover:text-[#9cb59d]"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://github.com/oslabs-beta/ghost"
                    className="block w-full bg-gray-50 px-5 py-3 text-center font-medium text-[#9cb59d] hover:bg-gray-100"
                  >
                    Download
                  </a>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="font-bold tracking-tight text-[#ffffff] sm:text-5xl md:text-6xl">
                <span className="bg-gradient-to-r from-gray-50 to-gray-500 font-bold bg-clip-text text-transparent text-7xl">ghost</span>
              </h1>
              <p className="mt-3 text-base text-[#ffffff] sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                An AWS Lambda metrics monitoring tool. 
                <br></br>
                <i>Accelerated by OS Labs as an Open-Source Project.</i>
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="#"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-[#9cb59d] px-8 py-3 text-base font-medium text-white hover:bg-[#798f7a] md:py-4 md:px-10 md:text-lg"
                  >
                    MacOS
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="#"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-[#bdbdbd] px-8 py-3 text-base font-medium text-[#ffffff] hover:bg-[#a6a6a6] md:py-4 md:px-10 md:text-lg"
                  >
                    Windows
                  </a>
                </div>
              </div>
            </div>
            
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full"
          src="https://i.postimg.cc/SybS1Pjg/Screen-Shot.png"
          alt="https://i.postimg.cc/XJr9HsVn/Screen-Shot-2022-11-03-at-3-30-24-PM.png"
        />
      </div>
    </div>
  )
}
