import React from 'react';
import { components } from 'react-select';

const { ValueContainer, Placeholder } = components;

export default function CustomValueContainer({ children, ...props }) {
    return (
        <ValueContainer {...props}>
            <Placeholder {...props} isFocused={props.isFocused}>
                {props.selectProps.placeholder}
            </Placeholder>
            {React.Children.map(children, (child) => (child && child.type !== Placeholder ? child : null))}
        </ValueContainer>
    );
}
