import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { UserProfile } from '../components/UserProfile'
import { SignIn } from '../components/Signin'
import { SignUp } from '../components/Signup'

export default function AllRoutes() {
  return (
    <>
    <Routes>
     
        <Route path='/register' element={<SignUp/>}/>
        <Route path='/' element={<SignIn/>}/>
        <Route path="/profile/:id" element={<UserProfile/>}/>
        
    </Routes>
    </>
  )
}
