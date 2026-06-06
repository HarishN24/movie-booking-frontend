function MovieCard({ movie, onBook }) {
  return (
    <div className="card h-100 shadow">

      <img
        src={movie.imageUrl}
        alt={movie.movieName}
        className="card-img-top"
        style={{
          height: "350px",
          objectFit: "cover"
        }}
      />

      <div className="card-body">

        <h5>{movie.movieName}</h5>

        <p>
          <strong>Genre:</strong> {movie.genre}
        </p>

        <p>
          <strong>Show:</strong> {movie.showTime}
        </p>

        <p>
          <strong>Price:</strong> ₹{movie.ticketPrice}
        </p>

        <button
          className="btn btn-danger w-100"
          onClick={() => onBook(movie)}
        >
          Book Now
        </button>

      </div>

    </div>
  );
}

export default MovieCard;