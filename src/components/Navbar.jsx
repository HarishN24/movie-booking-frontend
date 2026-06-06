import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar({ searchTerm, setSearchTerm }) {

    const navigate = useNavigate();

    const [showProfile, setShowProfile] =
        useState(false);

    const logout = () => {

        localStorage.clear();

        navigate("/");
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

                <div className="container">

                    <Link
                        className="navbar-brand"
                        to="/movies"
                    >
                        MovieBooking
                    </Link>

                    <input
                        type="text"
                        placeholder="Search Movies..."
                        className="form-control w-50"
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(
                                e.target.value
                            )
                        }
                    />

                    <div className="d-flex gap-2">

                        <Link
                            className="btn btn-danger"
                            to="/my-bookings"
                        >
                            My Bookings
                        </Link>

                        <button
                            className="btn btn-light"
                            onClick={() =>
                                setShowProfile(true)
                            }
                        >
                            👤 Profile &gt;
                        </button>

                    </div>

                </div>

            </nav>

            {showProfile && (

                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        right: 0,
                        width: "350px",
                        height: "100vh",
                        backgroundColor: "#fff",
                        boxShadow:
                            "-4px 0 15px rgba(0,0,0,0.2)",
                        padding: "20px",
                        zIndex: 9999
                    }}
                >

                    <button
                        className="btn btn-secondary mb-3"
                        onClick={() =>
                            setShowProfile(false)
                        }
                    >
                        &lt; Back
                    </button>

                    <h3>👤 My Profile</h3>

                    <hr />

                    <p>
                        <strong>Name:</strong>
                        {" "}
                        {
                            localStorage.getItem(
                                "userName"
                            )
                        }
                    </p>

                    <p>
                        <strong>Email:</strong>
                        {" "}
                        {
                            localStorage.getItem(
                                "email"
                            )
                        }
                    </p>

                    <p>
                        <strong>Role:</strong>
                        {" "}
                        {
                            localStorage.getItem(
                                "role"
                            )
                        }
                    </p>

                    <button
                        className="btn btn-danger w-100 mt-4"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

            )}

        </>
    );
}

export default Navbar;