import { 
    Navbar,
    Typography,
    Button
 } from '@material-tailwind/react';
import { NavLink } from "react-router-dom";

export default function Header() {

    const navList = (
        <ul className = "nav-list mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal nav-text"
            >
                <NavLink to="/" className="flex items-center">
                    Posts
                </NavLink>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal nav-text"
            >
                <NavLink to="/profile" className="flex items-center">
                    Profile
                </NavLink>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal nav-text"
            >
                <NavLink to="/blocks" className="flex items-center">
                    Blocks
                </NavLink>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal nav-text"
            >
                <NavLink to="/docs" className="flex items-center">
                    Docs
                </NavLink>
            </Typography>
        </ul>
    );

    return (
        // <div className="header-nav bg-gray-500">
        //     <button className="text-center text-3xl">Log In</button>
        // </div>

        <Navbar className='header-nav mx-auto max-w-screen-xl mt-4 shadow-none bg-blue-gray-50 border-none'>
            <div className='container mx-auto flex items-center justify-between text-black'>
                <Typography 
                    as="a"
                    href="#"
                    variant="small"
                    className="mr-4 cursor-pointer py-1.5 font-normal"
                >
                    <span>Material Tailwind App</span>
                </Typography>
                <div className="block nav-list text-blue-gray-100 ">{navList}</div>        
                <Button ripple={true} variant="filled" className='bg-black'>
                    <NavLink to="/login">Login</NavLink>
                </Button>
            </div>
        </Navbar>
    );
}