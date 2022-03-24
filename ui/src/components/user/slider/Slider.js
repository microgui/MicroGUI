import { Slider as MaterialSlider } from '@mui/material';
import { alpha } from '@mui/material/styles'
import { useNode } from '@craftjs/core';
import { useState, useRef } from 'react'
import Draggable from 'react-draggable';

import { Tooltip } from '../../tools/Tooltip'
import { SliderSettings } from './SliderSettings';

/**
 * Creates a slider object. 
 * @returns The 'slider' object
 */
export const Slider = ({ size, width, color, pageX, pageY,
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
        const canvas = document.getElementById('canvasElement').getBoundingClientRect();
        const rect = e.target.getBoundingClientRect();
        const relativePos = {}    
        relativePos.left = rect.left - canvas.left
        relativePos.top = rect.top - canvas.top
        actions.setProp((props) => {
            props.pageX = relativePos.left;
            props.pageY = relativePos.top;
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
                        size={size}
                        sx={{
                            color: `rgba(${Object.values(color)})`,
                            width: `${width}px`
                        }}
                        defaultValue={defaultValue}
                        aria-label={aria_label}
                        valueLabelDisplay={valueLabelDisplay}
                        {...props}
                    />
                </Tooltip>
            </div>
        </Draggable>
    )
}

Slider.craft = {
    related: {
        toolbar: SliderSettings
    }
}