import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import Error from './components/Error'
import Docs from './components/Docs'
import Demo from './components/Demo'

const router = createHashRouter([
  {
    path: "/",
    // element: <App key="app" />,
    errorElement: <Error />,
    children: [
      { path: "",
        element: <App /> },
      { path: "docs",
        element: <Docs /> },
      { path: "demo",
        element: <Demo /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
