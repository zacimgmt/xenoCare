import { BrowserRouter, Link, Route } from "react-router-dom";
import "./i18n";
import Form from "./form";
import Services from "./services";
import HealthTool from "./healthtool";
import { useEffect, useRef, useState } from "react";
import serviceProfile from "./serviceprofile";
import LandingPage from "./landingpage";
import i18n from "./i18n";

export default function App() {
    const [buttonServices, setButtonServices] = useState("");
    let appDiv = "normal";

    const changeBackgroundOnLanding = () => {
        appDiv = "backgroundLanding";
    };

    const changeLanguage = (ln) => {
        i18n.changeLanguage(ln);
    };


    return (
        <BrowserRouter>
            <div className="app" id={appDiv}>
                <header>
                    <span id="logo">
                        <Link id="logo" to="/">
                            xenoCare
                        </Link>
                    </span>
                    <div id="headerLinks">
                        <div>
                            <div className="dropdown">
                                <button className="dropbtn">
                                    Services
                                    
                                </button>
                                <div className="dropdown-content">
                                    <Link to="/services">General</Link>
                                    <Link to="/services#healthcare">
                                        Healthcare
                                    </Link>
                                    <Link to="/services/#jobcenter">
                                        Jobcenter / <br></br>Tax / Legal Help
                                    </Link>
                                </div>
                            </div>
                        </div>
                        
                        <Link className="headerLink" href="/form">
                            Form
                        </Link>
                        <Link className="headerLink" to="/healthtool">
                            Tool
                        </Link>
                        <select
                            id="lang"
                            onChange={(e) => changeLanguage(e.target.value)}
                        >
                            <option value="en">EN</option>
                            <option value="de">DE</option>
                        </select>
                    </div>
                </header>
                <Route
                    exact
                    path="/"
                    component={() => (
                        <LandingPage appDiv={changeBackgroundOnLanding} />
                    )}
                />
                <Route path="/form" component={Form} />
                <Route path="/services" component={Services} />
                <Route path="/healthtool" component={HealthTool} />
                <Route
                    path="/serviceProfile/:type/:id"
                    component={serviceProfile}
                />
            </div>
        </BrowserRouter>
    );
}
