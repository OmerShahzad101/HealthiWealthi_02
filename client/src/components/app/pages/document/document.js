import { useState } from 'react';
import SelectDropdown from '../../../common/react-select/SelectDropdown/SelectDropdown';
import PersonSelect from '../../../common/react-select/PersonSelect/PersonSelect';
import { FiSearch } from 'react-icons/fi';
import { BiPlus } from 'react-icons/bi';
import { Button, Form, Modal, Spinner, FloatingLabel } from 'react-bootstrap';
import ListingTable from './documentListing/DocumentListing';

import './portfolio.scss';

const Portfolio = () => {
    const [show, setShow] = useState(false);
    const [text, setText] = useState();
    // const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShow(false);
    const [isLoading] = useState(false);
    const handleShow = () => setShow(true);

    return (
        <div className="main-content isPadding">
            <div className="table-wrapper">
                <div className="table-title">
                    <h2>Document List</h2>
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
                <ListingTable  text={text}/>
            </div>
        </div>
    );
};

export default Portfolio;
