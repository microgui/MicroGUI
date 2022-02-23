import { Switch as MaterialSwitch } from '@mui/material';
import { useNode } from '@craftjs/core';
import { useState } from 'react'
import Draggable from 'react-draggable';

export const Switch = ({ size, color, pageX, pageY, defaultChecked, ...props }) => {
  
    const [coordinates, setCoordinates] = useState({
        x: pageX,
        y: pageY
    });

    const {
        connectors: { connect, drag },
        actions
    } = useNode();

    const handleStop = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        actions.setProp((props) => {
            props.pageX = rect.left;
            props.pageY = rect.top;
        });
    }

    return (
        <Draggable
            onStop={handleStop}
        >
            <MaterialSwitch
                ref = {connect}
                style={{
                    // margin: '5px',
                    position: "absolute",
                    top: coordinates.y,
                    left: coordinates.x,
                }}
                size={size}
                // color={color}
                // defaultChecked={true}
                // disabled
                {...props}
            />
        </Draggable>
    );
};