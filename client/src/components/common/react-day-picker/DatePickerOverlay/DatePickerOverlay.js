import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { Overlay } from 'react-bootstrap';
import { DateTime } from 'luxon';

import DatePicker from '../DatePicker/DatePicker';

import styles from "../DateRangePickerOverlay/DateRangePickerOverlay.module.scss"

// import styles from './DatePickerOverlay.module.scss';

function DatePickerOverlay({ render, placement = 'right', value, onDateChangeHandler, overlayStyles }) {
    const target = useRef(null);
    const calendarContainer = useRef(null);

    const [showDayPicker, setShowDayPicker] = useState(false);

    function dateChangedHandler(date) {
        // Hide the date picker and tell the parent component that the date has changed
        setShowDayPicker(false);

        if (onDateChangeHandler && typeof onDateChangeHandler === 'function') {
            onDateChangeHandler(date);
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
                                    <DatePicker value={value} onDateChangeApply={dateChangedHandler} onDateChangeCancel={() => setShowDayPicker(false)} />
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
DatePickerOverlay.propTypes = {
    render: PropTypes.func.isRequired,
    value: PropTypes.instanceOf(DateTime),
    onDateChangeHandler: PropTypes.func.isRequired,
};

export default DatePickerOverlay;
