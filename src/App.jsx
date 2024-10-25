import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Role from './components/login/Role';
import Home from './components/home/Home';
import TripDetails from './components/home/tripdetails/TripDetails';
import Navbar from './components/navbar/Navbar';
import LoadTrip from './components/home/loadtrip/LoadTrip';

function App() {
    const token = sessionStorage.getItem('token');

    return (
        <Router>
            <Content token={token} />
        </Router>
    );
}

function Content({ token }) {
    const location = useLocation()

    // Determine if the Navbar should be shown
    const showNavbar = location.pathname !== '/login' && location.pathname !== '/signup';

    return (
        <>
            {showNavbar && <Navbar />}
            <Routes>
                <Route path="/login" element={token ? <Navigate to={'/'}></Navigate> : <Login />} />
                <Route path="/signup" element={token ? <Navigate to={'/'}></Navigate> : <Signup />} />
                <Route path="/" element={!token ? <Navigate to={'/login'} /> : <Role />} />
                <Route path="/home" element={!token ? <Navigate to={'/login'} /> : <Home />} />
                <Route path="/tripdetails" element={!token ? <Navigate to={'/login'} /> : <TripDetails />} />
                <Route path="/details" element={!token ? <Navigate to={'/login'} /> : <LoadTrip />} />

            </Routes>
        </>
    );
}

export default App;
