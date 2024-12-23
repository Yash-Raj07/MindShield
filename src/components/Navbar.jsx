import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
    const [user, setUser] = useState(null); // State to store logged-in user

    useEffect(() => {
        const userCookie = Cookies.get("user");
        if (userCookie) {
            setUser(JSON.parse(userCookie)); // Set user if cookie exists
        } else {
            setUser(null); // Ensure no user is set
        }
    }, []);

    return (
        <>
            <div className="navbar-container">
                <nav className="navbar">
                    <Link className="heading" to="/">
                        <h3 className="title">ShieldMe</h3>
                    </Link>

                    {!user && (
                        <Link to="/login" className="link">
                            LOGIN
                        </Link>
                    )}

                    {user && (
                        <div className="login-user-feature-container">
                            <Link to="/contact" className="link">
                                Contacts
                            </Link>
                            <Link to="/journals" className="link">
                                Journal
                            </Link>
                            <Link to="/profile" className="link">
                                Profile
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
            <div className="fade-navbar-effect"></div>
            <div className="empty-navbar"></div>
        </>
    );
};

export default Navbar;
