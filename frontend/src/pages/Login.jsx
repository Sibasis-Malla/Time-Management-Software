//This is the Login Form which athenticates and allows respective Executives & secretaries to  use
//the application 
import React, { useState } from "react";
import axios from "axios";
export default function Login(props) {
  const [empID, setEmpId] = useState("");
  const [password, setPassword] = useState("");

  const handleEmpid = (event) => {
    setEmpId(() => ([event.target.name] = event.target.value));
  };
  const handlePassword = (event) => {
    setPassword(() => ([event.target.name] = event.target.value));
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    // axios.defaults.withCredentials = true;
    axios("/login", {
      method: "POST",
      data: {
        empID: empID,
        password: password,
      },
    })
      .then((response) => {
        console.log("login response: ");
        console.log(response);
        if (response.status === 200) {
          // update App.js state
          props.setloggedIn(true);
          props.setempID(response.data.empID);
          window.location.href = "/";
          // update the state to redirect to home
        }
      })
      .catch((error) => {
        console.log("login error: ");
        alert("check credentials");
        console.log(error);
      });
  };

  return (
    <div className="w-1/4 mx-auto mt-20 flex justify-center items-center">
      <form className="w-full flex justify-center flex-col items-center">
        <div class="w-full mb-2">
          <label
            for="empID"
            class="w-full font-semibold block mb-2 text-sm text-gray-900"
          >
            Enter Employee ID
          </label>
          <input
            onChange={handleEmpid}
            name="empID"
            type="text"
            id="empId"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="S1234"
            required
          />
        </div>
        <div class="w-full mb-6">
          <label
            for="password"
            class="block mb-2 font-semibold text-sm text-gray-900"
          >
            Enter password
          </label>
          <input
            onChange={handlePassword}
            name="password"
            type="password"
            id="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            required
          />
        </div>
        <button
          onClick={handleSubmit}
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
