import { NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="fixed top-0 left-0 h-screen w-32 m-0
                        flex flex-col
                        bg-gray-700 text-white">
            <SidebarEntry path="/" text="Feed"/>
            <SidebarEntry path="/register" text="Register"/>
        </div>
    );
}

const SidebarEntry = ({path, text}) => (
    <div class="sidebar-entry">
        <NavLink to={path}>{text}</NavLink>
    </div>
);
