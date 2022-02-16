import { Button as MaterialButton } from '@mui/material';
import { useNode } from '@craftjs/core';

export const Button = ({ size, variant, color, text, ...props }) => {
    const {
        connectors: { connect, drag },
    } = useNode();
    return (
        <MaterialButton
            ref={(ref) => connect(drag(ref))}
            style={{ margin: '5px' }}
            size={size}
            variant={variant}
            color={color}
            {...props}
        >
            {text}
        </MaterialButton>
    );
};