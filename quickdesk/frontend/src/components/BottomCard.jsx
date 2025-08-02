import { Link } from "react-router-dom";

export default  function BottomCard({buttonText,to}){
    return <div className="py-2 text-sm flex justify-center pb-4"  >
      <div>{info}</div>
      <Link to={to} className="pointer underline pl-1 cursor-pointer hover:text-blue-800">{buttonText}</Link>
    </div>

}