import { useState } from "react";
import Welcome from "../components/Welcome";
import '../Custom.css';

function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    

    return (
        <div className="flex maindiv flex-nowrap justify-around">
            <div >
                <Welcome />
            </div>

            <div className="font-sans  flex text-white flex-col justify-center items-center h-screen">
                <h1 className="text-4xl font-sans  font-bold">Sign In</h1>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        className="text-black mb-2 mt-2 h-12 w-[300px] text-lg rounded-lg border border-gray-400 pl-2"
                        onChange={(e) => setEmail(e.target.value)} 
                        />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        className="text-black mb-2 mt-2 h-12 w-[300px] text-lg rounded-lg border border-gray-400 pl-2"
                        onChange={(e) => setPassword(e.target.value)} 
                        />
                
                <div>

                    <button className="   text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-4 mb-4">Sign In</button>
                </div>

            </div>
        </div>
    );
}

export default Signin;