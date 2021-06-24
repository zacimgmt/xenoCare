import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function HealthTool() {
    const [inputHealth, setInputHealth] = useState({});
    const [inputServices, setInputServices] = useState({});
    const [view, setView] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(async () => {
        const { data } = await axios.get("/test");
        if (data) {
            setView(true);
        }
    }, []);

    const viewHealth = () => {
        setView("health");
    };
    const viewServices = () => {
        setView("services");
    };

    const handleChangeHealth = (e) => {
        setInputHealth({
            ...inputHealth,
            [e.target.name]: e.target.value,
        });
    };
    const handleChangeServices = (e) => {
        setInputServices({
            ...inputServices,
            [e.target.name]: e.target.value,
        });
    };

    const cleaninput = () => {
        console.log(
            " document.getElementsByTagName(input).value;: ",
            document.getElementsByTagName("input").value
        );
    };

    const handleSubmitHealth = async () => {
        const { data } = await axios.post("/healthTool", { inputHealth });
        if (data) {
            setSuccess(true);
            setView(false);
        }
    };
    const handleSubmitServices = async () => {
        const { data } = await axios.post("/healthTool", { inputServices });
        if (data) {
            setSuccess(true);
            setView(false);
        }
    };

    return (
        <>
            {view && (
                <div id="toolButtons">
                    <button onClick={viewHealth}>Health Tool</button>
                    <button onClick={viewServices}>Services Tool</button>
                    <button onClick={cleaninput}>lol</button>
                </div>
            )}
            {success && "Submitted successfully!"}
            {view === "health" && (
                <div id="services">
                    <h3>Health</h3>
                    <div id="register">
                        <textarea
                            name="name"
                            placeholder="name"
                            type="text"
                            onChange={(e) => handleChangeHealth(e)}
                        ></textarea>{" "}
                        <p></p>
                        <textarea
                            name="type"
                            placeholder="type"
                            type="text"
                            onChange={(e) => handleChangeHealth(e)}
                        ></textarea>
                        <p></p>
                        <textarea
                            name="address"
                            placeholder="address"
                            type="text"
                            onChange={(e) => handleChangeHealth(e)}
                        ></textarea>
                        <p></p>
                        <textarea
                            name="email"
                            placeholder="email"
                            type="email"
                            onChange={(e) => handleChangeHealth(e)}
                        ></textarea>{" "}
                        <p></p>
                        <textarea
                            name="phone"
                            placeholder="phone"
                            type="text"
                            onChange={(e) => handleChangeHealth(e)}
                        ></textarea>{" "}
                        <p></p>
                        <textarea
                            name="url"
                            placeholder="url"
                            type="text"
                            onChange={(e) => handleChangeHealth(e)}
                        ></textarea>{" "}
                        <p></p>
                        <textarea
                            name="description"
                            placeholder="description"
                            type="text"
                            onChange={(e) => handleChangeHealth(e)}
                            style={{ height: "200px" }}
                        ></textarea>{" "}
                        <p></p>
                        <textarea
                            name="schedule"
                            placeholder="schedule"
                            type="text"
                            onChange={(e) => handleChangeHealth(e)}
                            style={{ height: "70px" }}
                        ></textarea>{" "}
                        <p></p>
                        <textarea
                            name="insurance"
                            placeholder="insurance: private, public or free service"
                            type="text"
                            onChange={(e) => handleChangeHealth(e)}
                        ></textarea>{" "}
                        <p></p>
                        <textarea
                            name="english"
                            placeholder="english: true or false"
                            type="text"
                            onChange={(e) => handleChangeHealth(e)}
                        ></textarea>{" "}
                        <p></p>
                        <textarea
                            name="queerFriendly"
                            placeholder="queerFriendly: true or false"
                            type="text"
                            onChange={(e) => handleChangeHealth(e)}
                        ></textarea>{" "}
                        <p></p>
                        <textarea
                            name="urgent"
                            placeholder="urgent: true or false"
                            type="text"
                            onChange={(e) => handleChangeHealth(e)}
                        ></textarea>{" "}
                        <p></p>
                        <textarea
                            name="urgentTime"
                            placeholder="urgent appointment schedule"
                            type="text"
                            onChange={(e) => handleChangeHealth(e)}
                        ></textarea>{" "}
                        <p></p>
                        <textarea
                            name="specialty"
                            placeholder="specialty"
                            type="text"
                            onChange={(e) => handleChangeHealth(e)}
                        ></textarea>{" "}
                        <p></p>
                        <textarea
                            name="notes"
                            placeholder="notes"
                            type="text"
                            style={{ height: "200px" }}
                            onChange={(e) => handleChangeHealth(e)}
                        ></textarea>{" "}
                        <p></p>
                        <p></p>
                    </div>
                    <button onClick={(e) => handleSubmitHealth(e)}>
                        Submit
                    </button>
                </div>
            )}
            {view === "services" && (
                <div id="services">
                    <h3>Services</h3>
                    <div id="register">
                        <textarea
                            name="name"
                            placeholder="name"
                            type="text"
                            onChange={(e) => handleChangeServices(e)}
                        ></textarea>{" "}
                        <p></p>
                        <textarea
                            name="type"
                            placeholder="type"
                            type="text"
                            onChange={(e) => handleChangeServices(e)}
                        ></textarea>
                        <p></p>
                        <textarea
                            name="address"
                            placeholder="address"
                            type="text"
                            onChange={(e) => handleChangeServices(e)}
                        ></textarea>
                        <p></p>
                        <textarea
                            name="email"
                            placeholder="email"
                            type="email"
                            onChange={(e) => handleChangeServices(e)}
                        ></textarea>{" "}
                        <p></p>
                        <textarea
                            name="phone"
                            placeholder="phone"
                            type="text"
                            onChange={(e) => handleChangeServices(e)}
                        ></textarea>{" "}
                        <p></p>
                        <textarea
                            name="url"
                            placeholder="url"
                            type="text"
                            onChange={(e) => handleChangeServices(e)}
                        ></textarea>{" "}
                        <p></p>
                        <textarea
                            name="description"
                            placeholder="description"
                            type="text"
                            onChange={(e) => handleChangeServices(e)}
                            style={{ height: "200px" }}
                        ></textarea>{" "}
                        <p></p>
                        <textarea
                            name="schedule"
                            placeholder="schedule"
                            type="text"
                            onChange={(e) => handleChangeServices(e)}
                            style={{ height: "70px" }}
                        ></textarea>{" "}
                        <p></p>
                        <textarea
                            name="english"
                            placeholder="english: true or false"
                            type="text"
                            onChange={(e) => handleChangeServices(e)}
                        ></textarea>{" "}
                        <p></p>
                        <textarea
                            name="queerFriendly"
                            placeholder="queerFriendly: true or false"
                            type="text"
                            onChange={(e) => handleChangeServices(e)}
                        ></textarea>{" "}
                        <p></p>
                        <textarea
                            name="urgent"
                            placeholder="urgent: true or false"
                            type="text"
                            onChange={(e) => handleChangeServices(e)}
                        ></textarea>{" "}
                        <p></p>
                        <textarea
                            name="urgentTime"
                            placeholder="urgent appointment schedule"
                            type="text"
                            onChange={(e) => handleChangeServices(e)}
                        ></textarea>{" "}
                        <p></p>
                        <textarea
                            name="price"
                            placeholder="is it free? true or false"
                            type="text"
                            onChange={(e) => handleChangeServices(e)}
                        ></textarea>{" "}
                        <p></p>
                        <textarea
                            name="pricetable"
                            placeholder="pricetable, either a link or a description"
                            type="text"
                            style={{ height: "70px" }}
                            onChange={(e) => handleChangeServices(e)}
                        ></textarea>{" "}
                        <p></p>
                        <textarea
                            name="notes"
                            placeholder="notes"
                            type="text"
                            style={{ height: "200px" }}
                            onChange={(e) => handleChangeServices(e)}
                        ></textarea>{" "}
                        <p></p>
                    </div>
                    <p></p>
                    <button onClick={(e) => handleSubmitServices(e)}>
                        Submit
                    </button>
                </div>
            )}
        </>
    );
}
