import { useState } from 'react';

import ListingTable from './listing/listing';
import { SearchIcon } from '../../../../../assets/SVGs/SVGs';

import styles from './index.module.scss';

const UserFilter = () => {
    const [text, setText] = useState('');

    return (
        <div className="main-content isPadding">
            <div className={styles.companyManagementWrapper}>
                <div className={styles.companyTitle}>
                    <h3 className="m-0">Department Listing</h3>
                </div>

                <div className="drop-search-wrapper d-flex justify-content-between dg-mt-16 flex-wrap">
                    <div className="dropdown-wrap d-flex"></div>

                    <div className="search-wrap d-flex">
                        <div className="search-bar dg-mr-10">
                            <input type="text" placeholder="Search" name="text" value={text} onChange={(event) => setText(event.target.value)} />
                            <SearchIcon />
                        </div>
                    </div>
                </div>
            </div>

            <div className="custom-listing-wrapper dg-mt-16">
                <ListingTable text={text} />
            </div>
        </div>
    );
};

export default UserFilter;
