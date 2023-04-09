import React from 'react'
import { useState,useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import moment from 'moment/moment'
import axios from 'axios'
export default function AppointmentsDashboard(props) {
    const [data, setdata] = useState(null)
    const [Pendingdata, setPendingdata] = useState(null)
    const [curr,setCurr] = useState(null)
    const {id} = useParams()
    console.log(id)
    useEffect(()=>{
     
        id && axios.get(`/${id}/getAppointments`).then(res=>{
            console.log(res)
            setPendingdata(res.data.data.filter(appt=>appt.isApproved===false))
            setdata(res.data.data.filter(appt=>appt.isApproved===true));
            setCurr(res.data.currUser)
        }).catch(err=>console.log(err))
    },[])
    const handleApprove = (_id)=>{
       
        id && axios.post(`/${_id}/approve`).then((res)=>{
            alert("Appointment Added to Dairy");
            window.location.reload()
        })
    }

return (
    <>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                     Meeting With
                    </th>
                    <th scope="col" class="px-6 py-3">
                       title
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Date
                    </th>
                    <th scope="col" class="px-6 py-3">
                       Time
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Duration
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Venue
                    </th>
                    <th scope="col" class="px-6 py-3">
                        ReSchedule
                    </th>
                </tr>
            </thead>
            {data && data.map(res=>{
                const {name,title,slot_date,slot_time,slot_duration,venue,_id} = res
                return(
                    <tbody>
                    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {name}
                        </th>
                        <td class="px-6 py-4">
                            {title}
                        </td>
                        <td class="px-6 py-4">
                            {moment(slot_date).format('MMMM Do YYYY ')}
                        </td>
                        <td class="px-6 py-4">
                           {slot_time}
                        </td>
                        <td class="px-6 py-4">
                           {slot_duration} Hrs
                        </td>
                        <td class="px-6 py-4">
                           {venue}
                        </td>
                        <td class="px-6 py-4">
                            <Link to={`../${_id}/Reschedule`} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Reschedule</Link>
                        </td>
                    </tr>
                   
                </tbody>
                )
            })}
            
        </table>
        <div>Appointments to Approve</div>
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                     Meeting With
                    </th>
                    <th scope="col" class="px-6 py-3">
                       title
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Date
                    </th>
                    <th scope="col" class="px-6 py-3">
                       Time
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Duration
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Venue
                    </th>
                    <th scope="col" class="px-6 py-3">
                        ReSchedule
                    </th>
                </tr>
            </thead>
            {Pendingdata && Pendingdata.map(res=>{
                const {name,title,slot_date,slot_time,slot_duration,venue,_id} = res
                return(
                    <tbody>
                    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {name}
                        </th>
                        <td class="px-6 py-4">
                            {title}
                        </td>
                        <td class="px-6 py-4">
                            {moment(slot_date).format('MMMM Do YYYY ')}
                        </td>
                        <td class="px-6 py-4">
                           {slot_time}
                        </td>
                        <td class="px-6 py-4">
                           {slot_duration} Hrs
                        </td>
                        <td class="px-6 py-4">
                           {venue}
                        </td>
                        <td class="px-6 py-4">
                            {curr.slice(0,1)==='E'?(<button onClick={()=>handleApprove(_id)} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Approve</button> ):(<div class="font-medium text-blue-600 dark:text-blue-500 hover:underline"> Not Approved</div>)}
                        </td>
                    </tr>
                   
                </tbody>
                )
            })}
            
        </table>
    </div>
    </>
  )
}
