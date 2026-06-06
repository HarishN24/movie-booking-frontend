import React, { useRef } from "react";
import { useLocation } from "react-router-dom";

import { QRCodeCanvas } from "qrcode.react";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";


function Ticket() {
    const ticketRef = useRef();

    const location = useLocation();

    const booking = location.state || {};
    const downloadPDF = () => {

        html2canvas(ticketRef.current)
        .then((canvas) => {

            const imgData =
                canvas.toDataURL("image/png");

            const pdf = new jsPDF();

            pdf.addImage(
                imgData,
                "PNG",
                10,
                10,
                180,
                100
            );

            pdf.save("MovieTicket.pdf");
        });
    };

   return (
    <div className="container d-flex justify-content-center mt-5">

        <div
             ref={ticketRef}
            className="card shadow-lg"
            style={{
                width: "700px",
                borderRadius: "20px",
                overflow: "hidden"
            }}
        >

            <div
                className="bg-danger text-white text-center p-3"
            >
                <h2>🎟 Movie Ticket</h2>
            </div>

            <div className="row g-0">

                <div className="col-md-4 text-center p-3">

                    <img
                        src={booking?.movieImage}
                        alt={booking?.movieName}
                        style={{
                            width: "100%",
                            height: "350px",
                            objectFit: "cover",
                            borderRadius: "10px"
                        }}
                    />

                </div>

                <div className="col-md-5 p-4">

                    <h3>{booking?.movieName}</h3>

                    <hr />

                    <p>
                        <strong>User:</strong>
                        {" "}
                        {booking?.userName}
                    </p>
                    <p>
                        <strong>Show Time:</strong>{" "}
                        {booking?.showTime || "Not Available"}
                    </p>
                    
                    <p>
                        <strong>Seats:</strong>
                        {" "}
                        {booking?.seatNumber}
                    </p>
                    <p>
                        <strong>Seat Count:</strong>{" "}
                        {booking?.seatCount}
                    </p>
                    <p>
                        <strong>Date:</strong>
                        {" "}
                        {booking?.bookingDate}
                    </p>

                    <p>
                        <strong>Amount:</strong>
                        {" "}
                        ₹{booking?.amount}
                    </p>

                    <p>
                        <strong>Status:</strong>
                        {" "}
                        Confirmed ✅
                    </p>

                </div>

                <div
                    className="col-md-3 d-flex flex-column justify-content-center align-items-center"
                >

                    <QRCodeCanvas
                        value={JSON.stringify(booking)}
                        size={140}
                    />

                    <p className="mt-2">
                        Scan Ticket
                    </p>

                </div>
                <button
                    className="btn btn-danger mt-3"
                    onClick={downloadPDF}
                >
                    Download Ticket PDF
                </button>

            </div>

        </div>

    </div>
    );
}

export default Ticket;