import { 
    Navbar,
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem
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

    function signOut() {
        document.cookie = 'auth-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        window.location.reload();
    }

    return (
        <>
        <Navbar className='header-nav mx-auto max-w-screen-xl my-2 shadow-none bg-blue-gray-50 border-none'>
            <div className='flex flex-wrap p-0 m-0 items-center justify-between content-between text-black'>
                <NavLink to="/" className='flex items-center'>
                    <FontAwesomeIcon icon={faCrow} className="h-10 text-blue-500 mr-3"/>
                    <Typography
                        variant="small"
                        className="mr-4 cursor-pointer py-1.5 font-regular text-3xl"
                        color="blue"
                        textGradient
                    >
                        Bird App
                    </Typography>
                </NavLink>
                {/* <div className="nav-list text-blue-gray-100 ">{navList}</div>         */}
                {user ? <>
                    <Menu>
                        <MenuHandler>
                            <Typography
                            variant="small"
                            className="mr-4 cursor-pointer py-1.5 font-regular text-xl"
                            color="blue"
                            >
                                {user.display_username}
                            </Typography>
                        </MenuHandler>
                        <MenuList>
                            <MenuItem>Profile</MenuItem>
                            <MenuItem>Account</MenuItem>
                            <MenuItem onClick={signOut}>Sign Out</MenuItem>
                        </MenuList>
                    </Menu>
                </>
                : <NavLink to="/login"><Button ripple={true} variant="filled" className='p-2 pl-3 pr-3 rounded-md'>
                    Login
                </Button></NavLink>}
            </div>
        </Navbar>
        <hr className="border-1 border-gray-400 min-w-max"/>
        </>
    );
}