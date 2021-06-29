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
                    <h1>{t("header")}</h1>

                    <br />
                    <p>{t("landing_1")} </p>
                    <br />
                    <p>{t("landing_2")}</p>
                    <br />
                    <p>{t("landing_3")}</p>
                    <br />
                    <p>{t("landing_4")}</p>
                    <br></br>
                    <p>
                        {t("find")} <Link to="/about">{t("here")}</Link>. <br />{" "}
                        {t('submit')}<a href="/form">{t("here")}</a>.
                    </p>
                </div>
            </div>
            <div id="test"></div>
        </>
    );
}
