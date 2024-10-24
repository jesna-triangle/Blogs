import React from 'react'
import './App.css'
import IndexLayout from './layouts/IndexLayout'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'
import HomePage from './Pages/Home'
import Following from './pages/Following'
import BlogPage from './Pages/Blogpage'
import LoginPage from './pages/Loginpage'
import SignupPage from './pages/SignupPage'
import Authlayout from './layouts/Authlayout'
import CreatePostPage from './pages/Createpostpage'
import UsersPage from './pages/Userspage'
import { AuthProvider } from './contexts/Authcontext'
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<IndexLayout />}>
        <Route index element={<HomePage />} />
        <Route path='following' element={<Following />} />
        <Route path='blog' element={<BlogPage />} />
        <Route path='post' element={<CreatePostPage />} />
        <Route path='user' element={<UsersPage />} />
        
        
      </Route>
      <Route path="register" element={<Authlayout />}>
        <Route index element={<SignupPage />} />
        <Route path='login' element={<LoginPage />} />

      </Route></>
  )
)

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App