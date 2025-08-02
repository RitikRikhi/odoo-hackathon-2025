import
 React from "react";

import { Signin } from "./pages/Signin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LogIn } from "lucide-react";
import { Signup } from "./pages/signup";
import SplashScreen from "./pages/SplashScreen";
import CreateTicket from "./components/tickets/CreateTicket";
import TicketThread from "./pages/TicketThread";


function App(){
  return (

  <Routes>
    <Route path="/" element={<SplashScreen/>}/>
    <Route path="/signin" element={<Signin/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/create" element={<CreateTicket/>}/>
    <Route path="/tickets/:id" element={<TicketThread/>}/>
   
  </Routes>
 

  )
}

export default App