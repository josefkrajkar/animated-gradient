import * as React from 'react';
import Gradient from './Gradient';

export default (props: any) => (
    <Gradient {...props}>
        {props.children}
    </Gradient>
);
