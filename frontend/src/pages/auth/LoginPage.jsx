import React, { useState } from 'react'
import { Link } from "react-router-dom"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios.js";
import { toast } from "react-hot-toast";
import { Loader } from "lucide-react";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPasswrod] = useState("");

  const { mutate: loginMutation, isLoading } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/auth/login", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Login Successfully");
      queryClient.invalidateQueries({
        queryKey: ["authUser"]
      });
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Something went went wrong");
    }
  });
  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation({ email, password });
  }

  const queryClient = useQueryClient();
  if (isLoading) {
    return <Loader />
  }
  return (
    <div className='flex flex-col items-center py-8 overflow-hidden'>
      <p className='text-3xl text-center mb-8'>Sign In Here</p>
      <form onSubmit={handleLogin} autoComplete='off' className='flex flex-col gap-2'>
        <label className="input input-bordered bg-transparent flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 text-accent w-4 opacity-70">
            <path
              d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path
              d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" className="grow" placeholder="Email" />
        </label>
        <label className="input input-bordered flex items-center gap-2 bg-transparent">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 text-accent opacity-70">
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd" />
          </svg>
          <input onChange={(e) => setPasswrod(e.target.value)} value={password} type="password" placeholder='Password' className="grow" />
        </label>
        <button type='submit' className="btn text-secondary font-semibold text-xl btn-accent">Sign In</button>
      </form>
      <div>New User? <Link className='text-accent hover:underline' to="/signup">Register now</Link></div>
    </div>
  )
}

export default LoginPage