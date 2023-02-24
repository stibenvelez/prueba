
import { Outlet } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
// import SideBar from "./components/ui/sidebar/SideBar";
import { lazy, Suspense } from 'react';
const SideBar = lazy(() => import('./components/ui/sidebar/SideBar'));

const Layout = () => {

    return (
        <div className="flex w-full h-screen bg-gray-50">
            <div className="w-full h-full overflow-y-auto">
                <Navbar/>
                <div className="p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
