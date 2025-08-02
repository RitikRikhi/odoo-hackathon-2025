import { useState } from "react";
import {Paperclip,MessageSquare} from 'lucide-react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function CreateTicket(){

    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
 const [isLoading,setIsLoading]=useState(false);
 const navigate=useNavigate()
    const handleSubmit=async(e)=>{
e.preventDefault()
setIsLoading(true) 

try{
const res=await axios.post('http://localhost:5000/api/tickets/create',{title,description});
navigate(`/tickets/${res.data._id}`)
setTitle('');
    setDescription('');
    alert('Ticket created successfully');


}
catch(err){
    alert(err.message || 'Failed to create ticket')
}
finally{
    setIsLoading(false)
}}
    return(
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <MessageSquare className="text-blue-600" /> New Ticket
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Brief issue description"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Details</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded min-h-[120px]"
            placeholder="Describe your issue..."
            required
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            type="button"
            className="text-sm text-gray-600 flex items-center gap-1"
          >
            <Paperclip className="w-4 h-4" /> Attach File
          </button>
          <button
            type="submit" disabled={isLoading}
            className={`bg-blue-600  text-white px-4 py-2 rounded ${isLoading? 'opacity-70 cursor-not-allowed': 'hover:bg-blue-700'}`}
          >
           {isLoading ? 'Creating... ':'Submit Ticket'}
          </button>
        </div>
      </form>
    </div>
  );
}
    