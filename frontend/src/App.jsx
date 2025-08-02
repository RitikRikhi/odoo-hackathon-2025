import React from "react";

import { Signin } from "./pages/Signin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LogIn } from "lucide-react";
import { Signup } from "./pages/signup";
import SplashScreen from "./pages/SplashScreen";
function App(){
  return (

  <Routes>
    <Route path="/" element={<SplashScreen/>}/>
    <Route path="/signin" element={<Signin/>}/>
    <Route path="/signup" element={<Signup/>}/>
  </Routes>
 

  )
}

export default App