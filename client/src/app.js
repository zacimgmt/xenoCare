import { BrowserRouter, Link, Route } from "react-router-dom";
import About from "./about";
import Form from "./form";
import Services from "./services";
import HealthTool from "./healthtool";

export default function App() {
    return (
        <BrowserRouter>
            <>
                <header>
                    <span id="logo">xenoCare</span>
                    <div id="headerLinks">
                        <Link className="headerLink" to="/services">
                            Services
                        </Link>
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
                <Route path='/healthtool' component={HealthTool}/>
            </>
        </BrowserRouter>
    );
}
