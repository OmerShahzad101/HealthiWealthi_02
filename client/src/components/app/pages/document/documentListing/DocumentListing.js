import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { DateTime } from 'luxon';

import TopProgressBar from '../../../../common/top-progress-bar/TopProgressBar';

import ActionBtn from '../action/ActionButton';

import userHasPermission from '../../../../../utils/auth/userHasPermission';
import { DOCUMENT_DETAILS } from '../../../../../router/constants/ROUTES';

import { cancelOngoingHttpRequest, postHttpRequest } from '../../../../../axios';

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
            color: '#242429',
        },
    },
    cells: {
        style: {
            'div:first-child': {
                overflow: 'unset !important',

            },
            '&:nth-child(2)': {
                color: '#485361',
                fontWeight: 'bold',
                fontSize: '14px',
            },
            '&:nth-child(6)': {
                justifyContent: 'end',
            },
            'padding': '16px 16px',
            'white-space': 'normal',
        },
    },
};

const PortfolioListing = (props) => {
    const history = useHistory();
    const location = useLocation();

    const [isLoading, setIsLoading] = useState(false);
    const [listingData, setListingData] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);

    // useEffect(() => {
    //     cancelOngoingHttpRequest();
    // }, []);

    useEffect(() => {

        getList();

        // return cancelOngoingHttpRequest;
    }, [pageNumber, rowsPerPage, props.text, location ]);


    function getList(){
        const params = new URLSearchParams(location.search);
        const type = params.get("type"); // access_path

        const payload = {
            pageNumber,
            rowsPerPage,
            text: props.text,
            type
        };

        // Set `isLoading` state to `true` before sending the HTTP request
        setIsLoading(true);

        // Send the HTTP POST request for fetching the requested data
        postHttpRequest('/document/allUser', payload)
            .then((response) => {
                // Once data is received from the API, set `isLoading` state to `false` again
                setIsLoading(false);
                
                if (!response) {
                    console.log('Something went wrong with response...');
                    return;
                }
                if (response?.data?.success === true) {
                    setListingData(response.data.documents);
                    setTotalRows(response.data.count);
                }
            })
            .catch((error) => {
                if (!axios.isCancel(error)) {
                    setIsLoading(false);
                    setListingData([]);
                    setTotalRows(0);
                }
            });
    }

    function handleChangePageNumber(number) {
        setPageNumber(number);
    }

    function handleChangeRowsPerPage(currentRowsPerPage) {
        setRowsPerPage(currentRowsPerPage);
    }

    const columns = [
        {
            name: 'ID',
            selector: (row) => row._id,
        },
        {
            name: 'Title',
            selector: (row) => row.title,
        },
        {
            name: 'Status',
            selector: (row) => <> 
                                {row.status === 'signed' ?  <span className='badge bg-success'>Signed</span> : ""}
                                {row.status === 'inprogress' ?  <span className='badge bg-warning text-dark'>In Progress</span> : ""}
                                {row.status === 'declined' ?  <span className='badge rounded-pill bg-danger'>Declined</span> : ""}
                                </>
        },
        {
            name: 'Created',
            selector: (row) => DateTime.fromISO(row.createdAt).toFormat('yyyy LLL dd'),
        },
        {
            name: 'Action',
            selector: (row) => <ActionBtn   status={row.status} id={row._id} updateListingData={updateListingData} />,
        },
    ];

    function updateListingData(index, data) {
        getList();
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
                    pointerOnHover
                    highlightOnHover
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
                    // onRowClicked={(row) => userHasPermission('view-document-details') && history.push(`${DOCUMENT_DETAILS}/${row._id}`)} // Callback to access the row, event on row click.
                    customStyles={customStyles}
                />
            </div>
        </div>
    );
};

export default PortfolioListing;
