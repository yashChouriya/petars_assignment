import React, { useEffect, useState } from 'react';
import Navbar from '../utils/navbar';
import Contents from './Contents';

const Home = () => {
    const [token, setToken] = useState(null)
    useEffect(()=> {
        const token_ = localStorage.getItem('token');
        setToken(token_)
    },[token])


    return (
        <div>
            <div className="homeContainer">

                {token && (<><Navbar value="" page="Dashboard" />
                    <Contents />
                </>
                )}
            </div>
        </div>
    );
};

export default Home;