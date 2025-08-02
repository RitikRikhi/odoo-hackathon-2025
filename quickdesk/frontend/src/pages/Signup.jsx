import Button from "../components/Button"
import {Link, useNavigate}  from 'react-router-dom'
import axios from "axios"

import { Lock, Mail, Phone, Ticket, User } from 'lucide-react';
import BottomCard from "../components/BottomCard";
import { useState } from "react";

export const Signup=()=>{
    const navigate=useNavigate();
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [phone,setPhone]=useState("");
    const [email,setEmail]=useState("")
return(
  <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-gray-50">
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col items-center mb-6">
        <div className="bg-blue-100 p-3 rounded-full mb-3">
            <Ticket className="w-8 h-8 text-blue-600" strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-800"> Join QuickDesk</h1>
          <p className="text-sm text-gray-500 mt-1">Get started in 10 minutes</p>
        </div>
      
        <form className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1 ">
              <User className="w-4 h-4"/> Full Name
            </label>

            <input onChange={(e)=>{setName(e.target.value)}} className="w-full focus:ring-2 focus:ring-blue-200  focus:border-blue-400 border border-gray-200 rounded transition-all pl-2 py-1" placeholder="John Doe" required type="text"/>

          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1 pl-2 py-1 ">
              <Mail className="w-4 h-4"/>Email
            </label>

            <input onChange={(e)=>{setEmail(e.target.value)}} className="w-full focus:ring-2 focus:ring-blue-200  focus:border-blue-400 border border-gray-200 rounded transition-all py-1 pl-2 " placeholder="user@gmail.com" required type="email"/>

          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1 pl-2 py-1 ">
              <Phone className="w-4 h-4"/>Phone (Optional)
            </label>

            <input onChange={(e)=>{setPhone(e.target.value)}} className="w-full focus:ring-2 focus:ring-blue-200  focus:border-blue-400 border border-gray-200 rounded transition-all py-1 pl-2 " placeholder="+91 988XXXXXXX" required type="tel"/>

          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1 pl-2 py-1 ">
              <Lock className="w-4 h-4"/>Password
            </label>

            <input onChange={(e)=>{setPassword(e.target.value)}} className="w-full focus:ring-2 focus:ring-blue-200  focus:border-blue-400 border border-gray-200 rounded transition-all py-1 pl-2 " placeholder="••••••••" required type="password"/>
             <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>

          </div>

          <button type="submit" className="w-full flex justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg items-center font-medium hover:shadow-md active:scale-95 gap-2 " 
          onSubmit={async()=>{
            const payload={name,email,password,phone};
            console.log("Sending data: ",payload);
            try{
                const res= await axios.post("http://localhost:5000/api/auth/register",payload,{
                    headers:{'Content-Type' : 'application/json'}
                })

                navigate('/create')
            console.log("Signup success: ",res.data)
       
            } catch(err){
                console.log("Signup error: ", err.response? err.response.data :err.message)
                

            }
            
          }}>
            <Lock className="w-4  h-4"/> Create Account
          </button>
 
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          New to QuickDesk?{" "}
        <Link to={"/signin"} className="text-blue-600 hover:underline font-medium"> Sign in instead</Link>
        </div>
         </div>
  </div>
)

}