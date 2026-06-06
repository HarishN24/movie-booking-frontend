import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../services/api";

function Register() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "USER"
    });

    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const registerUser = async () => {

        try {

            await api.post("/auth/register", user);

            alert("Registration Successful");

            navigate("/");

        } catch (error) {

            alert(
                "Registration Failed"
            );
        }
    };

    return (

        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba')",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}
        >

            <div
                className="card shadow-lg"
                style={{
                    width: "450px",
                    background:
                        "rgba(0,0,0,0.85)",
                    color: "white",
                    borderRadius: "20px"
                }}
            >

                <div className="card-body p-5">

                    <h1 className="text-center mb-3">
                        🎬 Movie Booking
                    </h1>

                    <p className="text-center text-light mb-4">
                        Create Your Account
                    </p>

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        className="form-control mb-3"
                        onChange={handleChange}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="form-control mb-3"
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="form-control mb-3"
                        onChange={handleChange}
                    />

                    <button
                        className="btn btn-success w-100"
                        onClick={registerUser}
                    >
                        Register
                    </button>

                    <p className="text-center mt-4">

                        Already have an account?

                        {" "}

                        <Link
                            to="/"
                            className="text-warning"
                        >
                            Login
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
}

export default Register;