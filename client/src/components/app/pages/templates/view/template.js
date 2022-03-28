import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import ListingTable from './listing/listing';


const Companies = () => {
    const location = useLocation();

    const [industry, setIndustry] = useState('');
    const [noEmployee, setNoEmployee] = useState('');
    const [userLocation, setUserLocation] = useState('');
    const [text, setText] = useState();
    const [active, setActive] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get('active')) {
            const activeParam = params.get('active');

            if (activeParam === 'true') {
                setActive(true);
            } else if (activeParam === 'false') {
                setActive(false);
            }
        } // type
    }, [location.search]);

    return (
        <div className="main-content isPadding">
            <div className="table-wrapper">
                <div className="table-title">
                    <h2>Template List</h2>
                </div>
                <div className="table-filter">
                    <div className="left-filters">
                    </div>
                    <div className="right-filters">
                        <div className="input-wrapper">
                            <input type="text" className="form-control" placeholder="Search" name="text" value={text} onChange={(event) => setText(event.target.value)} />
                            <span className="search-icon fa fa-search"></span>
                            {/* <BiSearch /> */}
                        </div>
                        {/* <div className="btn-wrapper">
                            <button className="btn btn-danger">Clear</button>
                            <button className="btn btn-primary">Search</button>
                        </div> */}
                    </div>
                </div>
                <ListingTable industry={industry} noEmployee={noEmployee} location={userLocation} text={text} isActive={active} />
            </div>
        </div>
    );
};

export default Companies;
