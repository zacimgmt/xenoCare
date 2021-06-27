import axios from "axios";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Leaflet from "leaflet";

import { Icon } from "leaflet";


// const icon = new Icon({
//     iconSize: [20, 40],
//     iconAnchor: [10, 20],
//     popupAnchor: [2, -40],
//     iconUrl: "http://simpleicon.com/wp-content/uploads/unsure_emotion.svg",
//     shadowUrl: null,
// });
// Leaflet.Marker.prototype.options.icon = icon;


export default function serviceProfile(props) {
    const [service, setService] = useState();
    console.log("props: ", props.match.params);
    const { type, id } = props.match.params;
    const position = [52.51034327530159, 13.45088950979277];

    useEffect(async () => {
        const { data } = await axios.get(`/servProfile/${type}/${id}`);
        console.log("service: ", data[0]);
        setService(data[0]);
    }, []);

    if (!service) {
        return <h1>No service found, sorry!</h1>;
    }

    const {
        name = "",
        address = "",
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
    return (
        <>
            <div id="serviceProfileContainer">
                <div className="serviceProfile">
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

                        <MapContainer
                            center={position}
                            zoom={15}
                            scrollWheelZoom={true}
                            style={{ height: 200 }}
                        >
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker
                                position={position}
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
                                    A pretty CSS3 popup. <br /> Easily
                                    customizable.
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                </div>
            </div>
        </>
    );
}
