import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";




export default function LandingPage() {
    const {t} = useTranslation();
    // props.appDiv();
    // useEffect(() => {
    // }, []);
    


    return (
        <div id="landing-container">
            <div id="landing">
                <h1>
                    {t("header")}
                </h1>
                <h1> A crowdsourced directory of services in Berlin</h1>
                <br />
                <p>
                    Navigating the German burocratic and Healtchare systems as a non-German speaker can
                    prove to be too hard for many.{" "}
                </p>
                <p>
                    {" "}
                    Many services have been developed to aid those who need
                    guidance but finding these services is usually not an easy
                    task either.
                </p>
                <p>
                    We aim to collect a big range of these services and make
                    them accessible to those who are in need.
                </p>
                <p>
                    By creating a database of the services accessible through a
                    flexible search engine, we hope to accelarate the connection inbetween the
                    two parties.
                </p>
                <br />
                <p>
                    We rely on you to submit services that you think should
                    belong to this page.
                    <br />
                    Find more info about our mission{" "}
                    <Link to="/about">here</Link>. Submit a service{" "}
                    <a href="/form">here</a>.
                </p>
            </div>
        </div>
    );
}
