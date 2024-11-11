import React, { useEffect, useState } from "react";
import LeftSideBar from "../components/LeftSideBar";
import RightSideBar from "../components/RightSideBar";
import { useParams } from "react-router-dom";

const Home = () => {
  const { id } = useParams();

  useEffect(() => {
    // Add any side effect code here if needed
  }, [id]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div className={`border-x-neutral border-x col-span-1 ${id ? "hidden sm:block" : "block"}`}>
        <LeftSideBar />
      </div>

      {id && (
        <div className="block sm:block md:col-span-1 lg:col-span-2">
          <RightSideBar />
        </div>
      )}
    </div>
  );
};

export default Home;
