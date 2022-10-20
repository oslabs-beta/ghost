import * as React from 'react';
import * as ReactDOM from 'react-dom';

const LeftContainer =  ()  =>  {
  return (
    <div id='side-navigation-container' className="bg-slate-300 h-screen w-1/5 p-3 shadow-sm">
      <ul className="divide-y divide-slate-700 ...">
        <li className="py-3">Dashboard</li>
        <li className="py-3">Logs</li>
        <li className="py-3">Metrics</li>
      </ul>
    </div>
  )
}

export default LeftContainer;