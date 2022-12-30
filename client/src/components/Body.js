import Sidebar from './Sidebar';

export default function Body({sidebar, children}){
    return (
        <div className='body-container mx-auto max-w-screen-xl my-10'>
            {sidebar && <Sidebar/>}
            <div className='content mx-10'>
                {children}
            </div>
        </div>
    );
}