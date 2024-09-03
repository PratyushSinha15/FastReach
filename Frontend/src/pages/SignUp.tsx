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
        <div className="flex maindiv justify-center items-center h-screen w-screen">
            <div className="flex flex-nowrap justify-around w-full h-fit p-4">
                <div>
                    <Welcome />
                </div>
                <div className="font-sans flex flex-col text-white justify-center items-center border rounded-lg p-8 h-fit">
                    <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
                    {error && <p className="error text-red-500">{error}</p>}
                    <form className="flex flex-col">
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            className="text-black mb-4 h-8 w-[300px] text-lg rounded-lg border border-gray-400 pl-2"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            className="text-black mb-4 h-8 w-[300px] text-lg rounded-lg border border-gray-400 pl-2"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            className="text-black mb-4 h-8 w-[300px] text-lg rounded-lg border border-gray-400 pl-2"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            className="text-black mb-4 h-8 w-[300px] text-lg rounded-lg border border-gray-400 pl-2"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                        />
                        <div className="flex space-x-4 mb-4">
                            <input
                                type="number"
                                placeholder="Age"
                                value={age}
                                className="text-black h-8 w-[100px] text-lg rounded-lg border border-gray-400 pl-2"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setAge(e.target.value)}
                            />
                            <select
                                value={gender}
                                className="text-black h-8 w-[150px] text-lg rounded-lg border border-gray-400 pl-2"
                                onChange={(e: ChangeEvent<HTMLSelectElement>) => setGender(e.target.value)}
                            >
                                <option value="" disabled>Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="flex justify-center mb-4">
                            <Button label="Sign Up" onClick={handleSignUp} />
                        </div>
                        <BottomWarning label="Already have an account?" buttonText="Sign In" to="/signin" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
