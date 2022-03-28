import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import { EditIcon } from '../../../../../../../../assets/SVGs/SVGs';
import TopProgressBar from '../../../../../../../common/top-progress-bar/TopProgressBar';

import { postHttpRequest } from '../../../../../../../../axios';
import { EDIT_Template } from '../../../../../../../../router/constants/ROUTES';

import { AiFillDelete,  } from 'react-icons/ai';
import { BsFillShareFill } from "react-icons/bs";

import './actionCell.scss';

export default function Action({ template, index, updateListingData }) {
    const [isLoading, setIsLoading] = useState(false);

    function toggleCompanyStatus() {
        let title = 'Delete Template';
        let confirmButtonText = 'Delete';
        let text = 'Are you sure you want to Delete this template?';

        Swal.fire({
            title,
            text,
            confirmButtonText,
            denyButtonText: `Cancel`,
            showDenyButton: true,
            padding: '16px 30px',
            width: '530px',
            customClass: {
                denyButton: 'deny-class',
                confirmButton: 'confirm-class',
                title: 'title',
                htmlContainer: 'text',
            },
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                setIsLoading(true);

                postHttpRequest(`/template/delete/${template._id}`)
                    .then((response) => {
                        if (!response) {
                            console.log('Something went wrong with response...');
                            return;
                        }

                        if (response.data?.success === true) {
                            updateListingData();
                            // window.location.reload(); // TEMPORARY
                        }
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });

                Swal.fire({
                    title: 'Updated',
                    icon: 'success',
                    customClass: {
                        confirmButton: 'btn-primary',
                    },
                });
            } else if (result.isDenied) {
                Swal.fire('Changes are not Trigger', '', 'info');
            }
        });
    }

    return (
        <div data-tag="allowRowEvents" className="acions-btns">
            <TopProgressBar show={isLoading} />

            <div className="share">
                <Link to={`${EDIT_Template}/${template._id}`}>
                    <BsFillShareFill />
                </Link>
            </div>

            <div className="delete"  onClick={toggleCompanyStatus} >
                {/* <Button  onClick={toggleCompanyStatus}> */}
                    <AiFillDelete />
                {/* </Button> */}
            </div>
        </div>
    );
}
