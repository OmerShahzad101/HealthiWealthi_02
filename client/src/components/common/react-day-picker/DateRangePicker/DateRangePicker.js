import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import DayPicker, { LocaleUtils } from 'react-day-picker';
import { DateTime } from 'luxon';
import classNames from 'classnames';

import YearMonthForm from '../components/caption-element/YearMonthForm';

import './DateRangePicker.scss';

function getMonths() {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
}

function DateRangePicker({ startDate, endDate, showRanges, onDateRangeChangeApply, onDateRangeChangeCancel }) {
    const TODAY = DateTime.now().startOf('day');
    const DATE_RANGES = {
        'Today': [TODAY.startOf('day'), TODAY.endOf('day')],
        'Yesterday': [TODAY.minus({ days: 1 }).startOf('day'), TODAY.minus({ days: 1 }).endOf('day')],
        'Last 7 Days': [TODAY.minus({ days: 6 }).startOf('day'), TODAY.endOf('day')],
        'This Month': [TODAY.startOf('month'), TODAY.endOf('month')],
        'Last Month': [TODAY.minus({ months: 1 }).startOf('month'), TODAY.minus({ months: 1 }).endOf('month')],
        'This Year': [TODAY.startOf('year'), TODAY.endOf('year')],
        'Last Year': [TODAY.minus({ years: 1 }).startOf('year'), TODAY.minus({ years: 1 }).endOf('year')],
        'All Time': [DateTime.fromISO('2020-10-01'), TODAY.endOf('day')],
    };

    const [startDateSelected, setStartDateSelected] = useState(false);
    const [calendarMonth, setCalendarMonth] = useState(startDate?.toJSDate());
    const [dateRange, setDateRange] = useState({
        start: startDate,
        end: endDate,
    });

    useEffect(() => {
        setCalendarMonth(dateRange.start?.toJSDate());
    }, [dateRange.start]);

    function onDayClickHandler(day, { disabled }) {
        if (disabled) {
            return;
        }

        const dateTime = DateTime.fromJSDate(day);

        if (!startDateSelected) {
            setStartDateSelected(true);
            setDateRange({
                start: dateTime.startOf('day'),
                end: undefined,
            });
        } else {
            setStartDateSelected(false);

            if (dateTime < dateRange.start) {
                setDateRange((prevRange) => {
                    return {
                        start: dateTime.startOf('day'),
                        end: prevRange.start.endOf('day'),
                    };
                });
            } else {
                setDateRange((prevRange) => {
                    return {
                        start: prevRange.start,
                        end: dateTime.endOf('day'),
                    };
                });
            }
        }
    }

    function cancelDateRangeChange() {
        setDateRange({
            start: startDate,
            end: endDate,
        });

        onDateRangeChangeCancel();
    }

    const handleYearMonthChange = (date) => {
        setCalendarMonth(date?.toJSDate());
    };

    const { start, end } = dateRange;
    const modifiers = {
        start: start?.toJSDate(),
        end: end?.toJSDate(),
    };

    const dayPickerProps = {
        canChangeMonth: false,
        captionElement: ({ date, localeUtils }) => <YearMonthForm date={date} localeUtils={localeUtils} onChange={handleYearMonthChange} />,
        firstDayOfWeek: 1,
        localeUtils: { ...LocaleUtils, getMonths },
        modifiers,
        month: calendarMonth,
        onDayClick: onDayClickHandler,
        selectedDays: [start?.toJSDate(), { from: start?.toJSDate(), to: end?.toJSDate() }],
        showOutsideDays: true,
    };

    return (
        <div className="d-flex custom-labels">
            {showRanges && (
                <div className="labels">
                    <ul>
                        {Object.entries(DATE_RANGES).map(([label, range]) => (
                            <li
                                key={label}
                                onClick={() => setDateRange({ start: range[0], end: range[1] })}
                                className={classNames({ active: dateRange.start && dateRange.end && range[0].hasSame(dateRange.start, 'day') && range[1].hasSame(dateRange.end, 'day') })}
                            >
                                <Button>{label}</Button>
                            </li>
                        ))}

                        {dateRange.start && dateRange.end && !Object.values(DATE_RANGES).some((range) => range[0].hasSame(dateRange.start, 'day') && range[1].hasSame(dateRange.end, 'day')) && (
                            <li className="active">
                                <Button>Custom</Button>
                            </li>
                        )}
                    </ul>
                </div>
            )}

            <div className="dg-pb-16">
                <DayPicker {...dayPickerProps} />

                <div className="d-flex calender-btns">
                    <Button className="calender-save" disabled={!dateRange.start || !dateRange.end} onClick={() => onDateRangeChangeApply({ ...dateRange })}>
                        Apply
                    </Button>
                    <Button className="calender-reset" onClick={cancelDateRangeChange}>
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
}

// Add prop types checking
DateRangePicker.propTypes = {
    startDate: PropTypes.instanceOf(DateTime),
    endDate: PropTypes.instanceOf(DateTime),
    onDateRangeChangeApply: PropTypes.func.isRequired,
    onDateRangeChangeCancel: PropTypes.func.isRequired,
};

export default DateRangePicker;
