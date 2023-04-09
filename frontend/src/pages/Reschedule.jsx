import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function Reschedule(props) {
    const {id1} = useParams()
    const [date, setDate] = useState()
    const [time, setTime] = useState("")
    const [duration, setDuration] = useState()
    const [venue, setVenue] = useState("")

    const  handleDate= (event)=> {
		setDate(() => ([event.target.name] = event.target.value))
	}
    const  handleTime= (event)=> {
		setTime(() => ([event.target.name] = event.target.value))
	}
    const  handleVenue= (event)=> {
		setVenue(() => ([event.target.name] = event.target.value))
	}
    const  handleDuration= (event)=> {
		setDuration(() => ([event.target.name] = event.target.value))
	}

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(props.ID)
        axios.post(`/${id1}/reschedule`,{
        date:date,
        time:time,
        duration:duration,
        venue:venue,
        }).then(res=>{
            console.log(res)
            alert("Sent For Approval")
            window.location.href = `/${res.data}/Dashboard`
        }).catch(err=>alert("Something Wrong Happened"))
    }
  return (
    <div class="flex items-center justify-center p-12">
    <div class="mx-auto w-full max-w-[550px] bg-white">
        <form>
    
            <div class="-mx-3 flex flex-wrap">
                <div class="w-full px-3 sm:w-1/3">
                    <div class="mb-5">
                        <label for="date" class="mb-3 block text-base font-medium text-[#07074D]">
                            Date
                        </label>
                        <input onChange={handleDate} type="date" name="date" id="date"
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                </div>
                <div class="w-full px-3 sm:w-1/3">
                    <div class="mb-2">
                        <label for="time" class="mb-3 block text-base font-medium text-[#07074D]">
                            Time (HH:MM)
                        </label>
                        <input onChange={handleTime} type="String" name="time" id="time"
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                </div>
                <div class="w-full px-3 sm:w-1/3">
                    <div class="mb-5">
                        <label for="duration" class="mb-3 block text-base font-medium text-[#07074D]">
                            Duration
                        </label>
                        <input onChange={handleDuration} type="text" name="duration" id="duration"
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-3">
                <label class="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                    Venue
                </label>
                <div class="-mx-3 flex flex-wrap">
                    <div class="w-full px-3 sm:w-1/2">
                        <div class="mb-5">
                            <input onChange={handleVenue} type="text" name="venue" id="venue" placeholder="Enter venue"
                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                    </div>
            </div>
            </div>
            <div>
                <button onClick={handleSubmit}
                    class="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                    Reschedule Appointment
                </button>
            </div>
        </form>
    </div>
</div>
  )
}
