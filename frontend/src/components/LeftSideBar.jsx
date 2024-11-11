import React, { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import User from "./User";
const LeftSideBar = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const authUser = queryClient.getQueryData(["authUser"]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [newMessage, setNewMessage] = useState({});
  const socket = useMemo(
    () =>
      io("http://localhost:3000", {
        query: { userId: authUser._id },
      }),
    []
  );
  useEffect(() => {
    socket.on("getOnlineUsers", (data) => {
      setActiveUsers(data);
    })
    socket.on("newMessage", (data) => {
      queryClient.invalidateQueries(["chatMessages", id])
      setNewMessage(data);
    })
    return () => {
      socket.disconnect();
    }
  }, [])
  const { data: users, isLoading } = useQuery({
    queryKey: ["Users"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/users");
        return res.data;
      } catch (error) {
        toast.error("Error while getting users");
      }
    },
  });
  if (isLoading) return null;
  return (
    <div className="h-[550px] bg-primary overflow-y-scroll">
      {users.map((user, index) => {
        return <User key={index} data={user} newMessage={newMessage} active={activeUsers} setNewMessage={setNewMessage} />;
      })}
    </div>
  );
};

export default LeftSideBar;
