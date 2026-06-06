import React, {
    useEffect,
    useState
} from "react";

import api from "../services/api";

function ViewBookings() {

    const [bookings,
        setBookings] = useState([]);

    useEffect(() => {

        loadBookings();

    }, []);

    const loadBookings =
        async () => {

        try {

            const response =
                await api.get(
                    "/bookings"
                );

            setBookings(
                response.data
            );

        } catch (error) {

            alert(
                "Failed To Load Bookings"
            );
        }
    };

    return (

        <div className="container mt-4">

            <h2 className="text-center mb-4">

                All Bookings

            </h2>

            <div className="table-responsive">

                <table
                    className="table table-bordered table-striped shadow"
                >

                    <thead
                        className="table-dark"
                    >

                        <tr>

                            <th>ID</th>

                            <th>User</th>

                            <th>Movie</th>

                            <th>Seats</th>

                            <th>Seat Count</th>

                            <th>Date</th>

                            <th>Amount</th>

                        </tr>

                    </thead>

                    <tbody>

                        {bookings.map(
                            booking => (

                            <tr
                                key={
                                    booking.id
                                }
                            >

                                <td>
                                    {
                                        booking.id
                                    }
                                </td>

                                <td>
                                    {
                                        booking.userName
                                    }
                                </td>

                                <td>
                                    {
                                        booking.movieName
                                    }
                                </td>

                                <td>
                                    {
                                        booking.seatNumber
                                    }
                                </td>

                                <td>
                                    {
                                        booking.seatNumber
                                        ?.split(",")
                                        .length
                                    }
                                </td>

                                <td>
                                    {
                                        booking.bookingDate
                                    }
                                </td>

                                <td>
                                    ₹{
                                        booking.amount
                                    }
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default ViewBookings;