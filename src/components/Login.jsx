import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const loginUser = async () => {

        try {

            const response = await api.post(
                "/auth/login",
                user
            );

            const loggedUser =
                response.data;
            localStorage.setItem(
                "token",
                response.data.token
            );
            localStorage.setItem(
                "userName",
                loggedUser.name
            );

            localStorage.setItem(
                "email",
                loggedUser.email
            );

            localStorage.setItem(
                "role",
                loggedUser.role
            );

            if (
                loggedUser.role.toUpperCase()
                === "ADMIN"
            ) {

                navigate("/admin");

            } else {

                navigate("/movies");
            }
            alert("Login Successful");
        } catch (error) {

            alert(
                "Invalid Email or Password"
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
                    width: "420px",
                    background:
                        "rgba(0,0,0,0.85)",
                    color: "white",
                    borderRadius: "20px"
                }}
            >

                <div className="card-body p-5">

                    <h1
                        className="text-center mb-3"
                    >
                        🎬 Movie Booking
                    </h1>

                    <p
                        className="text-center text-light mb-4"
                    >
                        Login to Book Your
                        Favourite Movies
                    </p>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="form-control mb-3"
                        onChange={
                            handleChange
                        }
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="form-control mb-3"
                        onChange={
                            handleChange
                        }
                    />

                    <button
                        className="btn btn-danger w-100"
                        onClick={
                            loginUser
                        }
                    >
                        Login
                    </button>

                    <p
                        className="text-center mt-4"
                    >
                        Don't have an
                        account?
                        {" "}
                        <Link
                            to="/register"
                            className="text-warning"
                        >
                            Register
                        </Link>
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Login;