
 
export default function TicketThread({ ticket }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold">{ticket.title}</h2>
        <span className={`px-2 py-1 text-xs rounded ${
          ticket.status === "Open" ? "bg-blue-100 text-blue-800" :
          ticket.status === "Resolved" ? "bg-green-100 text-green-800" :
          "bg-gray-100 text-gray-800"
        }`}>
          {ticket.status}
        </span>
      </div>
      

      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded">
          <p className="text-sm text-gray-800">{ticket.description}</p>
          <p className="text-xs text-gray-500 mt-2">User • {ticket.date}</p>
        </div>
        
   
        {ticket.replies?.map((reply) => (
          <div key={reply.id} className="bg-blue-50 p-4 rounded ml-8">
            <p className="text-sm text-gray-800">{reply.text}</p>
            <p className="text-xs text-gray-500 mt-2">Agent • {reply.date}</p>
          </div>
        ))}
      </div>

    
      {ticket.status !== "Resolved" && (
        <textarea
          className="w-full mt-4 p-2 border rounded"
          placeholder="Reply to this ticket..."
          rows="3"
        />
      )}
    </div>
  );
}
    
