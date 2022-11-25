import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { toast } from "react-toastify";

const Votes = ({ total }) => {
  return (
    <>
      <div className="bg-gray-100 h-10 flex items-center justify-center space-x-1 min-w-[60px] rounded-tl-2xl rounded-bl-2xl disabled">
        <p className="text-sm flex items-center">{total?.totalUpvote}</p>
        <div className="p-[2px] rounded-full">
          <BiUpvote />
        </div>
      </div>
      <div className="bg-gray-100 h-10 flex justify-center space-x-1 items-center min-w-[60px] rounded-tr-2xl rounded-br-2xl disabled">
        <div className="p-[2px] rounded-full">
          <BiDownvote />
        </div>
        <p className="text-sm flex items-center">{total?.totalDownvote}</p>
      </div>
    </>
  );
};

export default Votes;
