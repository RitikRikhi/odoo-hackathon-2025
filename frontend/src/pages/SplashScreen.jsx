import { Ticket } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



export default function SplashScreen() {
    const navigate=useNavigate();
    useEffect(()=>{
        const timer=setTimeout(()=>{
navigate("/signin")
        },2000)
    },[navigate])
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="animate-pulse flex flex-col items-center">
       
        <div className="bg-blue-100 p-4 rounded-full mb-4 animate-bounce">
          <Ticket className="w-10 h-10 text-blue-600" strokeWidth={2} />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">QuickDesk</h1>
      </div>
    </div>
  );
}