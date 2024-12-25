import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './dashboard.css';
import axios from "axios";
import EmergencyCard from "../components/EmergencyCard.jsx";
import Medical from "/Medical.svg";
import Fire from "/Fire.svg";
import Accident from "/Accident.svg";
import Disaster from "/Disaster.svg";
import Violence from "/Violence.svg";
import Rescue from "/Rescue.svg";
import ShlokBanner from "../components/ShlokBanner.jsx";


const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [shlok, setShlok] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userCookie = Cookies.get('user');
        console.log(userCookie); // Debugging purpose: log the cookie content
        if (userCookie) {
            setUser(JSON.parse(userCookie)); // Parse and set the user data
        } else {
            navigate('/login'); // Redirect to login if no user is logged in
        }
    }, [navigate]);

    useEffect(() => {
        const fetchShlok = async () => {
            const API_URL = `http://localhost:8083/api/v1/shloks/get-random-shlok`;
            try {
                const response = await axios.get(API_URL);
                setShlok(response.data);
            } catch (error) {
                console.error("Error fetching the shlok:", error);
            }
        };
        fetchShlok();
    }, []);  // This effect runs only once, after the initial render

    return (
        <>
            {/*{user ? (*/}
            {/*    <div className={"welcome-container"}>*/}
            {/*        <h1>Welcome, <span>{user.name || 'User'}!</span></h1>*/}
            {/*    </div>*/}
            {/*) : (*/}
            {/*    <p>Loading...</p>*/}
            {/*)}*/}

            {/*<section className="shlok-container">*/}
            {/*    /!* Only render the ShlokBanner content if it is available *!/*/}
            {/*    {shlok ? (*/}
            {/*        <Link to={`/shlok/${shlok.id}`}>*/}
            {/*            <p>{shlok.englishShlok}</p>*/}
            {/*        </Link>*/}
            {/*    ) : (*/}
            {/*        <p>A person who remains unaffected by the material world, and is undisturbed by pain and pleasure,*/}
            {/*            is a true yogi.</p>*/}
            {/*    )}*/}
            {/*</section>*/}

            {/*<section className="sos-container">*/}
            {/*    <Link to="/sos-alert">*/}
            {/*        <button className="sos-button">SOS ALERT</button>*/}
            {/*    </Link>*/}
            {/*</section>*/}

            {/*<section className="other-sos-container">*/}
            {/*    <h2>Emergency SOS Contacts in India</h2>*/}
            {/*    <div className="emergency-container">*/}
            {/*        <div className="sos-card">*/}
            {/*            <h3>Police</h3>*/}
            {/*            <p>*/}
            {/*                Contact Number:*/}
            {/*                <a href="tel:100" className="call-link">100</a>*/}
            {/*            </p>*/}
            {/*        </div>*/}
            {/*        <div className="sos-card">*/}
            {/*            <h3>Ambulance</h3>*/}
            {/*            <p>*/}
            {/*                Contact Number:*/}
            {/*                <a href="tel:102" className="call-link">102</a>*/}
            {/*            </p>*/}
            {/*        </div>*/}
            {/*        <div className="sos-card">*/}
            {/*            <h3>Fire Brigade</h3>*/}
            {/*            <p>*/}
            {/*                Contact Number:*/}
            {/*                <a href="tel:101" className="call-link">101</a>*/}
            {/*            </p>*/}
            {/*        </div>*/}
            {/*        <div className="sos-card">*/}
            {/*            <h3>Women’s Helpline</h3>*/}
            {/*            <p>*/}
            {/*                Contact Number:*/}
            {/*                <a href="tel:1091" className="call-link">1091</a>*/}
            {/*            </p>*/}
            {/*        </div>*/}
            {/*        <div className="sos-card">*/}
            {/*            <h3>Disaster Management Helpline</h3>*/}
            {/*            <p>*/}
            {/*                Contact Number:*/}
            {/*                <a href="tel:108" className="call-link">108</a>*/}
            {/*            </p>*/}
            {/*        </div>*/}
            {/*    </div>*/}


            {/*</section>*/}


            <section className="dashboard-container">
                <div className="dashboard-hero-section-container">
                    <div className="dashboard-left-container">
                        {user ? (
                            <h1>Hi, <span>{user.name || 'User'}!</span></h1>
                        ) : (
                            <p>Loading...</p>
                        )}
                        <h1>Are you in an emergency?</h1>
                        <p>Press the SOS button, your live location will be shared with your<br/>saved emergency
                            contacts</p>
                        <Link to={"/contact"}>Emergency Contacts</Link>
                    </div>
                    <div className="dashboard-right-container">
                        <img src={"/kidnaping.svg"} alt="Kinapping Image"/>
                    </div>
                </div>

                <div className={"line-div"}>
                    <div></div>
                </div>

                <div className="sos-button-container">
                    <h1>Press the Emergency Button</h1>
                    <Link to="/sos-alert">
                        <button className="sos-alert-button">SOS ALERT</button>
                    </Link>
                </div>


                <div className={"line-div"}>
                    <div></div>
                </div>

                <div className="dashboard-emergency-container">
                    <h1>Whats your emergency?</h1>
                    <div className="emergency-list-container">
                    <EmergencyCard image={Medical} name={"Medical"} color={"#DBE790"} contact={"911"} />
                    <EmergencyCard image={Fire} name={"Fire"} color={"#F5A6A6"} contact={"101"} />
                    <EmergencyCard image={Disaster} name={"Natural Disaster"} color={"#A6F5D4"} contact={"112"} />
                    <EmergencyCard image={Accident} name={"Accident"} color={"#D4CEFA"} contact={"108"} />
                    <EmergencyCard image={Violence} name={"Violence"} color={"#F5A6DF"} contact={"109"} />
                    <EmergencyCard image={Rescue} name={"Rescue"} color={"#F5E8A6"} contact={"104"} />
                    </div>
                </div>


                <ShlokBanner/>

            </section>
        </>
    );
};

export default Dashboard;
