import React from "react";
import Tag from "../minor/tag";

function Description({ data, res }) {
  return (
    <div className="flex flex-col m-5 p-5 gap-5">
      <p className="text-[25px] font-semibold">{data?.title}</p>
      <div className="flex gap-3 flex-wrap">
        {[{title:"Easy"},{title:"Topics"},{title:"Companies"},{title:"Hint"}].map((item, index) => (
           <Tag data={{ title: item?.title, color: "#1b711bff" }} />
        ))}
      </div>
      <p className="mt-3 leading-relaxed">{data?.que}</p>
      <div className="space-y-2">
        {data?.testcases?.map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap items-center gap-2 bg-[#1e1e1e] p-3 rounded-md border border-gray-700"
          >
            <p className="text-blue-400">Input:</p>
            <p>[ {item.input?.join(", ")} ]</p>
            <p className="text-purple-400">Output:</p>
            <p>{item?.output}</p>
          </div>
        ))}
      </div>
      <div className="bg-[#1e1e1e] h-40 p-4 rounded-lg border border-gray-700 overflow-auto text-sm">
        <pre className="text-green-400 whitespace-pre-wrap">{res}</pre>
      </div>
    </div>
  );
}

export default Description;
