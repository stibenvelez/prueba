import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";
import {
    getNotifications,
    getNotificationsError,
    getNotificationsSuccess,
} from "./notifications.slice";

export const getNotificationsAction = (idUser) => async (dispatch) => {
    dispatch(getNotifications());
    try {
        tokenAuth();
        const res = await clienteAxios.get("/notifications",{params: { idUser } });
        dispatch(getNotificationsSuccess(res.data));
    } catch (error) {
        console.log(error);
        dispatch(getNotificationsError());
    }
};
