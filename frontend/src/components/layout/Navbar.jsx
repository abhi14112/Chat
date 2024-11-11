import React from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { axiosInstance } from '../../lib/axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const authUser = queryClient.getQueryData(["authUser"]);
  const { mutate: logoutMutation, isLoading } = useMutation({
    mutationFn: async () => {
      await axiosInstance.post("/auth/logout");
      return null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["authUser"],
      })
      toast.success("Logout Successfully");
    },
    onError: () => {
      toast.error("Error in logout");
    }
  })
  const hanldeLogout = () => {
    logoutMutation();
  }
  return (
    <div className='flex justify-between'>
      <p onClick={() => { navigate("/") }} className='text-2xl hover:bg-zinc-700 flex px-2 items-center justify-center rounded-md cursor-pointer font-bold '>Messenger</p>
      {
        authUser &&
        <div className='flex gap-2 items-center'>
          <p >Welcome, <span className='text-secondary text-xl font-semibold'> {authUser?.fullname}</span></p>
          <button onClick={hanldeLogout} className="btn bg-secondary text-black hover:text-secondary">Logout</button>
        </div>
      }
    </div>
  )
}
export default Navbar