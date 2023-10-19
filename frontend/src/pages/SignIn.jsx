import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure,signInStart,signInSuccess } from "../redux/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import Oauth from "../components/oAuth";
const SignIn = () => {
  const[formData,setFormData] = useState({});
  const {loading,error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
   
     setFormData({
      ...formData,
      [e.target.id]:e.target.value,
     })
     console.log(formData);
  };
  const handleSubmit = async (e) => {
  e.preventDefault();
  try{
dispatch(signInStart());
  const res = await fetch('/api/auth/signIn',{
    method:"POST",
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(formData),
    }
  );
  const data = await res.json();
  console.log(data);
  if(data.success === false){
   dispatch(signInFailure(data.message));
    return;
  }
  dispatch(signInSuccess(data));
  navigate('/')
}catch(error){
dispatch(signInFailure(error.message));
}

  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button disabled = {loading} className="bg-slate-700 p-3 text-white uppercase rounded-lg hover:opacity-95 disabled:opacity-80">
        {loading ? "Loading..." : "Sign In"}
          </button>
          <Oauth />
      </form>
      <div className="flex flex-row mt-5 gap-2">
        <p>Dont Have an account?</p>
        <Link to="/sign-Up">
          
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default SignIn;
