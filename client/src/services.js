import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

export default function Services(props) {
    console.log("props.match: ", props.location.hash);
    const [services, setServices] = useState("");
    const [servicesNames, setServicesNames] = useState("");
    const [allNames, setallNames] = useState([]);
    const [matchedNames, setMatchedNames] = useState([]);
    const [languageLabels, setLanguageLabels] = useState([]);
    const [qualityLabels, setQualityLabels] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [searchClass, setSearchClass] = useState("");
    const [viewMode, setViewMode] = useState("search");
    const [modeText, setModeText] = useState("Map Mode");

    const berlinPosition = [52.520008, 13.404954];
    console.log("@@@@@ rendering @@@@");
    console.log("inputValue: ", inputValue);

    useEffect(async () => {
        const { data } = await axios.get("/services.json");
        console.log("data: ", data);
        setServices(data.allResults);
        const { data: allNames } = await axios.get("/allnames.json");
        console.log("allNames: ", allNames);
        setallNames(allNames);
    }, [props.location.hash]);

    // useEffect(async () => {
    //     console.log("language label changed: ", languageLabels);
    // }, [languageLabels]);

    useEffect(async () => {
        const search = {
            languages: [...languageLabels],
            quality: [...qualityLabels],
            inputValue,
        };
        console.log("search: ", search);
        const { data } = await axios.post("/searchServices", search);
        console.log("data: ", data);
        setServices(data);
        console.log("quality label changed: ", qualityLabels);
    }, [qualityLabels, languageLabels]);

    const handleChange = (e) => {
        setInputValue(e.target.value);
        console.log("e.target.value: ", e.target.value);
        const input = e.target.value.toLowerCase();
        if (e.target.value === "") {
            return setMatchedNames([]);
        }
        let matchedServices = allNames.filter((each) => {
            const eachLowerCase = each.toLowerCase();
            if (eachLowerCase.indexOf(input) === 0) {
                console.log("each: ", each);
                return each;
            }
            return;
        });
        console.log("matchedServices: ", matchedServices);
        setMatchedNames(matchedServices);
    };

    const handleQualityLabel = (e) => {
        console.log("e: ", e.target.checked);
        const { checked } = e.target;
        console.log("e.target.name: ", e.target.name);
        if (checked) {
            if (!qualityLabels.some((each) => each === e.target.name)) {
                setQualityLabels([...qualityLabels, e.target.name]);
            }
        } else if (!checked) {
            console.log("notchecked");
            setQualityLabels(
                qualityLabels.filter((each) => each !== e.target.name)
            );
        }
    };

    const handleLanguageLabel = (e) => {
        console.log("e: ", e.target.checked);
        const { checked } = e.target;
        console.log("e.target.name: ", e.target.name);
        if (checked) {
            if (!languageLabels.some((each) => each === e.target.name)) {
                setLanguageLabels([...languageLabels, e.target.name]);
            }
        } else if (!checked) {
            console.log("notchecked");
            setLanguageLabels(
                languageLabels.filter((each) => each !== e.target.name)
            );
        }
    };

    const handleSubmit = async (e) => {
        const search = {
            languages: [...languageLabels],
            quality: [...qualityLabels],
            inputValue,
        };
        console.log("search: ", search);
        const { data } = await axios.post("/searchServices", search);
        console.log("data: ", data);
        setServices(data);
    };

    if (!services) {
        return null;
    }

    return (
        <div id="app-container">
            <div id="searchBarElements">
                <button
                    id="seeMap"
                    onClick={() => {
                        if (modeText === "Map Mode") {
                            setViewMode("map");
                            setModeText("Search Mode");
                        } else if (modeText === "Search Mode") {
                            setViewMode("search");
                            setModeText("Map Mode");
                        }
                    }}
                >
                    {modeText}
                </button>
                <div
                    tabIndex="0"
                    style={{ margin: 0 }}
                    // onBlur={() => {
                    //     setSearchClass("searchHidden");
                    // }}
                >
                    <input
                        id="searchbar"
                        // className="labels"
                        autoComplete="off"
                        style={{ margin: 0 }}
                        onChange={(e) => {
                            handleChange(e);
                            setSearchClass("");
                        }}
                        value={inputValue}
                        onKeyDown={(e) => {
                            console.log("e.key: ", e.key);
                            if (e.key === "Escape") {
                                setSearchClass("searchHidden");
                            } else if (e.key === "Enter") {
                                setSearchClass("searchHidden");
                                handleSubmit();
                            }
                        }}
                        onFocus={() => {
                            setSearchClass("");
                        }}
                    ></input>
                    <button onClick={handleSubmit}> Submit </button>
                    <div
                        className="searchMatch"
                        id={searchClass}
                        // className="searchMatch"
                    >
                        {matchedNames.map((each, index) => (
                            <p
                                key={index}
                                onClick={() => {
                                    setInputValue(each);
                                    setSearchClass("searchHidden");
                                }}
                            >
                                {each}
                            </p>
                        ))}
                    </div>
                </div>
                <div id="filters-container">
                    <details id="filters">
                        <summary id="summaryOfFilters">Filters</summary>
                        {/* <span> */}
                        <h4>Languages</h4>
                        <input
                            type="checkbox"
                            id="english"
                            name="english"
                            onChange={(e) => handleQualityLabel(e)}
                        ></input>
                        <label htmlFor="english">English</label>
                        <input
                            type="checkbox"
                            id="arabic"
                            name="arabic"
                            onChange={(e) => handleLanguageLabel(e)}
                        ></input>
                        <label htmlFor="arabic">Arabic</label>
                        <input
                            type="checkbox"
                            id="french"
                            name="french"
                            onChange={(e) => handleLanguageLabel(e)}
                        ></input>
                        <label htmlFor="french">French</label>
                        <input
                            type="checkbox"
                            id="german"
                            name="german"
                            onChange={(e) => handleLanguageLabel(e)}
                        ></input>
                        <label htmlFor="german">German</label>
                        <input
                            type="checkbox"
                            id="italian"
                            name="italian"
                            onChange={(e) => handleLanguageLabel(e)}
                        ></input>
                        <label htmlFor="italian">Italian</label>
                        <input
                            type="checkbox"
                            id="greek"
                            name="greek"
                            onChange={(e) => handleLanguageLabel(e)}
                        ></input>
                        <label htmlFor="greek">Greek</label>
                        <input
                            type="checkbox"
                            id="hebrew"
                            name="hebrew"
                            onChange={(e) => handleLanguageLabel(e)}
                        ></input>
                        <label htmlFor="hebrew">Hebrew</label>
                        <p></p>
                        <input
                            type="checkbox"
                            id="persian"
                            name="persian"
                            onChange={(e) => handleLanguageLabel(e)}
                        ></input>
                        <label htmlFor="persian">Persian</label>

                        <input
                            type="checkbox"
                            id="portuguese"
                            name="portuguese"
                            onChange={(e) => handleLanguageLabel(e)}
                        ></input>
                        <label htmlFor="portuguese">Portuguese</label>
                        <input
                            type="checkbox"
                            id="polish"
                            name="polish"
                            onChange={(e) => handleLanguageLabel(e)}
                        ></input>
                        <label htmlFor="polish">Polish</label>
                        <input
                            type="checkbox"
                            id="russian"
                            name="russian"
                            onChange={(e) => handleLanguageLabel(e)}
                        ></input>
                        <label htmlFor="russian">Russian</label>
                        <input
                            type="checkbox"
                            id="spanish"
                            name="spanish"
                            onChange={(e) => handleLanguageLabel(e)}
                        ></input>
                        <label htmlFor="spanish">Spanish</label>
                        <h4>Quality</h4>
                        <input
                            type="checkbox"
                            id="price"
                            name="price"
                            onChange={(e) => handleQualityLabel(e)}
                        ></input>
                        <label htmlFor="price">Free</label>
                        <input
                            type="checkbox"
                            id="urgent"
                            name="urgent"
                            onChange={(e) => handleQualityLabel(e)}
                        ></input>
                        <label htmlFor="urgent">Urgent Appoitments</label>
                        <input
                            type="checkbox"
                            id="queerFriendly"
                            name="queerFriendly"
                            onChange={(e) => handleQualityLabel(e)}
                        ></input>
                        <label htmlFor="queerFriendly">Queer Friendly</label>
                        {/* </span> */}
                    </details>
                </div>
            </div>

            {viewMode === "search" && (
                <div id="services">
                    {services
                        .sort((a, b) => (a.name > b.name ? 1 : -1))
                        .map(
                            (
                                {
                                    id,
                                    name = "",
                                    type = "",
                                    address = "",
                                    email = "",
                                    phone,
                                    url = "",
                                    description = "",
                                    smallbio = "",
                                    schedule = "",
                                    insurance = "",
                                    english = "",
                                    queerFriendly = "",
                                    urgent = "",
                                    urgentTime = "",
                                    price = "",
                                    pricetable = "",
                                    specialty = "",
                                    notes = "",
                                },
                                index
                            ) => {
                                let link;
                                if (type === "Healthcare") {
                                    link = `/serviceProfile/h/${id}`;
                                } else {
                                    link = `/serviceProfile/o/${id}`;
                                }
                                return (
                                    <div key={index} className="service">
                                        <span className="type">{type}</span>
                                        <span className="cardLink">
                                            <Link
                                                className="linkToProfile"
                                                to={link}
                                            >
                                                {" "}
                                                + more{" "}
                                            </Link>
                                        </span>
                                        <h4>{name}</h4>
                                        {description && (
                                            <details className="description">
                                                <summary>Description</summary>
                                                {description}
                                            </details>
                                        )}
                                        {/* <div>
                                <p> {name},</p>
                                <p> {type},</p>
                                <p> {address},</p>
                                <p> {email},</p>
                                {phone},<p> {url},</p>
                                <p> {description},</p>
                                <p> {smallbio},</p>
                                <p> {schedule},</p>
                                <p> {insurance},</p>
                                <p> {english},</p>
                                <p> {queerFriendly},</p>
                                <p> {urgent},</p>
                                <p> {urgentTime},</p>
                                <p> {price},</p>
                                <p> {pricetable},</p>
                                <p> {specialty},</p>
                                <p> {notes},</p>
                            </div> */}
                                    </div>
                                );
                            }
                        )}
                </div>
            )}

            {viewMode === "map" && (
                <div className="servicesMap">
                    <MapContainer
                        center={berlinPosition}
                        zoom={11}
                        scrollWheelZoom={false}
                        id="mapid"
                    >
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {services.map(
                            ({ lat, long, name, type, id, address }, index) => {
                                let link;
                                if (type === "Healthcare") {
                                    link = `/serviceProfile/h/${id}`;
                                } else {
                                    link = `/serviceProfile/o/${id}`;
                                }
                                return (
                                    <Marker
                                        key={index}
                                        position={[lat, long]}
                                        // icon={
                                        //     new Icon({
                                        //         iconSize: [20, 40],
                                        //         iconAnchor: [10, 20],
                                        //         // popupAnchor: [2, -40],
                                        //         iconUrl:
                                        //             "http://simpleicon.com/wp-content/uploads/unsure_emotion.svg",
                                        //         shadowUrl: null,
                                        //     })
                                        // }
                                    >
                                        <Popup>
                                            <div className="popup">
                                                {name}
                                                <br />
                                                {address}
                                                <br />
                                                <Link to={link}> + more </Link>
                                            </div>
                                        </Popup>
                                    </Marker>
                                );
                            }
                        )}
                    </MapContainer>
                </div>
            )}
        </div>
    );
}
