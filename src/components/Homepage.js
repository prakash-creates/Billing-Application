import './Homepage.css'
import Sidebar from './Sidebar';

export default function Homepage()
{
    return(
        <>
        <div className='homepage-main'>
            <Sidebar/>
            <div className='display-3 text-center homepage-base'>
                <p className='page-heading'> Homepage</p>
            </div>
        </div>
        </>
    )
}