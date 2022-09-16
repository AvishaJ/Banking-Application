import React from "react";
import {useParams } from "react-router-dom"
import Navigation from "../navigation/navigation";

function CustomerDashboard(){
    const role = "customer";
    const user = useParams().userName;
    return (
        <div>
            <Navigation userName={user} role={role} />
        </div>

    )
}

export default CustomerDashboard;