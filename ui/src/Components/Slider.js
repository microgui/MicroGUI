import { Slider as MaterialSlider } from '@mui/material';
import { useNode } from '@craftjs/core';
import { useState } from 'react'
import Draggable from 'react-draggable';

/**
 * Creates a slider object. 
 * @returns The 'slider' object
 */
export const Slider = ({ size, color, pageX, pageY,
    defaultValue, aria_label, valueLabelDisplay, ...props }) => {
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
            <MaterialSlider
                ref={connect}
                style={{
                    position: "absolute",
                    top: coordinates.y,
                    left: coordinates.x,
                    width: '100px'
                }}
                size={size}
                color={color}
                defaultValue={defaultValue} 
                aria-label={aria_label} 
                valueLabelDisplay={valueLabelDisplay}
                {...props}
            />
        </Draggable>
    );
};