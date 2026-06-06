import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function MyBookings() {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {

        try {

            const email =
                localStorage.getItem(
                    "email"
                );

            const response =
                await api.get(
                    `/bookings/user/${email}`
                );

            setBookings(
                response.data
            );

        } catch (error) {

            console.log(error);
        }
    };
   const cancelBooking = async (id) => {

        const confirmCancel =
            window.confirm(
                "Are you sure you want to cancel this booking?"
            );

        if (!confirmCancel) {
            return;
        }

        try {

            await api.delete(
                `/bookings/${id}`
            );
            

            loadBookings();

            alert("Booking Cancelled");

        } catch (error) {

            alert("Failed to Cancel Booking");
        }
    };

    return (

        <div className="container mt-4" >

            <h2 className="text-center mb-4">
                🎟 My Bookings
            </h2>

            <div className="row">

                {bookings.length > 0 ? (

                    bookings.map((booking) => (

                        <div
                            className="col-md-6 mb-4"
                            key={booking.id}
                        >

                            <div
                                className="card shadow-lg"
                                style={{
                                    borderRadius: "15px"
                                }}
                            >

                                <div className="card-body">

                                    <h3 className="text-danger">
                                        {booking.movieName}
                                    </h3>

                                    <hr />

                                    <p>
                                        <strong>👤 User:</strong>
                                        {" "}
                                        {booking.userName}
                                    </p>

                                    <p>
                                        <strong>🎫 Seats:</strong>
                                        {" "}
                                        {booking.seatNumber}
                                    </p>

                                    <p>
                                        <strong>📅 Date:</strong>
                                        {" "}
                                        {booking.bookingDate}
                                    </p>

                                    <p>
                                        <strong>✅ Status:</strong>
                                        {" "}
                                        Confirmed
                                    </p>

                                    <button
                                        className="btn btn-danger w-100 mt-2"
                                        onClick={() =>
                                            cancelBooking(booking.id)
                                        }
                                    >
                                        Cancel Booking
                                    </button>
                               

                                </div>

                            </div>

                        </div>

                    ))

                ) : (

                    <div className="text-center mt-5">

                        <h3 className="text-danger">
                            No Bookings Found
                        </h3>

                    </div>

                )}

            </div>

        </div>
    );
}

export default MyBookings;