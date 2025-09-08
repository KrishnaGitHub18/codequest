import React, { useState, useEffect } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import io from "socket.io-client";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";

const socket = io("http://localhost:8080"); 

function Compiler({data}) {

  console.log(data)
  const [code, setCode] = useState(`#include <iostream>\nusing namespace std;\nint main() {\n return 0;\n}`);
  const [res, setRes] = useState("waiting for result...");
  const [userInput, setUserInput] = useState("");

  const roomId = data?._id; 

  useEffect(() => {
    socket.emit("joinRoom", roomId);

    socket.on("codeUpdate", (newCode) => setCode(newCode));
    socket.on("inputUpdate", (input) => setUserInput(input));
    socket.on("output", (output) => setRes(output));

    return () => {
      socket.off("codeUpdate");
      socket.off("inputUpdate");
      socket.off("output");
    };
  }, []);

  const handleRunCode = () => {
    socket.emit("runCode", { roomId, code, stdin: userInput });
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    socket.emit("codeChange", { roomId, code: newCode });
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
    socket.emit("inputChange", { roomId, input: e.target.value });
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-white">
      <div className="p-4">
        <div className="relative border border-gray-700 rounded-lg shadow-md bg-[#242424] h-[60vh] overflow-auto">
          <Editor
            value={code}
            onValueChange={handleCodeChange}
            highlight={(code) =>
              highlight(code, languages.javascript, "javascript")
            }
            padding={12}
            style={{
              fontFamily: '"Fira Code", "Fira Mono", monospace',
              fontSize: 14,
              minHeight: "100%",
            }}
          />

          {/* button */}
          <button
            className="absolute bottom-3 right-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md shadow-md transition cursor-pointer"
            onClick={handleRunCode}
          >
            Run
          </button>
          <button
            className="absolute bottom-3 right-20 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md shadow-md transition cursor-pointer"
            onClick={handleRunCode}
          >
            Submit
          </button>
        </div>

        {/* input val */}
        <textarea
          rows="3"
          placeholder="Enter input (stdin)"
          value={userInput}
          onChange={handleInputChange}
          className="mt-3 w-full p-2 rounded-md bg-[#2a2a2a] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* res */}
      <div className="bg-black h-40 p-4 m-4 rounded-lg border border-gray-700 overflow-auto text-sm">
        <pre className="text-green-400 whitespace-pre-wrap">{res}</pre>
      </div>
    </div>
  );
}

export default Compiler;
