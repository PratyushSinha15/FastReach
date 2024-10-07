import { useState, useEffect } from "react";
import Welcome from "../components/Welcome";
import { useNavigate } from "react-router-dom";
import '../Custom.css';
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import axios from "axios";

function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[error, setError] = useState("");
    
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/");
        }
    }, [navigate]);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    const handleSignin= async()=>{

        //if user already has token redirect to home page
        

        if(!emailRegex.test(email)){
            setError("Invalid email format");
            return;
        }
        if(password.length<8){
            setError("Password is too short");
            return;
        }
        if(!passwordRegex.test(password)){
            setError("Password is not strong enough");
            return;
        }
        

        try {
            const response = await axios.post("http://localhost:5000/api/users/signin", {
                email,
                password
            });
            const data = response.data;
            console.log(data);
            if (response.status === 200) {
                localStorage.setItem("token", data.token);
                navigate("/");
            } else {
                setError(data.message || "Invalid email or password");
            }
        } catch (error) {
            console.log(error);
            setError("Something went wrong. Please Try Again Later");
        }
        
    }



    

    return (
        <div className=" maindiv grid grid-cols-1 lg:grid-cols-2 h-screen">
            <div className="flex justify-center  ">
                <Welcome  />
            </div>

            <div className="font-sans border-l  flex text-white flex-col justify-center items-center ">
                <div className="flex flex-col border rounded-3xl p-8 border-l-violet-950 justify-center items-center">
                <h1 className="text-4xl font-sans  font-bold">Sign In</h1>
                    <input 
                        type="email" 
                        placeholder="Email"
                        aria-label="Email" 
                        value={email} 
                        className="text-black mb-2  mt-2 h-8 w-[300px] text-lg rounded-xl pl-2"
                        onChange={(e) => setEmail(e.target.value)} 
                        />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        className="text-black mb-2 mt-2 h-8 w-[300px] text-lg rounded-xl border-3 border-gray-400 pl-2"
                        onChange={(e) => setPassword(e.target.value)} 
                        />
                    {error && <p className="error text-red-500 text-sm mt-1 mb-1">{error}</p>}
                <div >
                    <Button label="Sign In" onClick={handleSignin} />
                </div>
                <BottomWarning label="Don't have an account?" buttonText="Sign Up" to="/signup" />
                </div>

            </div>
        </div>
    );
}

export const RedirectIfAuthenticated = ({ children }: { children: JSX.Element }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/"); // Redirect to the home page or dashboard
        }
    }, [navigate]);

    return children;
};

export default Signin;