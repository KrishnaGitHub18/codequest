import React from "react";
import Description from "../components/question/Description";
import { useLocation } from "react-router-dom";
import Compiler from "../components/question/Compiler";

function Question() {
  const location = useLocation();
  const data = location?.state;
  console.log(data);
  return (
    <div className="flex w-full p-5 gap-5 bg-black">
      <div className="w-[50%] h-[90vh] border-1 border-white rounded-lg bg-[#242424]">
        <Description data={data} />
      </div>
      <div className="w-[50%] h-[90vh] border-1 border-white rounded-lg bg-[#242424]">
        <Compiler />
      </div>
    </div>
  );
}

export default Question;
