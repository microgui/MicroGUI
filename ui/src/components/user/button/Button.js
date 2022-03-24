import { Button as MaterialButton } from '@mui/material'
import { useNode } from '@craftjs/core'
import { useState, useRef } from 'react'
import Draggable from 'react-draggable';

import { Tooltip } from '../../tools/Tooltip'
import { ButtonSettings } from './ButtonSettings';

export const Button = ({custom, onClick, size, variant, background, color, text, pageX, pageY, width, height, ...props }) => {

    console.log(pageX, pageY)

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
            onStart={handleStart}
            onStop={handleStop}
            nodeRef={nodeRef}
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
                    <MaterialButton
                        ref={connect}
                        size={size}
                        variant={variant}
                        onClick={onClick}
                        sx={{
                            backgroundColor: 
                                variant === 'contained' ? `rgba(${Object.values(background)})` : 'transparent', 
                            color: `rgba(${Object.values(color)})`,
                            borderColor:
                                variant === 'outlined' ? `rgba(${Object.values(background)})` : 'transparent'
                        }}
                        {...props}
                    >
                        {text}
                    </MaterialButton>
                </Tooltip>
            </div>
        </Draggable>
    );
};

Button.craft = {
    related: {
        toolbar: ButtonSettings
    },
}