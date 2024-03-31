import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {v4} from 'uuid'
import TextEditor from './Components/TextEditor.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import Login from './Components/Login.jsx'
import ProtectedRoute from './Components/ProtectedRoute.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
 
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute><App/></ProtectedRoute>
  },
  {
    path: '/documents/:id',
    element: <ProtectedRoute><TextEditor/></ProtectedRoute>
  },
  {
    path: '/login',
    element : <Login/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <RouterProvider router={router}/>
    </ClerkProvider>
   </React.StrictMode>,
)
