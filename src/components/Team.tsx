import BackToTop from "./BackToTop"

const unsortedPeople = [
  {
    name: `Tim Kang`,
    role: 'Software Engineer',
    imageUrl:
      'https://i.postimg.cc/nLbpRygJ/shaggy.png',
    githubUrl: 'https://github.com/tkang611',
    linkedinUrl: 'https://www.linkedin.com/in/tkkang/',
  },
  {
    name: `Lisa Tian`,
    role: 'Software Engineer',
    imageUrl:
      'https://i.postimg.cc/Vv0xSmmZ/scoobs.png',
    githubUrl: 'https://github.com/lisatiann',
    linkedinUrl: 'https://www.linkedin.com/in/lisatian-/',
  },
  {
    name: `Tracy Chang`,
    role: 'Software Engineer',
    imageUrl:
      'https://i.postimg.cc/hPDrxhGF/daph.jpg',
    githubUrl: 'https://github.com/tracycchang',
    linkedinUrl: 'https://www.linkedin.com/in/tracycchang/',
  },
  {
    name: `Akash Patel`,
    role: 'Software Engineer',
    imageUrl:
      'https://i.postimg.cc/VNk16vDL/fred.png',
    githubUrl: 'https://github.com/akashpatel1198',
    linkedinUrl: 'https://www.linkedin.com/in/akashpatel1198/',
  },
  {
    name: `Krisette Odegard`,
    role: 'Software Engineer',
    imageUrl:
      'https://i.postimg.cc/1Rg5JrYs/velma.jpg',
    githubUrl: 'https://github.com/krisette',
    linkedinUrl: 'https://www.linkedin.com/in/krisette/',
  }
]

const people = unsortedPeople.sort(() => Math.random() - 0.5)

export default function Team() {
  return (
    <div className="bg-[#353535]">
      <div className="mx-auto max-w-7xl pt-24 pb-1 px-4 text-center sm:px-6 lg:px-8 lg:pt-24">
        <div className="space-y-12">
          <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
            <h2 className="text-3xl text-[#ffffff] font-bold tracking-tight sm:text-4xl">Connect with the team</h2>
          </div>
          <ul
            role="list"
            className="mx-auto space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:max-w-auto lg:grid-cols-5"
          >
            {people.map((person) => (
              <li key={person.name}>
                <div className="space-y-6">
                  <img className="mx-auto h-40 w-40 rounded-full xl:h-50 xl:w-50" src={person.imageUrl} alt="" />
                  <div className="space-y-2">
                    <div className="space-y-1 text-lg text-[#ffffff] font-medium leading-6">
                      <h3>{person.name}</h3>
                      <p className="text-[#9cb59d]">{person.role}</p>
                    </div>
                    <ul role="list" className="flex justify-center space-x-5">
                      <li>
                        <a href={person.githubUrl} className="text-[#b3b3b3] hover:text-[#9cb59d]">
                          <span className="sr-only">GitHub</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                        </svg>
                        </a>
                      </li>
                      <li>
                        <a href={person.linkedinUrl} className="text-[#b3b3b3] hover:text-[#9cb59d]">
                          <span className="sr-only">LinkedIn</span>
                          <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <BackToTop />

        </div>
      </div>
    </div>
  )
}
