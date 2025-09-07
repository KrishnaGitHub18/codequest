import React from "react";
import Description from "../components/question/Description";
import { useLocation } from "react-router-dom";
import Compiler from "../components/question/Compiler";

function Question() {
  const location = useLocation();
  const data = location?.state;
  console.log(data);
  return (
    <div className="flex w-full">
      <div className="w-[50%]">
        <Description data={data} />
      </div>
      <div className="w-[50%]">
        <Compiler />
      </div>
    </div>
  );
}

export default Question;
