import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

import LiveSession from './LiveSession.jsx'
import PostAnalysis from './PostAnalysis.jsx'
import Test from './Test.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/"element={<Outlet/>}>
      <Route path="" element={<LiveSession />} />
      <Route path="/post" element={<PostAnalysis />} />
      <Route path="/test" element={<Test />} />
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
