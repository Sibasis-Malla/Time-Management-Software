import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Navbar(props) {
  const handleLogout = (e) => {
    e.preventDefault();
    console.log("logging out");
    axios
      .post("/logout")
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          props.setloggedIn(false);
          props.setempID(null);
          window.location.href = "/login";
        }
      })
      .catch((error) => {
        console.log("Logout error");
      });
  };

  return (
    <>
      <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
          {/* <a href="https://flowbite.com" class="flex items-center"> */}
          <div className="flex flex-row">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              class="h-6 mr-3 sm:h-9"
              alt="Flowbite Logo"
            />
            <Link
              to="/"
              class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
            >
              TMS
            </Link>
          </div>
          {/* <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span> */}
          <div class="flex justify-center items-center">
            {props.isloggedIn ? (
              <div className="font-semibold text-white flex justify-center items-center">
                <span>Hey {props.empID}</span>{" "}
                <button
                  onClick={handleLogout}
                  class="ml-4 text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/Signup"
                  class=" font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  {" "}
                  Signup
                </Link>

                <Link
                  to="/Login"
                  class="font-medium text-blue-600 ml-3 dark:text-blue-500 hover:underline"
                >
                  {" "}
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <nav class="bg-gray-50 dark:bg-gray-700">
        <div class="max-w-screen-xl px-4 py-3 mx-auto md:px-6">
          <div class="flex items-center">
            <ul class="flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium">
              {/* <li>
                <a
                  href="#"
                  class="text-gray-900 dark:text-white hover:underline"
                  aria-current="page"
                >
                  Home
                </a>
              </li> */}
              {props.isloggedIn ? (
                <>
                  {" "}
                  {!props.isSec ? (
                    <li>
                      <Link
                        to="/AddAppointments"
                        class="text-gray-900 dark:text-white hover:underline"
                      >
                        Add Appointment
                      </Link>
                    </li>
                  ) : (
                    <></>
                  )}
                  <li>
                    <Link
                      to={`/${props.Id}/Dashboard`}
                      class="text-gray-900 dark:text-white hover:underline"
                    >
                      Meeting Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/Statistics"
                      class="text-gray-900 dark:text-white hover:underline"
                    >
                      Stats
                    </Link>
                  </li>
                </>
              ) : (
                <></>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
