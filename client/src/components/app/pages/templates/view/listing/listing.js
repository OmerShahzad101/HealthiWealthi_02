import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useHistory } from 'react-router';
import axios from 'axios';
import { DateTime } from 'luxon';
 
import ActionsCell from './cell/action-cell';
import TopProgressBar from '../../../../../common/top-progress-bar/TopProgressBar';

import { COMPANY_DETAILS } from '../../../../../../router/constants/ROUTES';
import capitalize from '../../../../../../utils/string/capitalize';
import { cancelOngoingHttpRequest, postHttpRequest } from '../../../../../../axios';

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
            fontSize: '16px',
            padding: '16px 16px',
            fontFamily: 'var(--Graphik-Semibold)',
        },
    },
    cells: {
        style: {
            'padding': '16px 16px',

            'white-space': 'normal',
            '&:last-child': {
                'min-width': '150px',
            },
            '&:nth-child(n+3)': {
                ' > div': {
                    width: '100%',
                },
                'color': '#566477',
            },
        },
    },
};

export default function ListingTable(props) {
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(false);
    const [listingData, setListingData] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
         
        getTemplateList();

        return cancelOngoingHttpRequest;
    }, [pageNumber, rowsPerPage, props.text]);


    const getTemplateList = () => {
        const payload = {
            pageNumber,
            rowsPerPage,
            text: props.text,
        };

        // Set `isLoading` state to `true` before sending the HTTP request
        setIsLoading(true);

        // Send the HTTP POST request for fetching the requested data
        postHttpRequest('/template/list-index', payload)
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

    function updateListingData(index, data) {
        getTemplateList();
    }

    const columns = [
        {
            name: 'ID',
            selector: (row) => row._id,
            format: (row) => capitalize(row._id),
            sortable: true,
        },
        {
            name: 'Title',
            selector: (row) => row.templateTitle,
            sortable: true,
            wrap: false,
        },
        {
            name: 'Status',
            selector: (row) => 'Share',
            sortable: true,
        },
        {
            name: 'Created',
            selector: (row) =>   DateTime.fromISO(row.createdAt).toFormat('yyyy LLL dd'),
            sortable: true,
        },
        {
            name: 'Actions',
            selector: (row, index) => <ActionsCell template={row} index={index} updateListingData={updateListingData} />,
            sortable: true,
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
                    // onRowClicked={(row) => history.push(`${COMPANY_DETAILS}/${row._id}`)} // Callback to access the row, event on row click.
                    customStyles={customStyles}
                />
            </div>
        </div>
    );
}
