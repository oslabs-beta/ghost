import React, { useState } from 'react'
import NavBar from './NavBar';
import Footer from './Footer';

export default function Demo() {
  const [successful53, setSuccessful53] = useState(false);
  const [successful54, setSuccessful54] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (url: string, cohort: string) => {
    setSuccessful53(false);
    setSuccessful54(false);
    setError(false);
    fetch(url)
      .then((data) => {
        console.log('Success:', data);
        if (cohort === '53') {
          setSuccessful53(true);
        }
        if (cohort === '54') {
          setSuccessful54(true);
        }
      })
      .catch(err => {
        console.log('the error in fetch to api endpoint was', err);
        setError(true);
      })
  }

  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center bg-[#686868] pt-[150px] h-screen ">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Spam click the button for your cohort below!</h1>
        <br />
        <div>
          <img
          src="https://media.tenor.com/7gUwUBvlgqAAAAAC/red-button-spam.gif"
          className="rounded-md shadow-lg"
          alt="animated image of someone spam pressing a button" />
        </div>
        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
          <div className="rounded-md shadow ">
            <button
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-[#9cb59d] px-8 py-3 text-base font-medium text-white hover:bg-[#798f7a] active:bg-[#697B69] md:py-4 md:px-10 md:text-lg"
              onClick={() => {handleSubmit('https://fwcm57xm49.execute-api.us-west-1.amazonaws.com/default/53Test', '53')}}
            >
              WCRI 53
            </button>
          </div>
          <div className="mt-3 sm:mt-0 sm:ml-3">
            <button
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-[#bdbdbd] px-8 py-3 text-base font-medium text-[#ffffff] hover:bg-[#a6a6a6] active:bg-[#3A3B3C] md:py-4 md:px-10 md:text-lg"
              onClick={() => {handleSubmit('https://gt48vx4fef.execute-api.us-west-1.amazonaws.com/default/54Test', '54')}}
            >
              WCRI 54
            </button>
          </div>
        </div>
        <div className="mt-8 sm:mt-0 sm:ml-3">
        {successful53 ? <p className="text-white">Lambda pinged successfully for <strong>Cohort 53</strong>!</p> : null}
        {successful54 ? <p className="text-white">Lambda pinged successfully for <strong>Cohort 54</strong>!</p> : null}
        {error ? <p className="text-white">There was an error pinging Lambda. Please try again.</p> : null}
        </div>
      </div>
      <Footer />
    </div>
  )
}