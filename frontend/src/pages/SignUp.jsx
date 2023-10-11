import React from 'react'
import { Link } from 'react-router-dom'
const SignUp = () => {
  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl font-semibold text-center my-7'>Sign Up</h1>
    <form className='flex flex-col gap-4'>
    <input type = "text" id = "username" name = "username" placeholder='Username' className='border p-3 rounded-lg' />
    <input type = "email" id = "email" name = "email" placeholder='Email' className='border p-3 rounded-lg' />
    <input type = "password" id = "password" name = "password" placeholder='Password' className='border p-3 rounded-lg'/>
    <button className='bg-slate-700 p-3 text-white uppercase rounded-lg hover:opacity-95 disabled:opacity-80'>Sign Up</button>
    </form>
    <div className='flex flex-row mt-5 gap-2'>
    <p>Have an account?</p>
    <Link to = "/sign-In"> <span className='text-blue-700'>Sign In</span></Link>
   
    </div>
    </div>
  )
}

export default SignUp