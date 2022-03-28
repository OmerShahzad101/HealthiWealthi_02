import { FiChevronDown } from 'react-icons/fi';
import { DateTime } from 'luxon';

export default function YearMonthForm({ date, localeUtils, onChange }) {
    const SELECTED_DATE = DateTime.fromJSDate(date);
    const fromMonth = DateTime.fromObject({ year: 2020 });
    const toMonth = DateTime.now();

    const years = [];
    const months = localeUtils.getMonths();

    for (let i = fromMonth.year; i <= toMonth.year; i += 1) {
        years.push(i);
    }
    years.reverse();

    const handleChange = function handleChange(e) {
        const { year, month } = e.target.form;
        onChange(DateTime.fromObject({ year: year.value, month: month.value }));
    };

    return (
        <form className="DayPicker-Caption">
            <div className="d-flex justify-content-end">
                <div className="custom-select-cal">
                    <select name="month" onChange={handleChange} value={SELECTED_DATE.month}>
                        {months.map((m, i) => (
                            <option key={m} value={i + 1}>
                                {m}
                            </option>
                        ))}
                    </select>
                    <span>
                        <FiChevronDown />
                    </span>
                </div>

                <div className="custom-select-cal">
                    <select name="year" onChange={handleChange} value={SELECTED_DATE.year}>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                    <span>
                        <FiChevronDown />
                    </span>
                </div>
            </div>
        </form>
    );
}
