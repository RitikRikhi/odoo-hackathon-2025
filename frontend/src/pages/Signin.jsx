import Button from "../components/Button"
import {Link, useNavigate}  from 'react-router-dom'

import { Lock, Mail, Ticket } from 'lucide-react';
import BottomCard from "../components/BottomCard";
import { useState } from "react";
import axios from "axios";

export const Signin=()=>{
  const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const  navigate=useNavigate();

return(
  <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-gray-50">
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col items-center mb-6">
        <div className="bg-blue-100 p-3 rounded-full mb-3">
            <Ticket className="w-8 h-8 text-blue-600" strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-800">QuickDesk</h1>
          <p className="text-sm text-gray-500 mt-1">Support ticketing made simple</p>
        </div>
      
        <form className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <Mail className="w-4 h-4"/> Email
            </label>

            <input  className="w-full pl-2 py-1 focus:ring-2 focus:ring-blue-200  focus:border-blue-400 border border-gray-200 rounded transition-all  " placeholder="user@gmail.com" required type="email" onChange={(e)=>{setEmail(e.target.value)}}/>

          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium  text-gray-700 flex items-center gap-1 ">
              <Lock className="w-4 h-4"/>Password
            </label>

            <input onChange={(e)=>{
              setPassword(e.target.value)
            }} className="w-full focus:ring-2 focus:ring-blue-200  focus:border-blue-400 border border-gray-200 rounded transition-all pl-2 py-1 " placeholder="••••••••" required type="email"/>

          </div>

          <button type="submit" className="w-full flex justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg items-center font-medium hover:shadow-md active:scale-95 gap-2 " 
          onClick={async()=>{
            const information={email,password};
            console.log("Sending data: ",information);
            try{
              const res=await axios.post("http://localhost:5000/api/auth/signup",information,{
                headers:{'Content-Type':'application/json'}
              })

              navigate("/dashboard");
              console.log("Signup success: ", res.data)
            }
            catch(err){
              console.log("Signup error: ",err.response? err.response.data : err.messsage);
            }
          }} >Sign In</button>
 
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          New to QuickDesk?{" "}
        <Link to={"/signup"} className="text-blue-600 hover:underline font-medium"> Sign up</Link>
        </div>
         </div>
  </div>
)

}