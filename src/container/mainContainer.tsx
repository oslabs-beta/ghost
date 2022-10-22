import * as React from 'react'
import FunctionDetails from '../components/FunctionDetails'


const MainContainer = () => {
  return (
    <div className="bg-[#EBEBEB] h-screen w-screen px-4/5">
      <h1 className="text-7xl p-4 text-center font-bold bg-gradient-to-r from-rose-400 to-blue-300 bg-clip-text text-transparent hover:animate-spin animate-bounce">Raw Dogs</h1>
        <FunctionDetails />
    </div>
  )
}

export default MainContainer;