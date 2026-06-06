import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AddMovie from "./AddMovie";
import ManageMovies from "./ManageMovies";
import ViewBookings from "./ViewBookings";

function AdminDashboard() {
    const navigate = useNavigate();
    const logout = () => {

        localStorage.clear();

        navigate("/");
    };

    const [tab, setTab] =
        useState("movies");

    return (

        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">

                <h1>
                    🎬 Admin Dashboard
                </h1>

                <button
                    className="btn btn-danger"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>
            
            <div className="d-flex justify-content-center gap-3 mb-4">

                <button
                    className={`btn ${
                        tab === "add"
                        ? "btn-success"
                        : "btn-outline-success"
                    }`}
                    onClick={() =>
                        setTab("add")
                    }
                >
                    Add New Movie
                </button>

                <button
                    className={`btn ${
                        tab === "movies"
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }`}
                    onClick={() =>
                        setTab("movies")
                    }
                >
                    Manage Movies
                </button>

                <button
                    className={`btn ${
                        tab === "bookings"
                        ? "btn-danger"
                        : "btn-outline-danger"
                    }`}
                    onClick={() =>
                        setTab("bookings")
                    }
                >
                    All Bookings
                </button>

            </div>

            <div className="card shadow p-4">

                {tab === "add" &&
                    <AddMovie />
                }

                {tab === "movies" &&
                    <ManageMovies />
                }

                {tab === "bookings" &&
                    <ViewBookings />
                }

            </div>

        </div>
    );
}

export default AdminDashboard;