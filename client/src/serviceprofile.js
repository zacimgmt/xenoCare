import axios from "axios";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Leaflet from "leaflet";

import { Icon } from "leaflet";
import { Link } from "react-router-dom";

// const icon = new Icon({
//     iconSize: [20, 40],
//     iconAnchor: null,
//     popupAnchor: [2, -40],
//     iconUrl: "http://simpleicon.com/wp-content/uploads/unsure_emotion.svg",
//     shadowUrl: null,
// });
// Leaflet.Marker.prototype.options.icon = icon;

export default function serviceProfile(props) {
    const [service, setService] = useState();
    console.log("props: ", props.match.params);
    const { type, id } = props.match.params;

    useEffect(async () => {
        const { data } = await axios.get(`/servProfile/${type}/${id}`);
        console.log("service: ", data[0]);
        setService(data[0] || null);
    }, []);

    if (service === null) {
        return <h1>No service found, sorry!</h1>;
    }

    if (!service ) {
        return null;
    }

    const {
        name = "",
        address = "",
        lat,
        long,
        email = "",
        phone,
        url = "",
        description = "",
        smallbio = "",
        schedule = "",
        insurance = "",
        english = "",
        queerfriendly = "",
        urgent = "",
        urgenttime,
        price = "",
        pricetable = "",
        specialty = "",
        notes = "",
    } = service;
    console.log("urgentTime: ", urgenttime);
    const position = [lat, long];
    return (
        <>
            <div id="serviceProfileContainer">
                <div className="serviceProfile">
                    <div id="notMap">
                        <h2>{name}</h2>
                        {specialty && (
                            <span className="specialty"> {specialty} </span>
                        )}
                        <p>{description}</p>
                        {schedule && (
                            <details>
                                <summary>Schedule</summary>
                                <p>{schedule}</p>
                            </details>
                        )}
                        {insurance && insurance !== "not required" && (
                            <p>Insurance: {insurance}</p>
                        )}
                        {insurance === "not required" && <p>Free</p>}
                        <div className="profileAttributes">
                            {english && <p>English Speaking</p>}
                            {queerfriendly && <p>Queer Friendly</p>}
                            {urgent && (
                                <div>
                                    <p>Take urgent appointments</p>
                                    {urgenttime && (
                                        <>
                                            <h3> Schedule</h3>
                                            <p> {urgenttime}</p>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="contactInfo">
                            <h3>Contact Info</h3>
                            {phone && (
                                <p>
                                    <a
                                        className="contactLink"
                                        href={`tel:+${phone}`}
                                    >
                                        +{phone}
                                    </a>
                                </p>
                            )}
                            {email && (
                                <p>
                                    <a
                                        className="contactLink"
                                        href={`mailto:${email}`}
                                    >
                                        {email}
                                    </a>
                                </p>
                            )}
                            {url && (
                                <a className="contactLink" href={url}>
                                    {" "}
                                    {url}
                                </a>
                            )}
                            {address && <p>{address}</p>}
                        </div>
                    </div>

                    <div className="servicesMap" style={{ margin: 0 }}>
                        <MapContainer
                            center={[lat, long]}
                            zoom={10}
                            scrollWheelZoom={true}
                            style={{ height: 200, margin: 0 }}
                        >
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            <Marker
                                key={id}
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
                                      
                                    </div>
                                    
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                </div>
            </div>
        </>
    );
}
