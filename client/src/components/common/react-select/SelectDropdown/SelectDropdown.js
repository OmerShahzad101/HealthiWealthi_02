import React, { forwardRef } from 'react';
import Select, { createFilter } from 'react-select';

import CustomMenuList from '../components/CustomMenuList/CustomMenuList';
import CustomOption from '../components/CustomOptions/CustomOptions';
import CustomValueContainer from '../components/CustomValueContainer/CustomValueContainer';

// Define the component logic
function SelectDropdown(props) {
    const { forwardedRef, components: componentsProp, styles, ...rest } = props;
    let { itemSize } = props;

    if (!itemSize) {
        itemSize = 40;
    }

    return (
        
            <Select
                ref={forwardedRef} // Forwarded `ref` to this `react-select` element
                classNamePrefix="select"
                captureMenuScroll={false}
                filterOption={createFilter({ ignoreAccents: false })}
                components={{
                    ValueContainer: CustomValueContainer,
                    IndicatorSeparator: () => null,
                    MenuList: (menuListProps) => <CustomMenuList {...menuListProps} itemSize={itemSize} />,
                    Option: CustomOption,
                    ...componentsProp, // Any additional custom components passed directly to this `SelectDropdown` component
                }}
                styles={{
                    container: (provided) => ({
                        ...provided,
                    }),
                    option: (provided) => ({
                        ...provided,
                        'color': 'black',
                        'background': 'white',
                        'transition': 'background 50ms',
                        '&:hover': {
                            transitionDelay: '50ms',
                            background: 'rgba(100, 204, 100, 0.4)',
                        },
                        '.custom-select__option--is-focused': {
                            background: 'none',
                        },
                        '.custom-select__option--is-selected': {
                            background: 'rgba(100, 204, 100, 0.4)',
                        },
                    }),
                    control: (provided) => ({
                        ...provided,
                        color: 'black',
                    }),
                    singleValue: (provided) => ({
                        ...provided,
                        color: 'black',
                    }),
                    valueContainer: (provided) => ({
                        ...provided,
                        overflow: 'visible',
                    }),
                    placeholder: (provided, state) => ({
                        ...provided,
                        position: 'absolute',
                        top: state.hasValue || state.selectProps.inputValue ? -4 : '',
                        transition: 'top 0.1s, font-size 0.1s',
                        fontSize: (state.hasValue || state.selectProps.inputValue) && 12,
                    }),
                    ...styles, // Add any tailored styling for special dropdown (like PersonSelect)
                }}
                {...rest} // Add all the other passed props to this component
            />
       
    );
}

// Forward the `ref` as `forwardedRef` to our custom select dropdown
function forwardRefRenderFunction(props, ref) {
    return <SelectDropdown {...props} forwardedRef={ref} />;
}

// Export this custom select dropdown, wrapped inside the forwardRef function, as default
export default forwardRef(forwardRefRenderFunction);
