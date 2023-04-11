//This module helps Executives to select a range of Dates they are absent.
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Leave(props) {
  const { id1 } = useParams();
  const [date, setDate] = useState();
  const [endDate,setendDate] = useState()
 

  const handleDate = (event) => {
    setDate(() => ([event.target.name] = event.target.value));
  };
  const handleendDate = (event) => {
    setendDate(() => ([event.target.name] = event.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(props.ID);
    // axios
    //   .post(`/${id1}/reschedule`, {
    //     date: date,
    //     time: time,
    //     duration: duration,
    //     venue: venue,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     console.log(res);

    //     alert(
    //       `${res.data.message} ${
    //         !res.data.bool
    //           ? `,Try with slot,${res.data.data.start}-${res.data.data.end}`
    //           : ``
    //       }`
    //     );
    //     // alert("Sent For Approval")
    //     // window.location.href = `/${res.data}/Dashboard`
    //   })
    //   .catch((err) => alert("Something Wrong Happened"));
  };
  return (
    <div class="flex items-center justify-center p-12">
      <div class="mx-auto w-full max-w-[550px] bg-white">
        <form>
          <div class="-mx-3 flex flex-wrap">
            <div class="w-full px-3 sm:w-1/2">
              <div class="mb-5">
                <label
                  for="date"
                  class="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Start Date
                </label>
                <input
                  onChange={handleDate}
                  type="date"
                  name="Date"
                  id="date"
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div class="w-full px-3 sm:w-1/2">
              <div class="mb-5">
                <label
                  for="date"
                  class="mb-3 block text-base font-medium text-[#07074D]"
                >
                  End Date
                </label>
                <input
                  onChange={handleendDate}
                  type="date"
                  name="endDate"
                  id="date"
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={handleSubmit}
              class="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Set Leave
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
