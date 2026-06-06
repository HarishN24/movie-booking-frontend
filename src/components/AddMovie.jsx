import React, { useState } from "react";
import api from "../services/api";

function AddMovie() {

    const [movie, setMovie] = useState({

        movieName: "",
        genre: "",
        language: "",
        duration: "",
        ticketPrice: "",
        showTime: "",
        imageUrl: "",
        description: ""
    });

    const handleChange = (e) => {

        setMovie({

            ...movie,
            [e.target.name]: e.target.value
        });
    };

    const addMovie = async () => {

        try {

            await api.post(
                "/movies",
                movie
            );

            alert("Movie Added Successfully");

            setMovie({

                movieName: "",
                genre: "",
                language: "",
                duration: "",
                ticketPrice: "",
                showTime: "",
                imageUrl: "",
                description: ""
            });

        } catch (error) {

            alert("Failed To Add Movie");
        }
    };

    return (

        <div className="container mt-5">

            <div className="card p-4 shadow">

                <h2 className="text-center mb-4">
                    Add Movie
                </h2>

                <input
                    type="text"
                    name="movieName"
                    placeholder="Movie Name"
                    className="form-control mb-3"
                    value={movie.movieName}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="genre"
                    placeholder="Genre"
                    className="form-control mb-3"
                    value={movie.genre}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="language"
                    placeholder="Language"
                    className="form-control mb-3"
                    value={movie.language}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="duration"
                    placeholder="Duration"
                    className="form-control mb-3"
                    value={movie.duration}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="ticketPrice"
                    placeholder="Ticket Price"
                    className="form-control mb-3"
                    value={movie.ticketPrice}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="showTime"
                    placeholder="Show Time"
                    className="form-control mb-3"
                    value={movie.showTime}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="imageUrl"
                    placeholder="Image URL"
                    className="form-control mb-3"
                    value={movie.imageUrl}
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    className="form-control mb-3"
                    rows="3"
                    value={movie.description}
                    onChange={handleChange}
                />

                <button
                    className="btn btn-success"
                    onClick={addMovie}
                >
                    Add Movie
                </button>

            </div>

        </div>
    );
}

export default AddMovie;