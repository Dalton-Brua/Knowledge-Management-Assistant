import React from "react";
import { DashboardSideNav } from "./DashboardSideNav";
import { Document } from "./Document";
import { Logout } from "./Logout";
import { Setting } from "./Setting";
import ellipse5 from "./ellipse-5.png";
import glyphUndefined2 from "./glyph-undefined-2.svg";
import glyphUndefined3 from "./glyph-undefined-3.svg";
import glyphUndefined4 from "./glyph-undefined-4.svg";
import glyphUndefined5 from "./glyph-undefined-5.svg";
import glyphUndefined6 from "./glyph-undefined-6.svg";
import glyphUndefined7 from "./glyph-undefined-7.svg";
import glyphUndefined8 from "./glyph-undefined-8.svg";
import glyphUndefined from "./glyph-undefined.svg";
import icon from "./icon.png";
import image from "./image.svg";
import "./style.css";

export const History = () => {
    return (
        <div className="history">
            <div className="history-v">
                <div className="side-nav">
                    <div className="side-nav-2">
                        <img className="ellipse" alt="Ellipse" src={ellipse5} />

                        <div className="logout-toogle">
                            <div className="leading-icon-nav-wrapper">
                                <div className="leading-icon-nav-2">
                                    <div className="div-2">
                                        <Logout className="icon-instance-node" color="white" />
                                    </div>

                                    <div className="div-2">
                                        <div className="text-wrapper">Logout</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="brand-nav-list">
                            <div className="nav-brand" />

                            <div className="nav-list">
                                <DashboardSideNav
                                    className="dashboard-side-nav-button"
                                    property1="default"
                                    text="Home"
                                />
                                <div className="div-wrapper">
                                    <div className="leading-icon-nav-2">
                                        <div className="div-2">
                                            <Document className="icon-instance-node" />
                                        </div>

                                        <div className="div-2">
                                            <div className="text-wrapper">Saved Queries</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="nav-item-2">
                                    <div className="leading-icon-nav-2">
                                        <div className="div-2">
                                            <Setting className="icon-instance-node" color="#EFF2F4" />
                                        </div>

                                        <div className="div-2">
                                            <div className="dashboard-2">Settings</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-wrapper-2">Intellihub</div>
                    </div>
                </div>

                <div className="search">
                    <div className="header-cell">
                        <img
                            className="app-title-undefined"
                            alt="App title undefined"
                            src={glyphUndefined}
                        />

                        <div className="text-wrapper-3">Query</div>
                    </div>

                    <div className="item-cell">
                        <img className="img" alt="App title undefined" src={image} />

                        <p className="p">
                            Common patterns in customer feedback from the past year
                        </p>
                    </div>

                    <div className="item-cell">
                        <img
                            className="img"
                            alt="App title undefined"
                            src={glyphUndefined2}
                        />

                        <p className="p">
                            Summary of recent advancements in renewable energy technology
                        </p>
                    </div>

                    <div className="item-cell">
                        <img
                            className="img"
                            alt="App title undefined"
                            src={glyphUndefined3}
                        />

                        <p className="text-wrapper-4">
                            Current landcape of e-commerce market trends in Asia
                        </p>
                    </div>

                    <div className="item-cell">
                        <img
                            className="img"
                            alt="App title undefined"
                            src={glyphUndefined4}
                        />

                        <p className="text-wrapper-4">
                            5 year evolution of the demand for data security solutions
                        </p>
                    </div>

                    <div className="item-cell">
                        <img
                            className="img"
                            alt="App title undefined"
                            src={glyphUndefined5}
                        />

                        <p className="text-wrapper-4">
                            Previous quarterly analysis of remote work productivity
                        </p>
                    </div>

                    <div className="item-cell">
                        <img
                            className="img"
                            alt="App title undefined"
                            src={glyphUndefined6}
                        />

                        <p className="text-wrapper-4">
                            Latest news articles about emerging blockchain technology
                        </p>
                    </div>

                    <div className="item-cell">
                        <img
                            className="img"
                            alt="App title undefined"
                            src={glyphUndefined7}
                        />

                        <p className="text-wrapper-4">Latest AI trends in healthcare</p>
                    </div>

                    <div className="item-cell-2">
                        <img
                            className="img"
                            alt="App title undefined"
                            src={glyphUndefined8}
                        />

                        <p className="text-wrapper-4">
                            How should I structure a database schema for a healthcare website?
                        </p>
                    </div>
                </div>

                <div className="date-searched">
                    <div className="header-cell">
                        <div className="text-wrapper-3">Date</div>
                    </div>

                    <div className="item-cell">
                        <div className="text-wrapper-5">11/12/2024</div>
                    </div>

                    <div className="item-cell">
                        <div className="text-wrapper-5">11/12/2024</div>
                    </div>

                    <div className="item-cell">
                        <div className="text-wrapper-5">11/10/2024</div>
                    </div>

                    <div className="item-cell">
                        <div className="text-wrapper-5">11/9/2024</div>
                    </div>

                    <div className="item-cell">
                        <div className="text-wrapper-5">11/6/2024</div>
                    </div>

                    <div className="item-cell">
                        <div className="text-wrapper-5">11/6/2024</div>
                    </div>

                    <div className="item-cell">
                        <div className="text-wrapper-5">11/6/2024</div>
                    </div>

                    <div className="item-cell-3">
                        <div className="text-wrapper-5">11/3/2024</div>
                    </div>
                </div>

                <div className="user">
                    <div className="header-cell">
                        <div className="text-wrapper-3">User</div>
                    </div>

                    <div className="item-cell">
                        <div className="text-wrapper-5">User2033434675</div>
                    </div>

                    <div className="item-cell">
                        <div className="text-wrapper-5">User2033493438</div>
                    </div>

                    <div className="item-cell">
                        <div className="text-wrapper-5">User2033492066</div>
                    </div>

                    <div className="item-cell">
                        <div className="text-wrapper-5">User2033492236</div>
                    </div>

                    <div className="item-cell">
                        <div className="text-wrapper-5">User2033499034</div>
                    </div>

                    <div className="item-cell">
                        <div className="text-wrapper-5">User2033494573</div>
                    </div>

                    <div className="item-cell">
                        <div className="text-wrapper-5">User2033492034</div>
                    </div>

                    <div className="item-cell-2">
                        <div className="text-wrapper-5">User2033493433</div>
                    </div>
                </div>

                <div className="text-wrapper-6">History</div>

                <div className="overlap-group-wrapper">
                    <div className="overlap-group">
                        <input className="samantha" placeholder="Search" type="text" />

                        <img className="icon" alt="Icon" src={icon} />
                    </div>
                </div>
            </div>
        </div>
    );
};
