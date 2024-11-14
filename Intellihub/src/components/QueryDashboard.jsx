import React from "react";
import { Frame } from "./Frame";
import { QueryCard } from "./QueryCard";
import "./style.css";

export const QueryInterface = () => {
    return (
        <div className="query-interface">
            <div className="div-2">
                <Frame className="frame-25" />
                <div className="frame-5">
                    <QueryCard
                        cardBottomSectionDeleteQueryButton="delete-query-button-5.svg"
                        cardBottomSectionPrivateAvatarBasePrivateAvatarBaseClassName="design-component-instance-node"
                        cardBottomSectionSaveQueryButton="save-query-button-5.svg"
                        cardBottomSectionVector="vector-1-5.svg"
                        className="query-card-instance"
                        frameClassName="query-card-2"
                        iwwaOption="iwwa-option-3.svg"
                    />
                    <QueryCard
                        cardBottomSectionDeleteQueryButton="delete-query-button-2.svg"
                        cardBottomSectionPrivateAvatarBasePrivateAvatarBaseClassName="query-card-3"
                        cardBottomSectionSaveQueryButton="save-query-button-2.svg"
                        cardBottomSectionVector="vector-1-2.svg"
                        className="query-card-instance"
                        frameClassName="query-card-2"
                        iwwaOption="image.svg"
                    />
                    <QueryCard
                        cardBottomSectionDeleteQueryButton="delete-query-button-3.svg"
                        cardBottomSectionPrivateAvatarBasePrivateAvatarBaseClassName="query-card-4"
                        cardBottomSectionSaveQueryButton="save-query-button-3.svg"
                        cardBottomSectionVector="vector-1-3.svg"
                        className="query-card-instance"
                        frameClassName="query-card-2"
                        iwwaOption="iwwa-option-2.svg"
                    />
                    <p className="p">
                        Common patterns in customer feedback from the past year
                    </p>

                    <p className="text-wrapper-3">
                        Summary of recent advancements in renewable energy technology
                    </p>

                    <p className="text-wrapper-4">
                        Latest news articles about emerging blockchain technology
                    </p>
                </div>

                <div className="rectangle" />
            </div>
        </div>
    );
};
