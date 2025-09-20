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
          <Route path="/codelogs-fe/" element={<Codeforces />} />
          <Route path="/codelogs-fe/codeforces" element={<Codeforces />} />
          <Route path="/codelogs-fe/leetcode" element={<Leetcode />} />
          <Route path="/codelogs-fe/hackerrank" element={<HackerRank />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
