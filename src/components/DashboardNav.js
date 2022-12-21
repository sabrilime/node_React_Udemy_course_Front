import { Link } from 'react-router-dom';

const DasshboardNav = () => {
    const active = window.location.pathname;

    return (
        <ul className='nav nav-tabs'>
            <li className='nav-item'>
                <Link className={`nav-link ${active === "/dashboard" && "active"}`} to="/dashboard">
                    Your bookings
                </Link>
            </li>
            <li className='nav-item'>
                <Link className={`nav-link ${active === "/dashboard/seller" && "active"}`} to="/dashboard/seller">
                    Your hotels
                </Link>
            </li>
        </ul>
    )
};

export default DasshboardNav;