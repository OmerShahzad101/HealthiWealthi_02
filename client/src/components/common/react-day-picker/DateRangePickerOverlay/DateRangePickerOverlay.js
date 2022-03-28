import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { Overlay } from 'react-bootstrap';
import { DateTime } from 'luxon';

import DateRangePicker from '../DateRangePicker/DateRangePicker';

import styles from './DateRangePickerOverlay.module.scss';

function DateRangePickerOverlay({ render, placement = 'right', showRanges, startDate, endDate, onDateRangeChange, overlayStyles }) {
    const target = useRef(null);
    const calendarContainer = useRef(null);

    const [showDayPicker, setShowDayPicker] = useState(false);

    function dateRangeChangedHandler(dateRange) {
        // Hide the date picker and tell the parent component that the date range has changed
        setShowDayPicker(false);

        if (onDateRangeChange && typeof onDateRangeChange === 'function') {
            onDateRangeChange({ ...dateRange });
        }
    }

    function targetElementClickedHandler(event) {
        // If the target element is clicked, toggle the date picker visibility
        setShowDayPicker((prevState) => !prevState);
    }

    return (
        <div>
            <div ref={calendarContainer} className="position-relative d-flex align-items-center">
                {
                    // Render the Overlay `target` element
                    render(target, targetElementClickedHandler)
                }

                <div className="date">
                    <Overlay container={calendarContainer} target={target.current} show={showDayPicker} transition={true} placement={placement} rootClose onHide={() => setShowDayPicker(false)}>
                        {({ arrowProps, show, popper, ...overlayProps }) => {
                            return (
                                <div
                                    {...overlayProps}
                                    className={`d-flex flex-column ${styles.customDatePicker}`}
                                    style={{
                                        ...overlayProps.style,
                                        ...overlayStyles,
                                        backgroundColor: 'white',
                                        padding: '2px 10px',
                                        borderRadius: 3,
                                    }}
                                >
                                    <DateRangePicker showRanges={showRanges} startDate={startDate} endDate={endDate} onDateRangeChangeApply={dateRangeChangedHandler} onDateRangeChangeCancel={() => setShowDayPicker(false)} />
                                </div>
                            );
                        }}
                    </Overlay>
                </div>
            </div>
        </div>
    );
}

// Add prop types checking
DateRangePickerOverlay.propTypes = {
    render: PropTypes.func.isRequired,
    startDate: PropTypes.instanceOf(DateTime),
    endDate: PropTypes.instanceOf(DateTime),
    onDateRangeChange: PropTypes.func.isRequired,
};

export default DateRangePickerOverlay;
