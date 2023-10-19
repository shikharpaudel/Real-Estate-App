import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import {app} from '../Firebase.jsx';
import { signInSuccess } from '../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
const Oauth =  () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClick =async()=>{
        try{
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app)
            const result = await signInWithPopup(auth,provider);
  const res = await fetch('/api/auth/google',{
    method:'POST',
    headers:{
        'content-type':'application/json'
    },
    body:JSON.stringify({name:result.user.displayName,email:result.user.email,photo:result.user.photoURL})
  });
  const data = await res.json();
  dispatch(signInSuccess(data));
  navigate('/');
        }catch(error){
            console.log("can not continue with google",error);
        }
    }
  return (
    <button className='bg-red-700 text-[#fff] p-3 rounded-lg uppercase hover:opacity-95' type = "button" onClick = {handleClick}>Continue with Google</button>
  )
}

export default Oauth;