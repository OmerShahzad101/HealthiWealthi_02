import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Form, Button, Tabs, Tab } from 'react-bootstrap';
import { FiPlus, FiSearch } from 'react-icons/fi';

import ListingTable from './listing/listing';
import SelectDropdown from '../../../../common/react-select/SelectDropdown/SelectDropdown';
import InviteModel from '../../settings/employeeData/inviteModal/InviteModal';

import './index.scss';

const UserFilter = () => {
    const [showInvite, setShowInvite] = useState(false);

    const [refreshListing, setRefreshListing] = useState(false);

    const handleShowInvite = () => {
        setRefreshListing(false);
        setShowInvite(true);
    };

    const handleCloseInvite = () => {
        setShowInvite(false);
        setRefreshListing(true);
    };
    const [userCount, setUserCount] = useState(0);
    const [departmentCount, setDepartmentCount] = useState(0);

    const location = useLocation();

    const [type, setType] = useState('');
    const [text, setText] = useState('');
    const role = [
        { value: 'manager', label: 'Manager' },
        { value: 'employee', label: 'Employee' },
    ];

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get('type')) setType(params.get('type')); // type
    }, [location.search]);

    return (
        <div className="main-content isPadding">
            <div className="table-wrapper">
                <div className="table-title">
                    <h2>User Management</h2>
                    <Button className="InviteBtn" onClick={handleShowInvite}>
                        <FiPlus />
                        <span>Invite</span>
                    </Button>
                </div>
                <div className="table-filter">
                    <div className="left-filters">

                   
                    </div>
                    <div className="right-filters">
                        <div className="input-wrapper">
                            <input className="form-control" type="text" placeholder="Search" name="text" value={text} onChange={(event) => setText(event.target.value)} />

                            <span className="search-icon fa fa-search"></span>
                            {/* <BiSearch /> */}
                        </div>
                        <div className="btn-wrapper">
                            {/* <button className="btn btn-danger">Clear</button>
                            <button className="btn btn-primary">Search</button> */}
                        </div>
                    </div>
                </div>
                <ListingTable type={type} text={text} setUserCount={setUserCount} refreshListing={refreshListing} />
            </div>
            {/* <div className="company-management-wrapper isPaddingSmall">
                <div className="UserManage d-flex justify-content-between align-items-center dg-mb-16 flex-wrap">
                    <div className="company-title">
                        <h3 className="m-0">User Management</h3>
                    </div>

                    <div className="company-detail">
                        <Button className="InviteBtn" onClick={handleShowInvite}>
                            <FiPlus />
                            <span>Invite</span>
                        </Button>
                    </div>
                </div>
                <div className="users-tabs">
                            <div className="drop-search-wrapper d-flex justify-content-between flex-wrap dg-mb-16">
                                <div className="dropdown-wrap">
                                    <Form.Group>
                                        <SelectDropdown
                                            classNamePrefix="select"
                                            placeholder="Select User Type"
                                            name="role"
                                            // value={role.filter((item) => item.value === type)}
                                            options={role}
                                            // onChange={(newValue) => setType(newValue?.value)}
                                            isClearable
                                            required
                                        />
                                    </Form.Group>
                                </div>

                                <div className="search-wrap">
                                    <div className="search-bar">
                                        <span>
                                            <input type="text" placeholder="Search" name="text" value={text} onChange={(event) => setText(event.target.value)} />
                                        </span>
                                        <FiSearch />
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <ListingTable type={type} text={text} setUserCount={setUserCount} refreshListing={refreshListing} />
                            </div>
                </div>
            </div> */}
            <div className="modal-wrap">
                <InviteModel showInvite={showInvite} handleCloseInvite={handleCloseInvite} />
            </div>
        </div>
    );
};

export default UserFilter;
