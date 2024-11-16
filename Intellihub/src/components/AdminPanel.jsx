import React from "react";
import { ActionsCell } from "./ActionsCell";
import { DashboardSideNav } from "./DashboardSideNav";
import { DeactivateUser } from "./DeactivateUser";
import { DeactivateUser1 } from "./DeactivateUser1";
import { DeactivateUser2 } from "./DeactivateUser2";
import { DeactivateUser3 } from "./DeactivateUser3";
import { DeactivateUser4 } from "./DeactivateUser4";
import { DeactivateUser5 } from "./DeactivateUser5";
import { DeactivateUser6 } from "./DeactivateUser6";
import { DeleteUser } from "./DeleteUser";
import { DeleteUser1 } from "./DeleteUser1";
import { DeleteUser2 } from "./DeleteUser2";
import { DeleteUser3 } from "./DeleteUser3";
import { DeleteUser4 } from "./DeleteUser4";
import { DeleteUser5 } from "./DeleteUser5";
import { DeleteUser6 } from "./DeleteUser6";
import { Document } from "./Document";
import { EditUser } from "./EditUser";
import { EditUser1 } from "./EditUser1";
import { EditUser2 } from "./EditUser2";
import { EditUser3 } from "./EditUser3";
import { EditUser4 } from "./EditUser4";
import { EditUser5 } from "./EditUser5";
import { Frame } from "./Frame";
import { IconComponentNode } from "./IconComponentNode";
import { Logout } from "./Logout";
import { Setting } from "./Setting";
import ellipse5 from "./ellipse-5.png";
import separator from "./separator.svg";
import "./style.css";

export const AdminPanel = () => {
    return (
        <div className="admin-panel">
            <div className="overlap-wrapper">
                <div className="overlap">
                    <div className="overlap-group">
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
                                                    <div className="dashboard-2">Saved Queries</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="div-wrapper">
                                            <div className="leading-icon-nav-2">
                                                <div className="div-2">
                                                    <Setting
                                                        className="icon-instance-node"
                                                        color="#EFF2F4"
                                                    />
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

                        <img className="separator" alt="Separator" src={separator} />
                    </div>

                    <div className="text-wrapper-3">Admin Settings</div>

                    <div className="users-table">
                        <div className="users-column">
                            <div className="frame-wrapper">
                                <div className="frame-2">
                                    <div className="text-wrapper-4">Users</div>
                                </div>
                            </div>

                            <div className="frame-3">
                                <div className="text-wrapper-5">Dwight Shrute</div>
                            </div>

                            <div className="frame-3">
                                <div className="text-wrapper-5">Ashley Olson</div>
                            </div>

                            <div className="frame-3">
                                <div className="text-wrapper-6">Albus Dumbledore</div>
                            </div>

                            <div className="frame-3">
                                <div className="text-wrapper-5">Will Ferrell</div>
                            </div>

                            <div className="frame-3">
                                <div className="text-wrapper-5">Homer Simpson</div>
                            </div>

                            <div className="frame-3">
                                <div className="text-wrapper-7">Delores O’Riordan</div>
                            </div>

                            <div className="frame-3">
                                <div className="text-wrapper-8">Melanie Chisholm</div>
                            </div>
                        </div>

                        <div className="role-column">
                            <div className="frame-4">
                                <div className="frame-wrapper">
                                    <div className="frame-2">
                                        <div className="text-wrapper-4">Role</div>
                                    </div>
                                </div>

                                <div className="frame-5">
                                    <div className="frame-6">
                                        <div className="text-wrapper-9">Admin</div>
                                    </div>
                                </div>

                                <div className="frame-5">
                                    <div className="frame-7">
                                        <div className="text-wrapper-10">Knowledge Manager</div>
                                    </div>
                                </div>

                                <div className="frame-5">
                                    <div className="frame-7">
                                        <div className="text-wrapper-11">Knowledge Manager</div>
                                    </div>
                                </div>

                                <div className="frame-5">
                                    <div className="frame-7">
                                        <div className="text-wrapper-11">Guest</div>
                                    </div>
                                </div>

                                <div className="frame-5">
                                    <div className="frame-7">
                                        <div className="text-wrapper-11">Knowledge Manager</div>
                                    </div>
                                </div>

                                <div className="frame-5">
                                    <div className="frame-7">
                                        <div className="text-wrapper-11">Admin</div>
                                    </div>
                                </div>

                                <div className="frame-5">
                                    <div className="frame-7">
                                        <div className="text-wrapper-11">Knowledge Manager</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="actions-column">
                            <div className="frame-4">
                                <div className="frame-wrapper">
                                    <div className="frame-8">
                                        <div className="text-wrapper-12">Actions</div>
                                    </div>
                                </div>

                                <div className="frame-9">
                                    <div className="frame-10">
                                        <div className="frame-3">
                                            <ActionsCell
                                                className="actions-cell-instance"
                                                icon={<EditUser className="edit-user-instance" />}
                                                icon1={
                                                    <DeactivateUser className="deactivate-user-instance" />
                                                }
                                                override={
                                                    <DeleteUser className="delete-user-instance" />
                                                }
                                            />
                                        </div>

                                        <div className="frame-3">
                                            <ActionsCell
                                                className="actions-cell-instance"
                                                icon={
                                                    <IconComponentNode className="edit-user-instance" />
                                                }
                                                icon1={
                                                    <DeactivateUser1 className="deactivate-user-instance" />
                                                }
                                                override={
                                                    <DeleteUser1 className="delete-user-instance" />
                                                }
                                            />
                                        </div>

                                        <div className="frame-3">
                                            <ActionsCell
                                                className="actions-cell-instance"
                                                icon={<EditUser1 className="edit-user-instance" />}
                                                icon1={
                                                    <DeactivateUser2 className="deactivate-user-instance" />
                                                }
                                                override={
                                                    <DeleteUser2 className="delete-user-instance" />
                                                }
                                            />
                                        </div>

                                        <div className="frame-3">
                                            <ActionsCell
                                                className="actions-cell-instance"
                                                icon={<EditUser2 className="edit-user-instance" />}
                                                icon1={
                                                    <DeactivateUser3 className="deactivate-user-instance" />
                                                }
                                                override={
                                                    <DeleteUser3 className="delete-user-instance" />
                                                }
                                            />
                                        </div>

                                        <div className="frame-3">
                                            <ActionsCell
                                                className="actions-cell-instance"
                                                icon={<EditUser3 className="edit-user-instance" />}
                                                icon1={
                                                    <DeactivateUser4 className="deactivate-user-instance" />
                                                }
                                                override={
                                                    <DeleteUser4 className="delete-user-instance" />
                                                }
                                            />
                                        </div>

                                        <div className="frame-3">
                                            <ActionsCell
                                                className="actions-cell-instance"
                                                icon={<EditUser4 className="edit-user-instance" />}
                                                icon1={
                                                    <DeactivateUser5 className="deactivate-user-instance" />
                                                }
                                                override={
                                                    <DeleteUser5 className="delete-user-instance" />
                                                }
                                            />
                                        </div>

                                        <div className="frame-3">
                                            <ActionsCell
                                                className="actions-cell-instance"
                                                icon={<EditUser5 className="edit-user-instance" />}
                                                icon1={
                                                    <DeactivateUser6 className="deactivate-user-instance" />
                                                }
                                                override={
                                                    <DeleteUser6 className="delete-user-instance" />
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-wrapper-13">Users</div>

                    <Frame className="frame-50" />
                    <Frame
                        className="frame-instance"
                        text="Manage"
                        text1=""
                        text2=" Query History"
                    />
                    <div className="frame-11">
                        <div className="text-wrapper-14">User Access Logs</div>

                        <div className="text-wrapper-15">Manage</div>
                    </div>

                    <div className="frame-12">
                        <div className="text-wrapper-14">Password Management</div>

                        <div className="text-wrapper-15">Manage</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
