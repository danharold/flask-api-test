import Sidebar from './Sidebar';
import { NavLink } from "react-router-dom";

export default function Body({sidebar, children}){
    return (
        <div className='body-container'>
            {sidebar && <Sidebar/>}
            <div className='content'>
                {children}
            </div>
        </div>
    );
}