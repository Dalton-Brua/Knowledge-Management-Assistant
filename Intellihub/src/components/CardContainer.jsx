import React from "react";
import Card from "./Card";
import "../styles/CardContainer.css";

const CardContainer = () => {
    return (
        <div className="card-container">
            <Card
                title="Data Storage and Management"
                inUse="200MB"
                available="800MB"
            />
            <Card
                title="Query History"
                inUse="150 Queries"
                available="850 Queries"
            />
        </div>
    );
};

export default CardContainer;
