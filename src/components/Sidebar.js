import { FaCoffee, FaHome, FaUserAlt } from 'react-icons/fa';

export default function Sidebar()
{

    

    return(
        <>
            <div className='sidebar-section'>
                <ul class="menu-hover-fill flex flex-col items-start leading-none text-2xl uppercase space-y-4">
                    <li><a href="/" data-text="home">home</a></li>
                    <li><a href="/dash" data-text="new invoice">New Invoice</a></li>
                    <li><a href="#" data-text="old orders">old orders</a></li>
                    <li><a href="#" data-text="categories">categories</a></li>
                    <li><a href="#" data-text="about">about</a></li>
                </ul>
            </div>
        </>
    )
}