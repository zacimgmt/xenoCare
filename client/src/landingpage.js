import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function LandingPage() {
    const { t } = useTranslation();
    // props.appDiv();
    // useEffect(() => {
    // }, []);

    return (
        <>
            <div id="landing-container">
                <div id="landing">
                    {/* <h1>{t("header")}</h1> */}
                    <h1> A crowdsourced directory of services in Berlin</h1>
                    <br />
                    <p>
                        Navigating the German bureaucratic system and accessing
                        the services you need can make living in Berlin hard if
                        you don’t speak the language, especially if you aren’t
                        documented, are LGBTQIA+, or don’t have enough money to
                        hire help.{" "}
                    </p>
                    <br />
                    <p>
                        {" "}
                        There are lots of services available in Berlin, but
                        finding these is usually not very easy.
                   
                        We aim to collect a big range of these services and make
                        them accessible to those who are in need.
                    </p>
                    <p>
                        We’ve created an accessible directory to help you out.
                        With a search engine that uses filters and keywords, we
                        hope you can easily access what you’re looking for.
                    </p>
                    <br />
                    <p>
                        Our crowdsourced directory relies on the community to
                        submit services that it think should be shared with
                        others. Thank you for your support.
                    </p>
                    <br></br>
                    <p>
                        Find more info about our mission{" "}
                        <Link to="/about">here</Link>. <br /> Submit a service{" "}
                        <a href="/form">here</a>.
                    </p>
                </div>
            </div>
            <div id="test"></div>
        </>
    );
}
