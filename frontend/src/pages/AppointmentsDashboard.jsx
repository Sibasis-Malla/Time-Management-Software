import React from 'react'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment/moment'
import axios from 'axios'
export default function AppointmentsDashboard(props) {
    const [data, setdata] = useState(null)
    const {id} = useParams()
    console.log(id)
    useEffect(()=>{
     
        id && axios.get(`/${id}/getAppointments`).then(res=>{
            console.log(res)
            setdata(res.data);
        }).catch(err=>console.log(err))
    },[])

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
                </tr>
            </thead>
            {data && data.map(res=>{
                const {name,title,slot_date,slot_time,slot_duration,venue} = res
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
                        {/* <td class="px-6 py-4">
                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </td> */}
                    </tr>
                   
                </tbody>
                )
            })}
            
        </table>
    </div>
    </>
  )
}
