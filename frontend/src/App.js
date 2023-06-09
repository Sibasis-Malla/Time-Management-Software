import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import React,{useState,useEffect} from "react";


import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import AppointmentsForm from "./pages/AppointmentsForm";
import AppointmentsDashboard from "./pages/AppointmentsDashboard";
import Reschedule from "./pages/Reschedule";
import Statistics from "./pages/Statistics";
import Leave from "./pages/Leave";


export default function App() {
  axios.defaults.withCredentials = true
  axios.defaults.baseURL = "http://localhost:8080"
  const [loggedIn, setloggedIn] = useState(false)
  const [empID, setuserName] = useState("")
  const [id,setID] = useState("")
  const [isSec,setisSec] = useState(false)
 
  const getUser=()=> {
    axios.get('/').then(response => {
      console.log('Get user response: ')
   
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

      setloggedIn(true);
      setuserName(response.data.user.name)
      console.log(response.data.bossData)
      response.data.bossData?setID(response.data.bossData.empID):setID(response.data.user.empID)
      setisSec(response.data.sec)
      // setSecID(response.data.user.secID)
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
      <Navbar isloggedIn={loggedIn} empID={empID} setloggedIn={setloggedIn} setempID={setuserName} Id={id} isSec={isSec}/>
      <Routes>
      <Route path="/" element={<Home />}></Route>
        <Route path="/Login" element={<Login setloggedIn={setloggedIn} setempID={setuserName}/>}/>
        <Route path="/AddAppointments" element={<AppointmentsForm setloggedIn={setloggedIn} ID={id}/>}/>
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/:id/Dashboard" element={<AppointmentsDashboard/>} ID={id}/>
        <Route path="/:id2/leave" element={<Leave/>} ID={id}/>
        <Route path="/:id1/Reschedule" element={<Reschedule/>} ID={id}/>
        <Route path="/Statistics" element={<Statistics/>}/>
      </Routes>
    </>
  );
}
