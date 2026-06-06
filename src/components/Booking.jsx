import React, { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

function Booking() {
    const navigate = useNavigate();
    const location = useLocation();

    const selectedSeats = location.state?.seats || [];

    const seatCount = selectedSeats.length;

    const movie = location.state?.movie;
    const totalAmount =
        selectedSeats.length *
        (movie?.ticketPrice || 0);
    const [booking, setBooking] = useState({

        userName: "",
        movieName: "",
        seatNumber: "",
        bookingDate: ""
    });

    const handleChange = (e) => {

        setBooking({

            ...booking,
            [e.target.name]: e.target.value
        });
    };

    const bookTicket = async () => {
        const confirmBooking = window.confirm(
            "Confirm Ticket Booking?"
        );

    if (!confirmBooking) {
        return;
    }

        try {

           const bookingData = {
                ...booking,
                email: localStorage.getItem("email"),
                movieName: movie?.movieName,
                showTime: movie?.showTime,
                amount: totalAmount,
                seatNumber: selectedSeats.join(", ")
            };

            await api.post(
                "/bookings",
                bookingData
            );

            navigate("/ticket", {
               state: {
                    userName: booking.userName,
                    movieName: movie?.movieName,
                    movieImage: movie?.imageUrl,
                    showTime: movie?.showTime || "Not Available",
                    seatNumber: selectedSeats.join(", "),
                    seatCount: selectedSeats.length,
                    bookingDate: booking.bookingDate,
                    amount: totalAmount
                }
            });

        } catch (error) {

            alert("Booking Failed");
        }
    };

    return (
        

        <div className="container mt-5">

            <div className="card p-4">

                <h2 className="text-center mb-4">
                    Book Ticket
                </h2>
              <div className="alert alert-warning">

                    <strong>Movie:</strong>

                    {movie?.movieName}

                    <br />
                    <strong>Show Time:</strong> {movie?.showTime}
                    <br/>

                    <strong>Price Per Ticket:</strong>

                    ₹{movie?.ticketPrice}

                    <br />

                    <strong>Total Amount:</strong>

                    ₹{totalAmount}

                </div>
                <input
                    type="text"
                    name="userName"
                    placeholder="Enter Name"
                    className="form-control mb-3"
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="bookingDate"
                    className="form-control mb-3"
                    onChange={handleChange}
                />
                <button
                    className="btn btn-secondary mb-3"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>
                <button
                    className="btn btn-success"
                    onClick={bookTicket}
                >
                    Confirm Booking
                </button>

            </div>

        </div>
    );
    
}


export default Booking;