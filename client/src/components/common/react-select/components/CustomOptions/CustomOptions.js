import { components } from 'react-select';

const { Option } = components;

// Remove "onMouseMove" and "onMouseOver" handlers from Option props for efficient list rendering
export default function CustomOption({ children, ...props }) {
    const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
    const newProps = { ...props, innerProps: rest };

    return <Option {...newProps}>{children}</Option>;
}
