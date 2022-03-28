import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import TopProgressBar from '../../../../../common/top-progress-bar/TopProgressBar';
import { cancelOngoingHttpRequest, postHttpRequest } from '../../../../../../axios';

import './listing.scss';

const columns = [
    {
        name: 'Name',
        selector: (row) => row.name,
        sortable: true,
    },
    {
        name: 'Dept. Head',
        selector: (row) => row.deptHead,
        sortable: true,
        wrap: false,
    },
    {
        name: 'Score',
        selector: (row) => row.dignoScore,
        sortable: true,
    },
    {
        name: 'Members',
        selector: (row) => row.member,
        sortable: true,
    },
];

const customStyles = {
    headRow: {
        style: {
            paddingInline: '24px',
        },
    },
    rows: {
        style: {
            paddingInline: '24px',
        },
    },
    headCells: {
        style: {
            fontSize: '14px',
            padding: '16px 16px',
            fontFamily: 'var(--Graphik-Semibold)',
        },
    },
    cells: {
        style: {
            'padding': '16px 16px',
            '&:nth-child(n+3)': {
                color: '#566477',
            },
            '&:last-child': {
                color: '#566477',
            },
        },
    },
};

export default function ListingTable(props) {
    const location = useLocation();

    const [isLoading, setIsLoading] = useState(false);
    const [listingData, setListingData] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const companyID = params.get('companyID'); // companyId

        const payload = {
            pageNumber,
            rowsPerPage,
            companyID,
            text: props.text,
        };

        // Set `isLoading` state to `true` before sending the HTTP request
        setIsLoading(true);

        // Send the HTTP POST request for fetching the requested data
        postHttpRequest('/department/admin-all', payload)
            .then((response) => {
                setIsLoading(false);

                if (!response) {
                    console.log('Something went wrong with response...');
                    return;
                }

                if (response?.data?.success === true) {
                    setListingData(response.data.data);
                    setTotalRows(response.data.count);
                } else {
                    console.log('no data found');
                }
            })
            .catch((error) => {
                if (!axios.isCancel(error)) {
                    setIsLoading(false);
                    setListingData([]);
                    setTotalRows(0);
                }
            });

        return cancelOngoingHttpRequest;
    }, [props.text, pageNumber, rowsPerPage, location.search]);

    function handleChangePageNumber(number) {
        setPageNumber(number);
    }

    function handleChangeRowsPerPage(currentRowsPerPage) {
        setRowsPerPage(currentRowsPerPage);
    }

    return (
        <div
            style={{
                width: '100%',
                overflowX: 'auto',
                filter: 'drop-shadow(0px 0px 52px rgba(222, 227, 240, 0.5))',
                borderRadius: '20px',
            }}
        >
            <TopProgressBar show={isLoading} />

            <div>
                <DataTable
                    columns={columns}
                    data={listingData}
                    keyField="_id"
                    persistTableHead // Show the table head (columns) even when progressPending is true.
                    // selectableRows // Whether to show selectable checkboxes
                    pagination // Enable pagination with defaults
                    paginationServer // Changes the default pagination to work with server side pagination
                    progressPending={isLoading} // Disables the table and displays a plain text Loading Indicator
                    paginationDefaultPage={pageNumber} // The default page to use when the table initially loads
                    paginationPerPage={rowsPerPage} // The default rows per page to use when the table initially loads
                    paginationRowsPerPageOptions={[10, 15, 20, 30, 50]} // Row page dropdown selection options
                    paginationTotalRows={totalRows}
                    onChangePage={handleChangePageNumber}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    customStyles={customStyles}
                />
            </div>
        </div>
    );
}
