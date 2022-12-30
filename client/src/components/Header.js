import { 
    Navbar,
    Typography,
    Button
 } from '@material-tailwind/react';

export default function Header() {

    const navList = (
        <ul className = "mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a href="/" className="flex items-center">
                    Posts
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a href="/" className="flex items-center">
                    Account
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a href="/" className="flex items-center">
                    Blocks
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a href="/" className="flex items-center">
                    Docs
                </a>
            </Typography>
        </ul>
    );

    return (
        // <div className="header-nav bg-gray-500">
        //     <button className="text-center text-3xl">Log In</button>
        // </div>

        <Navbar className='mx-auto max-w-screen-xl mt-4 shadow-none bg-transparent'>
            <div className='container mx-auto flex items-center justify-between text-blue-gray-900'>
                <Typography 
                    as="a"
                    href="#"
                    variant="small"
                    className="mr-4 cursor-pointer py-1.5 font-normal"
                >
                    <span>Material Tailwind App</span>
                </Typography>
                <div className="block">{navList}</div>
                <Button ripple={true} variant="filled" className='bg-black'>Log In</Button>
            </div>
        </Navbar>
    );
}