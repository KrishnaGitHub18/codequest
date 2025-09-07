import React from "react";
import Tag from "../minor/tag";

function Description({ data }) {
  return (
    <div className="border-1 border-white flex flex-col m-5 p-5 gap-5">
      <p className="text-[25px]">{data?.title}</p>
      <div className="flex gap-3">
        <Tag data={{ title: "Easy", color: "#1b711bff" }} />
        <Tag data={{ title: "Topics", color: "#1b711bff" }} />
        <Tag data={{ title: "Companies", color: "#1b711bff" }} />
        <Tag data={{ title: "Hint", color: "#1b711bff" }} />
      </div>
      <p className="mt-5">{data?.que}</p>
      {data?.testcases?.map((item, index) => (
        <div key={index} className="flex">
          <p>Input - [ </p>
          {item.input?.map((val, idx) => (
            <p key={idx}>{val}, </p>
          ))}
          <p> ]</p>
          <p>Output - {item?.output}</p>
        </div>
      ))}
    </div>
  );
}

export default Description;
