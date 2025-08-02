import { useState } from 'react';
import TicketThread from './TicketThread';

export default function TicketList({ tickets }) {
  const [selectedTicket, setSelectedTicket] = useState(null);

  return (
    <div className="space-y-4">
      {selectedTicket ? (
        <TicketThread 
          ticket={selectedTicket} 
          onBack={() => setSelectedTicket(null)}
          user={currentUser} // Pass current user from context
        />
      ) : (
        tickets.map((ticket) => (
          <div 
            key={ticket._id}
            onClick={() => setSelectedTicket(ticket)}
            className="ticket-card-style"
          >
           
          </div>
        ))
      )}
    </div>
  );
}