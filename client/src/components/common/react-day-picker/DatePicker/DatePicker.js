import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import DayPicker, { LocaleUtils } from 'react-day-picker';
import { DateTime } from 'luxon';

import YearMonthForm from '../components/caption-element/YearMonthForm';

// import './DatePicker.scss';
import '../DateRangePicker/DateRangePicker.scss';

function getMonths() {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
}

function DatePicker({ value, onDateChangeApply, onDateChangeCancel }) {
    const [calendarMonth, setCalendarMonth] = useState(value?.toJSDate());
    const [selectedDate, setSelectedDate] = useState(undefined);

    useEffect(() => {
        setCalendarMonth(selectedDate?.toJSDate());
    }, [selectedDate]);

    function onDayClickHandler(day, { selected, disabled }) {
        if (disabled) {
            // Day is disabled, do nothing
            return;
        }

        if (selected) {
            // Unselect the day if already selected
            setSelectedDate(undefined);
            return;
        }

        setSelectedDate(DateTime.fromJSDate(day));
    }

    const handleYearMonthChange = (date) => {
        setCalendarMonth(date?.toJSDate());
    };

    const dayPickerProps = {
        canChangeMonth: false,
        captionElement: ({ date, localeUtils }) => <YearMonthForm date={date} localeUtils={localeUtils} onChange={handleYearMonthChange} />,
        firstDayOfWeek: 1,
        localeUtils: { ...LocaleUtils, getMonths },
        month: calendarMonth,
        onDayClick: onDayClickHandler,
        selectedDays: selectedDate?.toJSDate(),
        showOutsideDays: true,
    };

    return (
        <div className="d-flex custom-labels">
            <div className="dg-pb-16">
                <DayPicker {...dayPickerProps} />

                <div className="d-flex calender-btns">
                    <Button className="calender-save" onClick={() => onDateChangeApply(selectedDate)}>
                        Apply
                    </Button>
                    <Button className="calender-reset" onClick={onDateChangeCancel}>
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
}

// Add prop types checking
DatePicker.propTypes = {
    value: PropTypes.instanceOf(DateTime),
    onDateChangeApply: PropTypes.func.isRequired,
    onDateChangeCancel: PropTypes.func.isRequired,
};

export default DatePicker;
