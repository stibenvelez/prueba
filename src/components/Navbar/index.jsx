import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../helpers/Socket";
import { getNotificationsAction } from "../../redux/notifications/notifications.actions";
import ButtonNotifications from "../ButtonNotifications/ButtonNotifications";
import MenuProfile from "./MenuProfile";

const Navbar = () => {
    const { idUser, firstName } = useSelector(({ auth }) => auth.user);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     socket.on("newProduct", () => {
    //         dispatch(getNotificationsAction(idUser));
    //     });
    //     return () => {
    //         socket.off();
    //     };
    // });

    return (
        <div className="flex items-center justify-between h-10 p-2 bg-gray-200 shadow">
            <div className="flex justify-end"></div>
            <div className="flex justify-end">
                <div className="flex items-center gap-3">
                    <ButtonNotifications />
                    <MenuProfile />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
