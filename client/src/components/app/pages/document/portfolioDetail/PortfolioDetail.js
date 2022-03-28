import { Dropdown } from 'react-bootstrap';
import { GoChevronDown } from 'react-icons/go';
import SelectDropdown from '../../../../common/react-select/SelectDropdown/SelectDropdown';
import PortfolioChart from '../../dashboard/company-admin/portfolioChart/PortfolioChart';

import styles from './portfolio.module.scss';
const PortfolioDetail = () => {
    return (
        <div className="main-content isPadding">
            <div className={` ${styles.portfolioDetailWrapper} dgCards dg-mb-24 `}>
                <div className="d-flex justify-content-between align-items-center dg-mb-24">
                    <div>
                        <h3>Summer New Arrival Marketing Campaign</h3>
                    </div>
                    <div>
                        <Dropdown className={styles.customDrop}>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Edit
                                <span>
                                    <GoChevronDown />
                                </span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu placement="left">
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                <div className={styles.detail}>
                    <ul>
                        <li className={styles.scores}>
                            <p>750.59</p>
                            <span>Overall Score</span>
                        </li>
                        <li className={styles.scores}>
                            <p>09</p>
                            <span>Members</span>
                        </li>
                        <li className={styles.scores}>
                            <p>02</p>
                            <span>Department</span>
                        </li>
                        <li className={styles.scores}>
                            <p>03</p>
                            <span>Integrated Apps</span>
                        </li>
                        <li className={styles.scores}>
                            <p>Henry O.</p>
                            <span>Portfolio Owner</span>
                        </li>
                        <li className={styles.scores}>
                            <p>Finance</p>
                            <span>Top Department</span>
                        </li>
                        <li className={styles.scores}>
                            <p>Maverik D.</p>
                            <span>Top Employee</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={styles.dateDropWrap}>
                <div className="d-flex">
                    {/* <input type="date" /> */}
                    <div className="col-lg-6 col-xl-6 ">
                        <SelectDropdown name="location" placeholder="Top Score"  required />
                    </div>
                </div>
                <div className={` ${styles.chartBtn} d-flex justify-content-end `}>
                    {/* <div className={styles.chartBtn1}>
                        <MdOutlineFormatListBulleted />
                    </div>
                    <div className={styles.chartBtn2}>
                        <MdSignalCellularAlt />
                    </div> */}
                </div>
            </div>
            <PortfolioChart/>
        </div>
    );
};

export default PortfolioDetail;
