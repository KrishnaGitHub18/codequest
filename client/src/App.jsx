import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./screens/Home";
import QuestionBank from "./screens/QuestionBank";
import Question from "./screens/Question";
import Signin from "./screens/Signin";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<QuestionBank />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/question" element={<Question />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
