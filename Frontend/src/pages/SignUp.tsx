import { useState, ChangeEvent, MouseEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Welcome from "../components/Welcome";
import '../Custom.css';
import axios from "axios";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";

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
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/");
        }
    }, [navigate]);

    const handleSignUp = async (event: MouseEvent<HTMLButtonElement>) => {

        event.preventDefault();
        setError(""); 

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

        try {
            const response = await axios.post("http://localhost:5000/api/users/signup", {
                name,
                email,
                password,
                age: parseInt(age),
                gender
            });

            if (response.status === 201) {
                navigate("/signin");
            } else {
                setError(response.data.message || "Sign Up failed. Please try again.");
            }
        } catch (error: any) {
            setError(error.response?.data?.message || "Something went wrong. Please try again.");
        }
    };

    return (
        <div className=" maindiv grid grid-cols-1 lg:grid-cols-2 h-screen">
            <div className="flex justify-center">
                <Welcome />
            </div>
            <div className="font-sans border-l flex text-white flex-col justify-center items-center">
                {error && <p className="error text-red-500 text-sm mt-1 mb-1">{error}</p>}
                <form className="flex border box-border p-10 rounded-3xl border-l-violet-950   flex-col">
                <h1 className="text-4xl text-center font-bold">Sign Up</h1>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        className="text-black mb-2 mt-2 h-8 w-[300px] text-lg rounded-xl pl-2"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        className="text-black mb-2 mt-2 h-8 w-[300px] text-lg rounded-xl pl-2"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        className="text-black mb-2 mt-2 h-8 w-[300px] text-lg rounded-xl pl-2"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        className="text-black mb-2 mt-2 h-8 w-[300px] text-lg rounded-xl pl-2"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                    />
                    <div className="flex space-x-4 mb-4">
                        <input
                            type="number"
                            placeholder="Age"
                            value={age}
                            className="text-black h-8 w-[100px] text-lg rounded-xl pl-2"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setAge(e.target.value)}
                        />
                        <select
                            value={gender}
                            className="text-black h-8 w-[150px] text-lg rounded-xl pl-2"
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setGender(e.target.value)}
                        >
                            <option value="" disabled>Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Chakka</option>
                        </select>
                    </div>
                    <div className="flex justify-center mb-4">
                        <Button label="Sign Up" onClick={handleSignUp} />
                    </div>
                    <BottomWarning label="Already have an account?" buttonText="Sign In" to="/signin" />
                </form>
            </div>
        </div>
    );
}

export default SignUp;
