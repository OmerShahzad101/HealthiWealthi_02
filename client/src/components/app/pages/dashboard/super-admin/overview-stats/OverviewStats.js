import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {  Badge } from 'react-bootstrap'

import Toast from '../../../../../common/toast/Toast';
import TopProgressBar from '../../../../../common/top-progress-bar/TopProgressBar';

import { postHttpRequest } from '../../../../../../axios';
import { TEMPLATE, USERS, FINANCE } from '../../../../../../router/constants/ROUTES';


function initialStatsData() {
    return [
        {
            title: 'No of Templates',
            value: 0,
            url: TEMPLATE,
            percentage: '70%',
        },
        {
            title: 'Completed Work Flow',
            value: 0,
            url: `${TEMPLATE}?active=true`,
            percentage: '80%',
        },
        {
            title: 'Pending',
            value: 0,
            url: USERS,
            percentage: '100%',
        },
        {
            title: 'Signed',
            value: 0,
            url: `${USERS}?active=true`,
            percentage: '50%',
        },
       
    ];
}

const OverviewStats = ({ startDate, endDate }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [stats, setStats] = useState(initialStatsData());

    useEffect(() => {
        setIsLoading(true);
        debugger
        postHttpRequest('/dashboard/overview', { startDate, endDate })
            .then((response) => {
                setIsLoading(false);
                debugger
                if (!response) {
                    console.log('Something went wrong with response...');
                    return;
                }

                if (response.data?.success === true) {
                    setStats(response.data.data);
                } else {
                    Toast.fire({
                        icon: 'error',
                        title: response.data.message,
                    });
                }
            })
            .catch((error) => {
                if (!axios.isCancel(error)) {
                    setIsLoading(false);
                    setStats(initialStatsData());
                }
            });
    }, [startDate, endDate]);

    return stats.map((item) => (
        <div className="col-md-3" key={item.title}>
            <div className="item">
                <div className="title">
                    <h4>{item.title}</h4>
                </div>
                <Link to={item.url} className="content">
                    <h3>{item.value}</h3>
                    <div className="total">
                        <span className="number">Total</span>
                        <Badge bg="primary">{item.percentage}</Badge>
                    </div>
                </Link>
            </div>
        </div>
        // <div key={item.title} className={` d-flex align-items-center`}>
        //     <TopProgressBar show={isLoading} />
        //     <Link to={item.url}>
        //         <div className=''>
        //             <span>{item.title}</span>
        //             <p className=''>{item.value}</p>
        //         </div>
        //     </Link>
        // </div>
    ));
};

export default OverviewStats;
