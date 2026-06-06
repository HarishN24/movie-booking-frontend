import { 
  BrowserRouter,
  Routes, 
  Route
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import MovieList from "./components/MovieList";
import Booking from "./components/Booking";
import AdminDashboard from "./components/AdminDashboard";
import SeatSelection from "./components/SeatSelection";
import Ticket from "./components/Ticket";
import MyBookings from "./components/MyBookings";
import AddMovie from "./components/AddMovie";
import ManageMovies from "./components/ManageMovies";
import ViewBookings from "./components/ViewBookings";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route 
          path="/"
          element={<Login/>}
        />
        
        <Route
        path="/register"
        element={<Register/>}
        />

                <Route
          path="/movies"
          element={<MovieList />}
        />

        <Route
          path="/booking"
          element={<Booking />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/seats"
          element={<SeatSelection />}
        />
        <Route
          path="/ticket"
          element={<Ticket />}
        />
        <Route
          path="/my-bookings"
          element={<MyBookings />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App
