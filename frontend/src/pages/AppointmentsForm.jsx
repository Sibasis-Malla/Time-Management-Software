import React,{useState} from 'react'
import axios from 'axios'

export default function AppointmentsForm(props) {
    const [name, setname] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [date, setDate] = useState()
    const [time, setTime] = useState("")
    const [duration, setDuration] = useState()
    const [venue, setVenue] = useState("")
    const [title, setTitle] = useState("")
    const [execs, setExecs] = useState("")
    const  handleName= (event)=> {
		setname(() => ([event.target.name] = event.target.value))
	}
    const  handlePhone= (event)=> {
		setPhone(() => ([event.target.name] = event.target.value))
	}
    const  handleEmail= (event)=> {
		setEmail(() => ([event.target.name] = event.target.value))
	}
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
    const  handleTitle= (event)=> {
		setTitle(() => ([event.target.name] = event.target.value))
	}
    const  handleExecs= (event)=> {
		setExecs(() => ([event.target.name] = event.target.value))
	}
    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post('/addAppt',{
        name : name,
        email:email,
        phone:phone,
        date:date,
        time:time,
        duration:duration,
        venue:venue,
        title:title,
        id:props.ID,
        involvedExecs:execs
        }).then(res=>{
           // console.log(res.data.data)
            // var available=[]
           // const{a10,a11,a12,a13,a14,a15,a16,a17} = res.data.data
           console.log(res)
           

            alert(`${res.data.message} ${!res.data.bool?`,Try with slot,${res.data.data.start}-${res.data.data.end}`:``}`);
            // window.location.href = `/${props.ID}/Dashboard`
            
        })
    }
  return (
    <div class="flex items-center justify-center p-12">
    <div class="mx-auto w-full max-w-[550px] bg-white">
        <form>
            <div class="mb-5">
                <label for="name" class="mb-3 block text-base font-medium text-[#07074D]">
                   Person's Full Name
                </label>
                <input onChange={handleName} type="text" name="name" id="name" placeholder="Full Name"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>
            <div class="mb-5">
                <label for="phone" class="mb-3 block text-base font-medium text-[#07074D]">
                    Phone Number
                </label>
                <input onChange={handlePhone} type="text" name="phone" id="phone" placeholder="Enter your phone number"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>
            <div class="mb-5">
                <label for="email" class="mb-3 block text-base font-medium text-[#07074D]">
                    Email Address
                </label>
                <input onChange={handleEmail} type="email" name="email" id="email" placeholder="Enter your email"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>
            <div class="mb-5">
                <label for="title" class="mb-3 block text-base font-medium text-[#07074D]">
                   Title
                </label>
                <input onChange={handleTitle} type="text" name="title" id="title" placeholder="Enter Title"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>
            <div class="mb-5">
                <label for="title" class="mb-3 block text-base font-medium text-[#07074D]">
                   Involved Execs
                </label>
                <input onChange={handleExecs} type="text" name="execs" id="execs" placeholder="Enter execs separated by comma"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>
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
                        <input onChange={handleDuration} type="number" name="duration" id="duration"
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
                    Add Appointment
                </button>
            </div>
        </form>
    </div>
</div>
  )
}
