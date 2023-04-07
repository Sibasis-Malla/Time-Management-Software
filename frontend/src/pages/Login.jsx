import React,{useState} from 'react'
import axios from 'axios';
export default function Login(props) {
 

  const [empID, setEmpId] = useState("");
  const [password, setPassword] = useState("");

  const  handleEmpid= (event)=> {
		setEmpId(() => ([event.target.name] = event.target.value))
	}
    const  handlePassword= (event)=> {
		setPassword(() => ([event.target.name] = event.target.value))
	}
  const handleSubmit=(event)=>{
    event.preventDefault()
 
    // axios.defaults.withCredentials = true;
    axios('/login', {
      method:'POST',
      data:{
       empID :empID,
       password:password
      }
    })
    .then(response => {
        console.log('login response: ')
        console.log(response)
        if (response.status === 200) {
            // update App.js state
            props.setloggedIn(true)
            props.setempID(response.data.empID)
            window.location.href = "/"
            // update the state to redirect to home
        }
    }).catch(error => {
        console.log('login error: ')
        alert("check credentials")
        console.log(error);
        
    })
}
  
  return (
<form className='flex justify-center flex-col items-center'>
  <div class="mb-6">
    <label for="empID" class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
    <input onChange={handleEmpid} name="empID" type="text" id="empId" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="S1234" required/>
  </div>
  <div class="mb-6">
    <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Your password</label>
    <input onChange={handlePassword} name="password" type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
  </div>
  <div class="flex items-start mb-6">
    {/* <div class="flex items-center h-5">
      <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required/>
    </div> */}
    <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
  </div>
  <button onClick={handleSubmit}  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>

  )
}
