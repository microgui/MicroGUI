import { Button as MaterialButton } from '@mui/material'
import { useNode } from '@craftjs/core'
import { useState, useRef } from 'react'
import Draggable from 'react-draggable';

import { Tooltip } from '../tools/Tooltip'

/**
 * 
 * 
 *  
 */

export const Button = ({ size, variant, color, text, pageX, pageY, width, height, ...props }) => {

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
        const rect = e.target.getBoundingClientRect();
        actions.setProp((props) => {
            props.pageX = rect.left;
            props.pageY = rect.top;
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
            //onStart={handleStart}
            onStop={handleStop}
            handle="#dragButton"
            nodeRef={nodeRef}
            //bounds={{ left: -200, top: 0, bottom: getRect().height - height, right: getRect().width - width - 200 }}
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
                    <MaterialButton
                        id="dragButton"
                        ref={connect}
                        size={size}
                        variant={variant}
                        color={color}
                        {...props}
                    >
                        {text}
                    </MaterialButton>
                </Tooltip>
            </div>
        </Draggable>
    );
};