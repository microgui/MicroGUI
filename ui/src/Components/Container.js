import { useNode } from "@craftjs/core";
import { Paper } from '@mui/material';

export const Container = ({ background, padding, children, ...props }) => {
    const {
        connectors: { connect, drag },
    } = useNode();
    return (
        <Paper
            {...props}
            ref={(ref) => connect(drag(ref))}
            style={{ margin: '5px 0', background, padding: `${padding}px` }}
        >
            {children}
        </Paper>
    );
};