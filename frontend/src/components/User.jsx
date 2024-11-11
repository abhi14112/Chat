import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const User = ({ data, active, newMessage, setNewMessage }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    return (
        <div
            onClick={() => {
                setNewMessage({});
                navigate(`/${data._id}`);
            }}
            className={`flex gap-6 border-b hover:bg-zinc-700 ${id == data._id ? "bg-zinc-700" : "bg-primary"
                }  px-4 py-2 rounded-md cursor-pointer `}
        >
            <div>
                <div className={`avatar ${active.includes(data._id) ? "online" : ""}`}>
                    <div className="w-16 rounded-full">
                        <img src={data.profilePicture} />
                    </div>
                </div>
            </div>
            <div className="flex gap-2 justify-between w-full items-center">
                <div className="font-semibold text-xl">{data.fullname}</div>
                {
                    newMessage.senderId == data._id &&
                    <div>New Message</div>
                }
            </div>
        </div>
    );
};
export default User;
