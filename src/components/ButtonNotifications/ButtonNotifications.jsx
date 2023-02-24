import React, { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/outline";
import Notification from "./Notification";
import { useSelector } from "react-redux";

const ButtonNotifications = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { notifications, noSee } = useSelector(({ notifications }) => notifications);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="relative z-10">
            <button
                onClick={handleClick}
                className="p-1 transition-all duration-200 ease-in-out rounded-full hover:bg-gray-300 z-0"
            >
                <div className="absolute top-0 right-0 flex items-center justify-center w-4 text-xs text-white rounded-full aspect-square bg-rose-600">
                    {noSee}
                </div>
                <BellIcon className="h-6 text-slate-700 " />
            </button>
            <Transition
                show={isOpen}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <div
                    onClick={e => console.log("Abort", e)}
                    id="dropdown"
                    className="absolute top-0 right-0 z-10 max-h-[calc(100vh-(4rem))] overflow-y-auto bg-white divide-y divide-gray-100 shadow rounded-xl w-96 dark:bg-gray-700"
                >
                    <div
                        className="text-sm text-gray-700 dark:text-gray-200 "
                        aria-labelledby="dropdownDefault"
                    >
                        {notifications.map((notification) => (
                            <Notification
                                key={notification.idNotification}
                                notification={notification}
                            />
                        ))}
                    </div>
                </div>
            </Transition>
        </div>
    );
}

export default ButtonNotifications;
