import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />}></Route>
        <Route path="/Login" element={<Login/>}>

        </Route>
      </Routes>

      {/* <h1 className="text-3xl font-bold text-purple-700 underline">
        Hello world!
      </h1> */}
    </>
  );
}
