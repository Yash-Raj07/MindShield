import {useEffect, useState} from "react";
import axios from "axios";

import "./shlokBanner.css";


const ShlokBanner = () => {

    const [shlok, setShlok] = useState(null);

    useEffect(() => {
        const fetchShlok = async () => {
            const API_URL = `http://localhost:8083/api/shlok/random`;
            try {
                const response = await axios.get(API_URL);
                setShlok(response.data);

                console.log("Shlok Data: ",response.data);
            } catch (error) {
                console.error("Error fetching the shlok:", error);
            }
        };
        fetchShlok();
    }, []);

    console.log(shlok);

    // Conditionally render content only when `shlok` is not null
    if (!shlok) {
        return (
            <div className="loading">
                Loading Shlok...
            </div>
        );
    }

    return (
        <>
            <section className={"sectionCardContainer"}>

                {/*<div className={"sectionCardTitle"}>*/}
                {/*    <div className={"sectionCardTitleLine"}></div>*/}
                {/*    <p>Positive Affirmations</p>*/}
                {/*</div>*/}

                <div className="services-content">
                    <h2>Positive Affirmations</h2>
                    {/*<p>We provide to you the best things for you</p>*/}
                </div>
                    <div className={"sectionCard"}>
                        <div className={"hindiTextContainer"}>
                            <p className={"hindiText"}>“{shlok.sanskritShlok}”</p>
                        </div>

                        <div className={"englishTextContainer"}>
                            <p className={"englishText"}>{shlok.englishShlok}</p>
                        </div>

                        <div className={"hindiTextContainer"}>
                            <p className={"hindiText"}>“{shlok.hindiMeaning}”</p>
                        </div>

                        <div className={"englishTextContainer"}>
                            <p className={"englishText"}>{shlok.englishMeaning}</p>
                        </div>
                    </div>


            </section>

        </>
);
};

export default ShlokBanner;