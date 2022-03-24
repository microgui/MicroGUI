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
export const Slider = ({ size, width, height, color, pageX, pageY,
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

    const handleStart = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        actions.setProp((props) => {
            props.width = rect.width;
            props.height = rect.height;
        });
    }

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

    const getRect = () => {
        const element = document.getElementById("canvasElement")
        if (!element) {
            return {
                bottom: 0,
                height: 0,
                left: 0,
                right: 0,
                top: 0,
                width: 0,
            }
        }
        const rect = element.getBoundingClientRect()
        return rect
    }


    const nodeRef = useRef()

    return (
        <Draggable
            onStop={handleStop}
            nodeRef={nodeRef}
            onStart={handleStart}
            bounds={{ left: 0, top: 0, bottom: getRect().height - height, right: getRect().width - width }}
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