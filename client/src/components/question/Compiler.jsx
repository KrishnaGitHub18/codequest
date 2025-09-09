import React, { useState, useEffect } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import io from "socket.io-client";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import VoiceChat from "../minor/VoiceChat";

// const socket = io("http://localhost:8080");
const socket = io(import.meta.env.VITE_API_URL);

function Compiler({ data, setRes }) {
  const [code, setCode] = useState(
    `#include <iostream>\nusing namespace std;\nint main() {\n return 0;\n}`
  );
  // const [res, setRes] = useState("waiting for result...");
  const [userInput, setUserInput] = useState("");
  const [roomId, setRoomId] = useState(null);
  const [customRoomId, setCustomRoomId] = useState("");



  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const userId = storedUser ? JSON.parse(storedUser)?.id : null;
    const finalId = userId && data?._id ? `${userId}${data._id}` : null;
    setRoomId(finalId);
    console.log("Generated roomId:", finalId);
  }, [data]);

  useEffect(() => {
    if (!roomId) return;
    socket.emit("joinRoom", roomId);
    socket.on("codeUpdate", (newCode) => setCode(newCode));
    socket.on("inputUpdate", (input) => setUserInput(input));
    socket.on("output", (output) => setRes(output));
    return () => {
      socket.off("codeUpdate");
      socket.off("inputUpdate");
      socket.off("output");
    };
  }, [roomId]);




  const handleRunCode = () => {
    if (!roomId) return;
    socket.emit("runCode", { roomId, code, stdin: userInput });
  };
  const handleCodeChange = (newCode) => {
    setCode(newCode);
    if (roomId) socket.emit("codeChange", { roomId, code: newCode });
  };
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
    if (roomId) socket.emit("inputChange", { roomId, input: e.target.value });
  };
  const handleJoinCustomRoom = () => {
    if (!customRoomId || !data?._id){ 
      alert('login or que data is missing');
      return;}
    if (!customRoomId.endsWith(data._id)){ 
      alert('that room is working on different que');
      return;
    }
    alert('Welcome to the arena')
    setRoomId(customRoomId);
  };



  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-white">
      <div className="p-4 space-y-3">
        <div className="p-3 bg-[#2a2a2a] rounded-md border border-gray-600">

          <VoiceChat roomId={roomId} />

          <p className="mb-2">
            <span className="font-bold text-blue-400">Your Room ID:</span>{" "}
            {roomId || "Not generated"}
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Join room via room id"
              value={customRoomId}
              onChange={(e) => setCustomRoomId(e.target.value)}
              className="flex-1 p-2 rounded-md bg-[#1e1e1e] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleJoinCustomRoom}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium"
            >
              Join Room
            </button>
          </div>
        </div>
        <div className="relative border border-gray-700 rounded-lg shadow-md bg-[#242424] h-[60vh] overflow-auto">
          <Editor
            value={code}
            onValueChange={handleCodeChange}
            highlight={(code) => highlight(code, languages.clike, "clike")}
            padding={12}
            style={{
              fontFamily: '"Fira Code", "Fira Mono", monospace',
              fontSize: 14,
              minHeight: "100%",
            }}
          />
          <button
            className="absolute bottom-3 right-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md shadow-md transition cursor-pointer"
            onClick={handleRunCode}
          >
            Run
          </button>
          <button
            className="absolute bottom-3 right-20 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-md shadow-md transition cursor-pointer"
            onClick={handleRunCode}
          >
            Submit
          </button>
        </div>
        <textarea
          rows="3"
          placeholder="Enter input (stdin)"
          value={userInput}
          onChange={handleInputChange}
          className="w-full p-2 rounded-md bg-[#2a2a2a] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Output */}
      {/* <div className="bg-black h-40 p-4 m-4 rounded-lg border border-gray-700 overflow-auto text-sm">
        <pre className="text-green-400 whitespace-pre-wrap">{res}</pre>
      </div> */}
    </div>
  );
}

export default Compiler;
