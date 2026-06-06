import React, { useState, useEffect} from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function SeatSelection() {
    
    const location = useLocation();

    const movie = location.state;

    const navigate = useNavigate();
const seats = [];

for (let row = 65; row <= 73; row++) {
  for (let seat = 1; seat <= 24; seat++) {
    seats.push(`${String.fromCharCode(row)}${seat}`);
  }
}
    

    const [bookedSeats, setBookedSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    useEffect(() => {
        loadBookedSeats();
    }, []);

    const loadBookedSeats = async () => {
        try {
            const response =
                await api.get(
                    `/bookings/seats?movieName=${movie.movieName}&showTime=${movie.showTime}`
                );
            setBookedSeats(response.data);
        } catch (error) {
            console.log(error);
        }
    };


    const selectSeat = (seat) => {

        if (bookedSeats.includes(seat)) {

            return;
        }

        if (selectedSeats.includes(seat)) {

            setSelectedSeats(

                selectedSeats.filter(
                    s => s !== seat
                )
            );

        } else {

            setSelectedSeats([
                ...selectedSeats,
                seat
            ]);
        }
    };

    return (

        <div className="container mt-5">

            <h2 className="text-center">
                Select Seats
            </h2>

            <div className="text-center mb-4">

                <div
                    style={{
                        width: "400px",
                        height: "20px",
                        background: "#ddd",
                        margin: "auto"
                    }}
                >
                </div>

                <p>SCREEN</p>

            </div>

            <div className="d-flex flex-wrap justify-content-center">

                {seats.map((seat) => (

                    <button

                        key={seat}

                        onClick={() =>
                            selectSeat(seat)
                        }

                        disabled={
                            bookedSeats.includes(seat)
                        }

                        className={`m-2 btn
                        ${
                            bookedSeats.includes(seat)
                            ? "btn-danger"
                            : selectedSeats.includes(seat)
                            ? "btn-primary"
                            : "btn-success"
                        }`}
                    >

                        {seat}

                    </button>

                ))}
                

            </div>

            <div className="text-center mt-4">

                <h2>

                    Selected Seats:

                    {selectedSeats.join(", ")}

                </h2>
                <h4 className="text-center">
                    {movie?.movieName}
                </h4>

                <h5 className="text-center">
                    Price: ₹{movie?.ticketPrice}
                </h5>

            </div>
            <div className="text-center mt-3">
                <button
                    className="btn btn-secondary"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>
                
                <button
                    className="btn btn-success"
                    onClick={() =>
                        navigate("/booking", {
                            state: {
                                movie: movie,
                                seats: selectedSeats
                            }
                        })
                    }
                >
                    Continue
            </button>

        </div>

        </div>
        
    );
}

export default SeatSelection;