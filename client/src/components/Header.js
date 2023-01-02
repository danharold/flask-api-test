import { 
    Navbar,
    Typography,
    Button
 } from '@material-tailwind/react';
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrow } from '@fortawesome/free-solid-svg-icons';

export default function Header({user}) {

    const navList = (
        <ul className = "mb-4 mt-2 flex flex-col lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
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
        <Navbar className='header-nav mx-auto max-w-screen-xl mt-4 shadow-none bg-blue-gray-50 border-none'>
            <div className='flex flex-wrap p-0 m-0 items-center justify-between content-between text-black'>
                <div className='flex items-center'>
                <FontAwesomeIcon icon={faCrow} className="h-10 text-blue-500 mr-3"/>
                    <Typography 
                        as="a"
                        href="/"
                        variant="small"
                        className="mr-4 cursor-pointer py-1.5 font-regular text-3xl"
                        color="blue"
                        textGradient
                    >
                        Bootleg Bird App
                    </Typography>
                </div>
                {/* <div className="nav-list text-blue-gray-100 ">{navList}</div>         */}
                {!user && <Button ripple={true} variant="filled" className='p-2 pl-3 pr-3 rounded-md'>
                    <NavLink to="/login">Login</NavLink>
                </Button>}
            </div>
        </Navbar>
    );
}