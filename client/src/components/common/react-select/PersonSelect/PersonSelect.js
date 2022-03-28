import React, { forwardRef } from 'react';

import SelectDropdown from '../SelectDropdown/SelectDropdown';

import imagePath from '../../../../utils/url/imagePath';
import styles from './PersonSelect.module.scss';

const formatOptionLabel = ({ userName, avatar }) => (
    <div className={`${styles.customSelectWrap} dg-mt-10`}>
        <div className={`${styles.customSelectImg} dg-mr-14`}>
            <img src={imagePath(avatar)} alt="profile pic" />
        </div>
        <div>{userName}</div>
    </div>
);

const PersonSelect = (props) => {
    const { forwardedRef, ...rest } = props;

    return (
        <SelectDropdown
            ref={forwardedRef} // Forwarded `ref` to this `react-select` element
            formatOptionLabel={formatOptionLabel}
            itemSize={50}
            styles={{
                placeholder: (provided, state) => ({
                    ...provided,
                    position: 'absolute',
                    top: state.hasValue || state.selectProps.inputValue ? -10 : '',
                    transition: 'top 0.1s, font-size 0.1s',
                    fontSize: (state.hasValue || state.selectProps.inputValue) && 13,
                }),
            }}
            {...rest} // Add all the other passed props to this component
        />
    );
};

// Forward the `ref` as `forwardedRef` to our custom select dropdown
function forwardRefRenderFunction(props, ref) {
    return <PersonSelect {...props} forwardedRef={ref} />;
}

// Export this custom select dropdown, wrapped inside the forwardRef function, as default
export default forwardRef(forwardRefRenderFunction);
