import axios from "axios";
import { useEffect, useState } from "react";

export default function Services() {
    const [services, setServices] = useState(0);

    useEffect(async () => {
        const { data } = await axios.get("/services.json");
        console.log("data: ", data);
        setServices(data.allResults);
    }, []);

    if (!services) {
        return null;
    }

    return (
        <div id="services">
            {services.map(
                (
                    {
                        name = "",
                        type = "",
                        address = "",
                        email = "",
                        phone,
                        url = "",
                        description = "",
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
                ) => (
                    <div key={index} className="service">
                        <span className="type">{type}</span>
                        <h4>{name}</h4>
                        <details className="description">
                            <summary>Description</summary>
                            {description}
                        </details>
                    </div>
                )
            )}
        </div>
    );
}
