import { useState, useEffect } from "react";
import DasshboardNav from "../components/DashboardNav";
import ConnectNav from "../components/ConnectNav";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HomeOutlined } from '@ant-design/icons';
import { creacteConnectAccount } from "../actions/stripe";
import { sellerHotels, deleteHotel } from "../actions/hotel";
import { toast } from "react-toastify";
import SmallCard from '../components/cards/SmallCard';

const DashboardSeller = () => {
    const { auth } = useSelector((state) => ({ ...state }));
    const [loading, setLoading] = useState(false);
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        loadSellerHotels()
    }, [])

    const loadSellerHotels = async () => {
        let {data} = await sellerHotels(auth.token);
        setHotels(data);
    }

    const handleClick = async() => {
        setLoading(true);
        try {
            let res = await creacteConnectAccount(auth.token)
            console.log(res) // get login link
            window.location.href = res.data;
        } catch (err) {
            console.log(err);
            toast.error('Stripe connect failed. Try again');
            setLoading(false);
        }
    };

    const handleHotelDelete = async(hotelId) => {
        if(!window.confirm('Are You sure ?')) return;
        deleteHotel(auth.token, hotelId).then((res) => {
            toast.success('Hotel Deleted');
            loadSellerHotels();
        });
    };

    const connected = () => (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10">
                    <h2>Your Hotels</h2>
                </div>
                <div className="col-md-2">
                    <Link to="/hotels/new" className="btn btn-primary">
                        + Add New
                    </Link>
                </div>
            </div>

            <div className="row">
                {hotels.map(h => 
                    <SmallCard 
                        key={h._id} 
                        h={h} 
                        showViewMoreButton={false} 
                        owner={true} 
                        handleHotelDelete={handleHotelDelete}
                    /> 
                )}
            </div>
        </div>
    )

    const notConnected  = () => (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6 offset-md-3 text-center">
                    <div className="p-5 pointer">
                        <HomeOutlined className="h1" />
                        <h4>Setup payouts to post hotel rooms</h4>
                        <p className="lead">MERN partners with stripe to transfer earnings to your bank account</p>
                        <button disabled={loading} onClick={handleClick} className="btn btn-primary mb-3">
                            { loading ? "Processing..." : "Setup Payouts" } 
                        </button>
                        <p className="text-muted"><small>You'll be redirected to Stripe.</small></p>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <>
            <div className="container-fluid bg-secondary p-5">
                <ConnectNav />
            </div>

            <div className="container-fluid p-4">
                <DasshboardNav /> 
            </div>

            {
                auth && 
                auth.user && 
                auth.user.stripe_seller && 
                auth.user.stripe_seller.charges_enabled ? 
                connected() : notConnected()
            }
            {/*<pr>{JSON.stringify(auth, null, 4)}</pr>*/}

        </>
    )
};

export default DashboardSeller;