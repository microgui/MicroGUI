import { Slider as MaterialSlider } from '@mui/material';
import { useNode } from '@craftjs/core';
import { useState, useRef } from 'react'
import Draggable from 'react-draggable';

import { Tooltip } from '../tools/Tooltip'

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
        id,
        name,
        connectors: { connect },
        actions
    } = useNode((node) => ({
        name: node.data.custom.displayName || node.data.displayName,
    }));

    const handleStop = (e) => {
        const rect = e.target.getBoundingClientRect();
        actions.setProp((props) => {
            props.pageX = rect.left;
            props.pageY = rect.top;
        });
    }

    const nodeRef = useRef()

    return (
        <Draggable
            onStop={handleStop}
            nodeRef={nodeRef}
        >
            <div
                style={{
                    position: "absolute",
                    top: coordinates.y,
                    left: coordinates.x
                }}
                ref={nodeRef}
            >
                <Tooltip
                    name={name}
                    id={id}
                >
                    <MaterialSlider
                        ref={connect}
                        style={{
                            width: '100px'
                        }}
                        size={size}
                        color={color}
                        defaultValue={defaultValue}
                        aria-label={aria_label}
                        valueLabelDisplay={valueLabelDisplay}
                        {...props}
                    />
                </Tooltip>
            </div>
        </Draggable>
    );
};