import { BrowserRouter, Link, Route } from "react-router-dom";
import About from "./about";
import Form from "./form";
import Services from "./services";
import HealthTool from "./healthtool";
import { useState } from "react";
import serviceProfile from "./serviceprofile";

export default function App() {
    const [buttonServices, setButtonServices] = useState("");
    return (
        <BrowserRouter>
            <>
                <header>
                    <span id="logo">xenoCare</span>
                    <div id="headerLinks">
                        <div>
                            <div className="dropdown">
                                <button className="dropbtn">
                                    Services
                                    <i className="fa fa-caret-down"></i>
                                </button>
                                <div className="dropdown-content">
                                    <Link to="/services">General</Link>
                                    <Link to="#">Healthcare</Link>
                                    <Link to="#">
                                        Jobcenter / <br></br>Tax / Legal Help
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <Link className="headerLink" to="/services"></Link>
                        <a className="headerLink" href="/form">
                            Form
                        </a>
                        <Link className="headerLink" to="/about">
                            About
                        </Link>
                        <Link className="headerLink" to="/healthtool">
                            Tool
                        </Link>
                    </div>
                </header>
                <Route path="/form" component={Form} />
                <Route path="/about" component={About} />
                <Route path="/services" component={Services} />
                <Route path="/healthtool" component={HealthTool} />
                <Route path="/serviceProfile/:type/:id" component={serviceProfile}/>
            </>
        </BrowserRouter>
    );
}
