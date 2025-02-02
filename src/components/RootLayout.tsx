import {Outlet} from "react-router-dom";

export const RootLayout = () => {
    return (
        <div className="flex w-full h-screen">

            {/* Main Content */}
            <div className="flex-1 overflow-auto bg-gray-100">
                <Outlet />
            </div>
        </div>
    );
};
