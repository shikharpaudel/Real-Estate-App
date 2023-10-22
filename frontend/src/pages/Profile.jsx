import React, { useState, useRef, useEffect } from "react";

import { useSelector,useDispatch } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../Firebase";
import {updateUserStart,updateUserSuccess,updateUserFailure, deleteFailure, deleteStart, deleteSuccess, signOutStart, signOutFailure, signOutSuccess} from '../redux/user/userSlice.js'
const Profile = () => {
  const { currentUser,loading,error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [Files, setFiles] = useState(undefined);
  const [FilePerc, setFilePerc] = useState(0);
  const [fileError, setFileError] = useState(false);
  const [formData, setFormData] = useState({});
  const[updateSuccess,setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Files) {
      handleFileUpload(Files);
    }
  }, [Files]);
  const handleFileUpload = () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + Files.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, Files);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method:'POST',
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(formData),
      })
      const data = await res.json();
      if(data.success === false){
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteFailure(data.message));
        return;
      }
      dispatch(deleteSuccess(data));
    } catch (error) {
      dispatch(deleteFailure(error.message));
    }
  };
 const handleSignOut= async ()=>{
  try{
    dispatch(signOutStart());
    const res = await fetch('/api/auth/signout');
    const data = await res.json();
    if(data.success === false){
      dispatch(signOutFailure(data.message));
      
      return;
    }
    dispatch(signOutSuccess(data));
  }catch(error){
    dispatch(signOutFailure(error.message));
    
  }
 
 }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e) => {
            setFiles(e.target.files[0]);
          }}
          ref={fileRef}
          accept="image/*"
          hidden
        />
        <img
          onClick={() => {
            fileRef.current.click();
          }}
          src={formData.avatar || currentUser.avatar}
          alt="profile pic"
          className="h-24 w-24 object-cover self-center mt-2 rounded-full cursor-pointer"
        />
        <p className="text-sm  self-center">
          {fileError ? (
            <span className="text-red-700">
              Error Image Upload(File Must Be Less Than 2 MegaByte)
            </span>
          ) : FilePerc > 0 && FilePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${FilePerc} %`}</span>
          ) : FilePerc === 100 ? (
            <span className="text-green-600">Image Successfully Uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          id="username"
          defaultValue={currentUser.username}
          placeholder="username"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="text"
          id="email"
          defaultValue={currentUser.email}
          placeholder="email"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button disabled = {loading} className="bg-slate-700 text-[#fff] uppercase p-3 rounded-lg hover:opacity-95 disabled:opacity-85">
          {loading ? "Loading..." : "Update"}
        </button>
        <button className="bg-green-700 text-[#fff] uppercase p-3 rounded-lg hover:opacity-95">
          Create Listing
        </button>
      </form>
      <div className="flex flex-row justify-between p-2">
        <span  className="text-red-700 cursor-pointer" onClick = {handleDeleteUser}>Delete Account</span>
        <span className="text-red-700 cursor-pointer" onClick={handleSignOut}>Sign Out</span>
        
      </div>
      <p className="text-red-700 mt-3">{error ? error : ''}</p>
      <p className="text-green-700 mt-3">{updateSuccess ? "User Updated Successfully!" : ""}</p>
    </div>
  );
};

export default Profile;
