import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useRef, useEffect } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Socket } from "socket.io-client";
const RightSideBar = () => {
    const [message, setMessage] = useState("");
    const { id } = useParams();

    const { mutate: messageMutation, isLoading } = useMutation({
        mutationFn: async (data) => {
            await axiosInstance.post(`/message/send/${id}`, data);
        },
        onSuccess: () => {
            toast.success("Message Sent successfully");
            refetch();
        },
        onError: () => {
            toast.error("Error sending message");
        },
    });
    const { data: messages, isLoading: readLoading, refetch } = useQuery({
        queryKey: ["chatMessages", id],
        queryFn: async () => {
            try {
                if (id) {
                    const res = await axiosInstance.get(`/message/${id}`);
                    console.log(res.data);
                    return res.data;
                } else {
                    return [];
                }
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    return [];
                }
            }
            return [];
        },
        enabled: !!id,
    });

    const chatContainerRef = useRef(null);
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop =
                chatContainerRef.current.scrollHeight + 500;
        }
    }, [messages]);
    if (!id) {
        return (
            <div className="w-full h-full font-semibold overflow-hidden text-accent text-6xl items-center justify-center flex ">
                Start Messaging
            </div>
        );
    }
    const handleMessage = () => {
        messageMutation({ message });
        setMessage("");
    };
    return (
        <div className="h-[550px] relative w-full">
            <div
                ref={chatContainerRef}
                className="h-[80%] overflow-y-scroll px-4 py-6"
            >
                {messages?.map((item, index) => {
                    return (

                        <div key={index} className={`chat ${item.senderId == id ? "chat-start" : "chat-end"}`}>
                            <div className={`chat-bubble chat-bubble-secondary ${item.senderId == id ? "chat-bubble-secondary" : "chat-bubble-accent"} `}>
                                {item.message}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="absolute bottom-0 flex px-12 gap-2 w-full">
                <div className="flex-1">
                    <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        type="text"
                        placeholder="Type here"
                        className="input bg-transparent text-secondary outline-none border-secondary active:border-none border-[1px] w-full"
                    />
                </div>
                <div>
                    <button onClick={handleMessage} className="btn w-[150px] btn-accent">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};
export default RightSideBar;
