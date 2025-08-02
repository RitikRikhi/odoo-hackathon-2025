export default function Button({label}){
return(
    <div className="flex justify-center">
         <button className="w-80 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ">{label}</button>

    </div>
)
}