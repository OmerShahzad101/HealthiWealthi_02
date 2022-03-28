import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import axios from 'axios';

import SubscriptionUsersChart from './subscription-users/chart/SubscriptionUsersChart';
import OverviewStats from './overview-stats/OverviewStats';
import TopProgressBar from '../../../../common/top-progress-bar/TopProgressBar';


import ListingTable from '../../document/documentListing/DocumentListing';


import { cancelOngoingHttpRequest, postHttpRequest } from '../../../../../axios';


export default function SuperAdminDashboard() {
    // Date range picker state
    const [startDate, setStartDate] = useState(DateTime.now().minus({ days: 6 }).startOf('day'));
    const [endDate, setEndDate] = useState(DateTime.now().endOf('day'));

    // Loaders
    const [isLeaderboardDataLoading, setIsLeaderboardDataLoading] = useState(false);
    const [isSubscriptionStatsLoading, setIsSubscriptionStatsLoading] = useState(false);

    // Subscription users' state
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalPaidUsers, setTotalPaidUsers] = useState(0);

    // Leader board state
    const [globalDignoScore, setGlobalDignoScore] = useState(0);
    const [companiesLeaderBoardData, setCompaniesLeaderBoardData] = useState([]);
    const [employeesLeaderBoardData, setEmployeesLeaderBoardData] = useState([]);

    // Cancel the ongoing request when the component unmounts
    // useEffect(() => {
    //     return cancelOngoingHttpRequest;
    // }, []);

    // Get the leader board data on page load
    // useEffect(() => {
    //     setIsLeaderboardDataLoading(true);

    //     postHttpRequest('/dashboard/admin-leaderBoard', { startDate, endDate })
    //         .then((response) => {
    //             setIsLeaderboardDataLoading(false);

    //             if (!response) {
    //                 console.log('Something went wrong with response...');
    //                 return;
    //             }

    //             if (response.data?.success === true) {
    //                 setCompaniesLeaderBoardData(response.data.data?.company);
    //                 setEmployeesLeaderBoardData(response.data.data?.user);
    //                 setGlobalDignoScore(response.data.data?.score);
    //             }
    //         })
    //         .catch((error) => {
    //             if (!axios.isCancel(error)) {
    //                 setIsLeaderboardDataLoading(false);
    //                 setCompaniesLeaderBoardData([]);
    //                 setEmployeesLeaderBoardData([]);
    //                 setGlobalDignoScore(0);
    //             }
    //         });
    // }, [startDate, endDate]);

    // Get the subscribed users' stats
    // useEffect(() => {
    //     setIsSubscriptionStatsLoading(true);

    //     postHttpRequest('/dashboard/get-subscription-stats', { startDate, endDate })
    //         .then((response) => {
    //             setIsSubscriptionStatsLoading(false);

    //             if (!response) {
    //                 console.log('Something went wrong with response...');
    //                 return;
    //             }

    //             if (response.data?.success === true) {
    //                 setTotalRevenue(response.data.totalRevenue);
    //                 setTotalPaidUsers(response.data.totalPaidUsers);
    //             }
    //         })
    //         .catch((error) => {
    //             if (!axios.isCancel(error)) {
    //                 setIsSubscriptionStatsLoading(false);
    //                 setTotalRevenue(0);
    //                 setTotalPaidUsers(0);
    //             }
    //         });
    // }, [startDate, endDate]);

    function dateRangeChangedHandler(dateRange) {
        setStartDate(dateRange.start);
        setEndDate(dateRange.end);
    }

    // Render the component
    return (
        <div className="main-content isPadding">
            <TopProgressBar show={isLeaderboardDataLoading || isSubscriptionStatsLoading} />

            <div className=''>


                <div className={` dgCards dg-mb-24`}>
                    {/* <h3>Overview</h3> */}

                    <div className="reports">
                        <div className="row">
                        <OverviewStats startDate={startDate} endDate={endDate} />
                            
                        </div>
                    </div>
                </div>
                <div className={` row d-flex justify-content-between `}>
                    <div className="col-xl-8 col-lg-12">
                        <div className=''>
                            <div className={` dgCards`}>
                                <div className=''>
                                    <SubscriptionUsersChart startDate={startDate} endDate={endDate} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={` dgCards dg-mb-24`}>
                    <div className="reports">
                        <div className="row">
                           <ListingTable />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
