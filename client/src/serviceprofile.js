import axios from "axios";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Leaflet from "leaflet";

import { Icon } from "leaflet";
import { Link } from "react-router-dom";


export default function serviceProfile(props) {
    const [service, setService] = useState();
    const { type, id } = props.match.params;

    useEffect(async () => {
        const { data } = await axios.get(`/servProfile/${type}/${id}`);
        setService(data[0] || null);
    }, []);

    if (service === null) {
        return <h1>No service found, sorry!</h1>;
    }

    if (!service) {
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
        urgenttime = "",
        price = "",
        pricetable = "",
        specialty = "",
        notes = "",
    } = service;
    
    const position = [lat, long];
    return (
        <>
            <div id="serviceProfileContainer">
                <Link id='goBack' to='/services'>Go Back  </Link>
                <div className="serviceProfile">
                    <div id="notMap">
                        <h2>{name}</h2>
                        {specialty && (
                            <span className="specialty"> {specialty} </span>
                        )}
                        <span>{description}</span>
                        {schedule && (
                            <details id='serviceSchedule'>
                                <summary>Schedule</summary>
                                {schedule.startsWith('http') && <p><a href={schedule}>Info available on their website</a></p>}
                                {!schedule.startsWith('http') && <p>{schedule}</p>}
                            </details>
                        )}
                        {insurance && insurance !== "not required" && (
                            <p>Insurance: {insurance}</p>
                        )}
                        {insurance === "not required" && <p>Free</p>}
                        <div className="profileAttributes">
                            {english && (
                                <span className="label">English Speaking</span>
                            )}
                            {queerfriendly && (
                                <span className="label">Queer Friendly</span>
                            )}
                            {urgent && urgenttime && (
                                <div id='urgent-container'>
                                    <details id='urgentSchedule'>
                                        <summary className="label">
                                            Takes urgent appointments
                                        </summary>
                                        <p id='urgenttime'> {urgenttime}</p>
                                    </details>
                                </div>
                            )}
                            {urgent && !urgenttime && (
                                <span className='label'>Takes Urgent Appointments</span>
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
                            zoom={11}
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
