import React, {
    useEffect,
    useState
} from "react";

import api from "../services/api";

function ManageMovies() {

    const [movies, setMovies] =
        useState([]);

    useEffect(() => {

        loadMovies();

    }, []);

    const loadMovies = async () => {

        const response =
            await api.get("/movies");

        setMovies(response.data);
    };

    const deleteMovie =
        async (id) => {

        const confirmDelete =
            window.confirm(
                "Delete this movie?"
            );

        if (!confirmDelete) {

            return;
        }

        try {

            await api.delete(
                `/movies/${id}`
            );

            alert(
                "Movie Deleted"
            );

            loadMovies();

        } catch (error) {

            alert(
                "Delete Failed"
            );
        }
    };

    return (

        <div className="container mt-4">

            <h2 className="text-center mb-4">

                Manage Movies

            </h2>

            <div className="row">

                {movies.map(movie => (

                    <div
                        className="col-md-3 mb-4"
                        key={movie.id}
                    >

                        <div className="card shadow h-100">

                            <img
                                src={
                                    movie.imageUrl
                                }
                                alt={
                                    movie.movieName
                                }
                                className="card-img-top"
                                style={{
                                    height:
                                    "350px",
                                    objectFit:
                                    "cover"
                                }}
                            />

                            <div
                                className="card-body"
                            >

                                <h5>
                                    {
                                        movie.movieName
                                    }
                                </h5>

                                <p>
                                    Genre:
                                    {" "}
                                    {
                                        movie.genre
                                    }
                                </p>

                                <p>
                                    Show:
                                    {" "}
                                    {
                                        movie.showTime
                                    }
                                </p>

                                <p>
                                    ₹
                                    {
                                        movie.ticketPrice
                                    }
                                </p>

                                <button
                                    className="btn btn-danger w-100"
                                    onClick={() =>
                                        deleteMovie(
                                            movie.id
                                        )
                                    }
                                >
                                    Delete Movie
                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default ManageMovies;