import * as React from 'react'
import FunctionDetails from '../components/FunctionDetails'
import GraphComponent from '../components/GraphComponent'


const MainContainer = () => {
  return (
    <div className="bg-[#EBEBEB] min-h-screen w-screen px-4/5">
      <h1 className="text-7xl p-4 font-bold bg-gradient-to-r from-rose-400 to-blue-300 bg-clip-text text-transparent hover:animate-spin animate-bounce">Raw Dogs</h1>
        <FunctionDetails />
        <GraphComponent />

    </div>
  )
}

export default MainContainer;