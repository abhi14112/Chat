import React from 'react'
import Layout from "./components/layout/Layout";
import LoginPage from "./pages/auth/LoginPage"
import SignUpPage from "./pages/auth/SignUpPage.jsx"
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home.jsx';
import { Navigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";

import { axiosInstance } from "./lib/axios.js";

import { useQuery } from "@tanstack/react-query";
const App = () => {

  const { data: authUser, isLoading
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/auth/me");
        return res.data;
      } catch (err) {
        if (err.response && err.response.status === 401) {
          return null;
        }
        toast.error("Something went wrong");
      }
    },
  })
  if (isLoading) return null;
  return (
    <Layout>
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />}></Route>
        <Route path='/:id' element={authUser ? <Home /> : <Navigate to={"/login"} />}></Route>
        <Route path='/login' element={authUser ? <Navigate to={"/"} /> : <LoginPage />}></Route>
        <Route path='/signup' element={authUser ? <Navigate to={"/"} /> : <SignUpPage />}></Route>
      </Routes>
      <Toaster />
    </Layout>
  )
}
export default App