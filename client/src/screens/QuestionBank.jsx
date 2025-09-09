import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function QuestionBank() {
  const navigate = useNavigate();

  const [que, setQue] = useState([]);

  const fetchData = async () => {
    try {
      const data = await axios.get(`${import.meta.env.VITE_API_URL}/api/que`, {
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      setQue(data?.data);
      console.log(data.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        navigate("/signin");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col py-8 px-6 gap-6 max-w-3xl mx-auto text-gray-200">
      <h1 className="text-3xl font-bold text-center text-gray-100 mb-4">
        🌓 Question Bank
      </h1>

      <div className="flex flex-col gap-4">
        {que &&
          que.map((q, index) => (
            <div
              key={index}
              className="px-6 py-4 border border-gray-700 bg-gradient-to-r from-[#1e1e2f] to-[#2a2a40] rounded-xl shadow-lg hover:shadow-xl hover:border-indigo-400 hover:scale-[1.01] transition-all duration-200 cursor-pointer"
              onClick={() => {
                navigate("/question", { state: q });
              }}
            >
              <p className="text-lg font-medium text-gray-100">
                {index + 1}. {q?.title}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default QuestionBank;
