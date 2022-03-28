import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import { DateTime } from 'luxon';
 
import AssignTo from '../../../Goals&Tasks/Goals/AssignTo';
import TopProgressBar from '../../../../../common/top-progress-bar/TopProgressBar';

import userHasPermission from '../../../../../../utils/auth/userHasPermission';
import { cancelOngoingHttpRequest, postHttpRequest } from '../../../../../../axios';
import { USERS_DETAILS } from '../../../../../../router/constants/ROUTES';

import ActionButton from '../../action/ActionButton';


import './listing.scss';

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
            'fontSize': '15px',
            'padding': '16px 16px',
            'fontFamily': 'var(--Graphik-Semibold)',
            '&:last-child': {
                '> div': {
                    '.lnndaO': {
                        overflow: 'unset',
                    },
                },
            },
        },
    },
    cells: {
        style: {
            'padding': '16px 16px',
            'fontSize': '15px',

            '&:nth-child(n+3)': {
                color: '#566477',
                fontSize: '15px',
            },

            '&:nth-child(2), &:nth-child(3) ': {
                'div:first-child': {
                    all: 'unset',
                },
            },

        },
    },
};

export default function ListingTable(props) {
    const history = useHistory();
    const location = useLocation();

    const [isLoading, setIsLoading] = useState(false);
    const [listingData, setListingData] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        getUserList();
        return cancelOngoingHttpRequest;
    }, [props.text, props.type, pageNumber, rowsPerPage, location.search]);


    useEffect(() => {
        if(props.refreshListing){
            getUserList();
        }
        return cancelOngoingHttpRequest;
    }, [props.refreshListing]);


    function getUserList() {
        const params = new URLSearchParams(location.search);
        const companyID = params.get('companyID'); // companyId
        const isActive = params.get('active'); // type

        const payload = {
            pageNumber,
            rowsPerPage,
            companyID,
            isActive,
            text: props.text,
            type: props.type,
        };

        // Set `isLoading` state to `true` before sending the HTTP request
        setIsLoading(true);

        // Send the HTTP POST request for fetching the requested data
        postHttpRequest('/user/admin-all', payload)
            .then((response) => {
                setIsLoading(false);

                if (!response) {
                    console.log('Something went wrong with response...');
                    return;
                }

                if (response?.data?.success === true) {
                    setListingData(response.data.data);
                    setTotalRows(response.data.count);
                    // props.setUserCount(response.data.count);
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
    }

    function handleChangePageNumber(number) {
        setPageNumber(number);
    }
    
    function handleChangeRowsPerPage(currentRowsPerPage) {
        setRowsPerPage(currentRowsPerPage);
    }
    const columns = [
        {
            name: 'User Name',
            selector: (row) => <AssignTo avatar={row.avatar} userName={row.userName} />,
            sortable: true,
            grow: 1.5,

        },
        {
            name: 'Email',
            selector: (row) => row.email,
            sortable: true,
            grow: 1.5,
        },
        {
            name: 'Role',
            selector: (row) => (row.role === '302' ? 'SubUser' : 'Admin User'),
            sortable: true,
            grow: 1.5,

        },
        {
            name: 'Created At',
            selector: (row) =>  DateTime.fromISO(row.createdAt).toFormat('yyyy LLL dd'),
            sortable: true,
        },
        {
            name: 'Action',
            selector: (row) => <ActionButton   row={row}  getUserList={getUserList}/>,
            sortable: true,
            grow: 1.5,

        },
    ];

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
                    // pointerOnHover
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
                    // onRowClicked={(row) => userHasPermission('view-company-user-details') && history.push(`${USERS_DETAILS}/${row._id}`)} // Callback to access the row, event on row click.
                    customStyles={customStyles}
                />
            </div>
        </div>
    );
}
