import React from "react";

export default function Home() {
  return (
    <>
      <div>
        <div className="w-full h-[80vh] flex justify-center items-center">
          <div className="left w-1/2 ml-32">
            <div className="flex flex-col justify-start items-start">
              <div className="title font-bold text-3xl text-black ">
                Your Ultimate Time Management Solution
              </div>
              <div className="info mt-5">
                Our software helps busy
                professionals schedule meetings allowing them to specify venue,
                attendees, and goal. TMS automatically detects common slots in
                concerned executives' diaries, emails them, and reschedules
                appointments. Computer novices can check their schedules with an
                easy-to-use graphical interface. TMS handles several remote
                inquiries and emails executive appointments daily.
              </div>
            </div>
          </div>
          <div className="right w-1/2 h-full flex justify-center items-center">
            <img src="https://res.cloudinary.com/doybtqm8h/image/upload/v1681074429/clock-removebg-preview_e3opgs.png" />
          </div>
        </div>
      </div>
    </>
  );
}
