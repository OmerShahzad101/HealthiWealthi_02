import React from 'react';
import VirtualList from 'react-tiny-virtual-list';

import styles from './CustomMenuList.module.scss';

export default function CustomMenuList(props) {
    const { options, children, itemSize, maxHeight, getValue } = props;

    function renderItem(itemProps) {
        if (Array.isArray(children)) {
            return (
                <li style={itemProps.style} key={itemProps.index}>
                    {children[itemProps.index]}
                </li>
            );
        }

        return (
            <li key={itemProps.index} className={styles['react-virtualized-menu-placeholder']}>
                {children?.itemProps?.children}
            </li>
        );
    }

    const [value] = getValue();
    const initialOffset = options.indexOf(value) * itemSize;
    const childrenOptions = React.Children.toArray(children);
    const wrapperHeight = maxHeight < childrenOptions.length * itemSize ? maxHeight : childrenOptions.length * itemSize;

    return (
        <span className={styles['react-virtualized-list-wrapper']}>
            <VirtualList width="100%" height={wrapperHeight + 6} scrollOffset={initialOffset} itemCount={childrenOptions.length} itemSize={itemSize} renderItem={renderItem} />
        </span>
    );
}
