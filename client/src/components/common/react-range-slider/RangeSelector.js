import React from 'react';
import styles from './rangeSlider.module.scss';
// import { Form, Col, Row } from 'react-bootstrap';

const SliderWithInputFormControl = () => {
    // const [value, setValue] = React.useState(25);
    const [range, setRange] = React.useState(0);
    const [step, setStep] = React.useState(0);
    const ref = React.useRef(null);

    const getRange = (ev) => {
        setRange(ev.target.value);
    };

    React.useEffect(() => {
        const rangeLinePadding = 16;
        const calcStep = (ref.current.offsetWidth - rangeLinePadding) / ref.current.max;
        setStep(calcStep);
    }, []);

    return (
        <div>
            <div className={styles.chrome}>
                <input type="range" id="myinput" min="0" max="100" value={range} onChange={getRange} ref={ref} />

                <output
                    htmlFor="range"
                    className={styles.bubble}
                    style={{
                        transform: `translateX(${range * step}px)`,
                    }}
                >
                    <span>{range}%</span>
                </output>
            </div>
        </div>
    );
};
export default SliderWithInputFormControl;
