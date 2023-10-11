import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
const SignUp = () => {
  const[formData,setFormData] = useState({});
  const[loading,setLoading] = useState(false);
  const [error,setError] = useState(null);
  const navigate = useNavigate();
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
  setLoading(true);
  const res = await fetch('/api/auth/signUp',{
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
    setLoading(false);
    setError(data.message);
    return;
  }
  setLoading(false);
  setError(null);
  navigate('/sign-up')
}catch(error){
setLoading(false);
setError(error.message);
}

  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
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
        {loading ? "Loading..." : "Sign Up"}
          </button>
      </form>
      <div className="flex flex-row mt-5 gap-2">
        <p>Have an account?</p>
        <Link to="/sign-In">
          
          <span className="text-blue-700">Sign In</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default SignUp;
