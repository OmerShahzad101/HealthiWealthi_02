import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import axios from 'axios';

import TopProgressBar from '../../../../../../common/top-progress-bar/TopProgressBar';
import { postHttpRequest } from '../../../../../../../axios';

function initialData() {
    return [{ name: 'Jan' }, { name: 'Feb' }, { name: 'Mar' }, { name: 'Apr' }, { name: 'May' }, { name: 'Jun' }, { name: 'Jul' }, { name: 'Aug' }, { name: 'Sep' }, { name: 'Oct' }, { name: 'Nov' }, { name: 'Dec' }];
}


const SubscriptionUsersChart = ({ startDate, endDate }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(initialData());

    // Get the subscription users chart data on page load
    useEffect(() => {
        setIsLoading(true);

        postHttpRequest('/dashboard/admin-adminChartData', { startDate, endDate })
            .then((response) => {
                setIsLoading(false);

                if (!response) {
                    console.log('Something went wrong with response...');
                    return;
                }

                if (response.data?.success === true) {
                    setData(response.data.data);
                }
            })
            .catch((error) => {
                if (!axios.isCancel(error)) {
                    setIsLoading(false);
                    setData(initialData());
                }
            });
    }, [startDate, endDate]);

    // Render the chart
    return (
        <>
            <TopProgressBar show={isLoading} />

            {/* <ResponsiveContainer width="99%" height="99%"> */}
                <LineChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="4 4" vertical={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#566477', color: 'white' }} itemStyle={{ color: 'white' }} cursor={false} />
                    <XAxis dataKey="name" tickLine={false} tick={{ fill: '#082678', opacity: '0.6' }} />
                    <YAxis type="number" tickLine={false} domain={['auto', 'auto']} tick={{ fill: '#566477' }} />
                    <Line dataKey="InProgress" stroke="#151522" activeDot={{ r: 8 }} type="monotone" />
                    <Line dataKey="Signed" stroke="#647082" activeDot={{ r: 8 }} type="monotone" />
                    <Line dataKey="Declined" stroke="#818387" activeDot={{ r: 8 }} type="monotone" />
                </LineChart>
            {/* </ResponsiveContainer> */}
        </>
    );
};

export default SubscriptionUsersChart;
