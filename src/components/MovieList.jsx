import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import MovieCard from "./MovieCard";
import Navbar from "./Navbar";

function MovieList() {
  const [currentPage, setCurrentPage] = useState(1);

  const moviesPerPage = 8;

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        getMovies();
    }, []);

    const getMovies = async () => {

        try {

            const response = await api.get("/movies");

            setMovies(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const handleBook = (movie) => {

        navigate("/seats", {
            state: movie
        });
    };

    const filteredMovies = movies.filter((movie) =>
        movie.movieName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );
  const lastMovie =
      currentPage * moviesPerPage;

  const firstMovie =
      lastMovie - moviesPerPage;

  const currentMovies =
    filteredMovies.slice(
        firstMovie,
        lastMovie
    );
    return (
        <>
            <Navbar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            <div className="container mt-4">

                <h2 className="text-center mb-4">
                    Now Showing
                </h2>

                <div className="row">

                    {filteredMovies.length > 0 ? (

                        currentMovies.map((movie) => (

                            <div
                                className="col-lg-3 col-md-4 col-sm-6 mb-4"
                                key={movie.id}
                            >
                                <MovieCard
                                    movie={movie}
                                    onBook={handleBook}
                                />
                            </div>

                        ))

                    ) : (

                        <div className="text-center">

                            <h3 className="text-danger">
                                Movie Not Available
                            </h3>

                        </div>

                    )}

                </div>

            </div>
<div className="text-center mb-5">

    <button
        className="btn btn-secondary me-2"
        disabled={currentPage === 1}
        onClick={() =>
            setCurrentPage(currentPage - 1)
        }
    >
        Previous
    </button>

    <span className="fw-bold">
        Page {currentPage}
    </span>

    <button
        className="btn btn-primary ms-2"
        disabled={
            currentPage >=
            Math.ceil(
                filteredMovies.length /
                moviesPerPage
            )
        }
        onClick={() =>
            setCurrentPage(currentPage + 1)
        }
    >
        Next
    </button>

</div>
        </>
    );
}

export default MovieList;