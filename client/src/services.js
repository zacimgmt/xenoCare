import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Services() {
    const [services, setServices] = useState("");
    const [servicesNames, setServicesNames] = useState("");
    const [allNames, setallNames] = useState([]);
    const [matchedNames, setMatchedNames] = useState([]);
    const [languageLabels, setLanguageLabels] = useState([]);
    const [qualityLabels, setQualityLabels] = useState([]);

    const [inputValue, setInputValue] = useState("");
    const [searchClass, setSearchClass] = useState("");
    console.log("@@@@@ rendering @@@@");
    console.log("inputValue: ", inputValue);

    useEffect(async () => {
        const { data } = await axios.get("/services.json");
        console.log("data: ", data);
        setServices(data.allResults);
        const { data: allNames } = await axios.get("/allnames.json");
        console.log("allNames: ", allNames);
        setallNames(allNames);
    }, []);

    useEffect(async () => {
        console.log("language label changed: ", languageLabels);
    }, [languageLabels]);

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
    }, [qualityLabels]);

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
                <div
                    tabIndex="0"
                    onBlur={() => {
                        setSearchClass("searchHidden");
                    }}
                >
                    <input
                        id="searchbar"
                        className="labels"
                        onChange={(e) => {
                            handleChange(e);
                            setSearchClass("");
                        }}
                        value={inputValue}
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
                            <p key={index} onClick={() => setInputValue(each)}>
                                {each}
                            </p>
                        ))}
                    </div>
                </div>
                <details id="filters">
                    <summary>Filters</summary>
                    <span>
                        <p>Languages</p>
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
                        <p>Quality</p>
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
                    </span>
                    <span></span>
                </details>
            </div>

            <div id="services">
                {services.map(
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
                                    <Link className='linkToProfile' to={link}> + more </Link>
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
        </div>
    );
}
