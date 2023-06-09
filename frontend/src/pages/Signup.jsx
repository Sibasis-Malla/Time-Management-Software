//This module helps in adding the Executive and Secreataries information to the database 
import React, { useState } from "react";
import axios from "axios";
export default function Signup() {
  //React states to hold info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [empID, setEmpId] = useState("");
  const [secID, setSecId] = useState("");
  const [password, setpassword] = useState("");
  //Form handlers
  const handleName = (event) => {
    setName(() => ([event.target.name] = event.target.value));
  };
  const handleEmail = (event) => {
    setEmail(() => ([event.target.name] = event.target.value));
  };
  const handleEmpid = (event) => {
    setEmpId(() => ([event.target.name] = event.target.value));
  };
  const handlePassword = (event) => {
    setpassword(() => ([event.target.name] = event.target.value));
  };
  const handlesecid = (event) => {
    setSecId(() => ([event.target.name] = event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/signup", {
        name: name,
        email: email,
        empID: empID,
        secID: secID,
        password: password,
      })
      .then((response) => {
        console.log(response);
        if (!response.data.errmsg) {
          console.log("successful signup");
          window.location.href = "/login";
          // window.href
        } else {
          console.log("username already taken");
        }
      })
      .catch((error) => {
        console.log("signup error: ");
        console.log(error);
      });
  };

  return (
    <div>
      <section class="bg-gray-50 ">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div class="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form class="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Employee's Full Name
                  </label>
                  <input
                    onChange={handleName}
                    type="text"
                    name="name"
                    id="name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="John Doe"
                    required=""
                  />
                </div>

                <div>
                  <label
                    for="empID"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Employee's ID
                  </label>
                  <input
                    onChange={handleEmpid}
                    type="text"
                    name="empID"
                    id="empID"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="E1022"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="secID"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Secretary's ID
                  </label>
                  <input
                    onChange={handlesecid}
                    type="text"
                    name="secID"
                    id="secID"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="S1022"
                    required=""
                  />
                </div>

                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Employee's email
                  </label>
                  <input
                    onChange={handleEmail}
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    onChange={handlePassword}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    required=""
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add Employee
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
