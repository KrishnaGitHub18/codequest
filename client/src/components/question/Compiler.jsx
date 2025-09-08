import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import axios from "axios";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";

function Compiler() {
  const [code, setCode] = useState(`#include <iostream>\nusing namespace std;\nint main() {\n  int n;\n  cin >> n;\n  cout << n << endl;\n  return 0;\n}`);
  const [res, setRes] = useState("waiting for result...");
  const [userInput, setUserInput] = useState(""); 

  const handleRunCode = async () => {
    try {
      const data = {
        language_id: 14, 
        source_code: code,
        stdin: userInput,
      };

      const result = await axios.post("http://localhost:8080/api/run", data);
      setRes(result?.data?.stdout || result?.data?.stderr || "No output");
      console.log("Run Result:", result.data);
    } catch (error) {
      console.error("Error running code:", error);
      setRes("Error running code!");
    }
  };

  const handleSubmitCode = () => {};

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-white">

      <div className="p-4">
        <div className="relative border border-gray-700 rounded-lg shadow-md bg-[#242424] h-[60vh] overflow-auto">
          <Editor
            value={code}
            onValueChange={(newCode) => setCode(newCode)}
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

          {/* buttons*/}
          <button
            className="absolute bottom-3 right-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md shadow-md transition cursor-pointer"
            onClick={handleRunCode}
          >
            Run
          </button>
          <button
            className="absolute bottom-3 right-20 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md shadow-md transition cursor-pointer"
            onClick={handleSubmitCode}
          >
            Submit
          </button>
        </div>

        {/* input val*/}
        <input
          type="text"
          placeholder="Enter input (stdin)"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="mt-3 w-full p-2 rounded-md bg-[#2a2a2a] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Output Console */}
      <div className="bg-black h-40 p-4 m-4 rounded-lg border border-gray-700 overflow-auto text-sm">
        <pre className="text-green-400 whitespace-pre-wrap">{res}</pre>
      </div>
    </div>
  );
}

export default Compiler;
