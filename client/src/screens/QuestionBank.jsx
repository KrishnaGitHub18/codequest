import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function QuestionBank() {
  const navigate = useNavigate();

  const [que, setQue] = useState([]);
  const fetchData = async () => {
    const data = await axios.get(`${import.meta.env.VITE_API_URL}/api/que`);
    setQue(data?.data);
    console.log(data.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col py-5 px-5 gap-5">
      {que &&
        que.map((q, index) => (
          <div
            key={index}
            className="px-8 py-3 border-1 border-[#F3E5AB] rounded-lg"
            onClick={() => {navigate("/question", { state: q })}}
          >
            {index + 1}. {q?.title}
          </div>
        ))}
    </div>
  );
}

export default QuestionBank;
