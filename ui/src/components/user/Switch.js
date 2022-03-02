import { Switch as MaterialSwitch } from '@mui/material';
import { useNode } from '@craftjs/core';
import { useState, useRef } from 'react'
import Draggable from 'react-draggable';

import { Tooltip } from '../tools/Tooltip'

/**
 * Creates a switch object that can be toggled.
 * @returns The 'switch' object.
 */
export const Switch = ({ size, color, pageX, pageY, defaultChecked, ...props }) => {

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
                    <MaterialSwitch
                        ref={connect}
                        size={size}
                        {...props}
                    />
                </Tooltip>
            </div>
        </Draggable>
    );
};