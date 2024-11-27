import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Codeforces from "./components/Codeforces";
import Leetcode from "./components/LeetCode";
import HackerRank from "./components/HackerRank";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/CodeLogsZ/" element={<Codeforces />} />
          <Route path="/CodeLogsZ/codeforces" element={<Codeforces />} />
          <Route path="/CodeLogsZ/leetcode" element={<Leetcode />} />
          <Route path="/CodeLogsZ/hackerrank" element={<HackerRank />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
