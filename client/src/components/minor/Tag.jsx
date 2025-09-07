import React from "react";

function Tag({ data }) {
  return (
    <span
      className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white shadow-sm hover:shadow-md transition duration-200 truncate"
      style={{
        backgroundColor: data?.color || "#374151",
        maxWidth: "fit-content",
      }}
      title={data?.title}
    >
      {data?.title}
    </span>
  );
}

export default Tag;
