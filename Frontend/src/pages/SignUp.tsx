
import { useState, ChangeEvent, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import Welcome  from "../components/Welcome";
import '../Custom.css';


// Regular expressions for validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;





function SignUp() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [age, setAge] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [error, setError] = useState<string>("");
    const navigate= useNavigate();

    const handleSignUp = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); // Prevent default button behavior

        setError(""); // Reset error message

        // Validate email
        if (!emailRegex.test(email)) {
            setError("Invalid email format");
            return;
        }

        // Validate passwords
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 8) {
            setError("Password is too short");
            return;
        }

        if (!passwordRegex.test(password)) {
            setError("Password is not strong enough");
            return;
        }

        // Validate age
        if (parseInt(age) < 18) {
            setError("You must be at least 18 years old to sign up");
            return;
        }
    };

    return (
        <div className="flex maindiv justify-center items-center h-screen w-screen ">
        <div className="flex  flex-nowrap justify-around w-full h-fit p-4 ">
            <Welcome />
            <div className="font-sans flex flex-col text-white justify-center items-center border rounded-lg p-8 h-fit">
                <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
                {error && <p className="error text-red-500">{error}</p>}
                <form className="flex flex-col">
                    <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    className="text-black mb-4 h-12 w-[300px] text-lg rounded-lg border border-gray-400 pl-2"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    />
                    <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    className="text-black mb-4 h-12 w-[300px] text-lg rounded-lg border border-gray-400 pl-2"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    />
                    <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    className="text-black mb-4 h-12 w-[300px] text-lg rounded-lg border border-gray-400 pl-2"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    />
                    <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    className="text-black mb-4 h-12 w-[300px] text-lg rounded-lg border border-gray-400 pl-2"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                    />
                    <div className="flex space-x-4 mb-4">
                    <input
                        type="number"
                        placeholder="Age"
                        value={age}
                        className="text-black h-12 w-[100px] text-lg rounded-lg border border-gray-400 pl-2"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setAge(e.target.value)}
                    />
                    <select
                        value={gender}
                        className="text-black h-12 w-[150px] text-lg rounded-lg border border-gray-400 pl-2"
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setGender(e.target.value)}
                    >
                        <option value="" disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    </div>
                    <div className="flex justify-center mb-4">
                    <button
                        onClick={handleSignUp}
                        className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5"
                    >
                        Sign Up
                    </button>
                    </div>
                    <div className="flex justify-center">
                    <button
                        type="button"
                        className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center dark:focus:ring-[#4285F4]/55"
                    >
                        <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                        <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd"/>
                        </svg>
                        Sign in with Google
                    </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    );
}

export default SignUp;
