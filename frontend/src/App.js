import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import axios from "axios";
import React,{useState,useEffect} from "react";

export default function App() {
  axios.defaults.withCredentials = true
  axios.defaults.baseURL = "http://localhost:8080"
  const [loggedIn, setloggedIn] = useState(false)
  const [empID, setuserName] = useState("")
  const getUser=()=> {
    axios.get('/').then(response => {
      console.log('Get user response: ')
     // console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

      setloggedIn(true);
      setuserName(response.data.user.name)
      } else {
        console.log('Get user: no user');
        setloggedIn(false);
        setuserName(null)
      }
    })
  }

    useEffect(()=>{
      getUser()
    },[])
  return (
    <>
      <Navbar isloggedIn={loggedIn} empID={empID} setloggedIn={setloggedIn} setempID={setuserName}/>
      <Routes>
      <Route path="/" element={<Home />}></Route>
        <Route path="/Login" element={<Login setloggedIn={setloggedIn} setempID={setuserName}/>}/>
        <Route path="/Signup" element={<Signup/>}/>
      </Routes>

      {/* <h1 className="text-3xl font-bold text-purple-700 underline">
        Hello world!
      </h1> */}
    </>
  );
}
