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
            <div className="ThirdComp">
            <div className="bg">
            <img src="src/assets/mental-health-wellbeing-5-pwmuuh4ttx6aqfhxeaziaj18coc31oxnd95cs7i940.png" alt="bg" width="693" height="598" />
            </div>
            <div className='content'>
              <h2>मनो दर्पणसदृशं, शुद्धं ध्यानेन शुद्ध्यति।
अशुद्धं कामसङ्कल्पैः, सोऽहमिति च धारणा।।</h2>
<br />
<br /><br />
<p>(हिन्दी अनुवाद)</p>
<h4>

मन दर्पण के समान है, ध्यान से यह शुद्ध होता है।
यह कामनाओं और गलत विचारों से अशुद्ध हो सकता है।
</h4>
<br /><br /><br />
<p>(English Translation)</p>
<h4>
The mind is like a mirror; it becomes pure through meditation.
It can be tainted by desires and impure thoughts.</h4>
<br /><br />
              
      
              <button className="button" >Learn More</button>
            </div>
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