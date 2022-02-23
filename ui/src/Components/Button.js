import { Button as MaterialButton } from '@mui/material'
import { useNode } from '@craftjs/core'
import { useState, useEffect } from 'react'
import Draggable from 'react-draggable';

export const Button = ({ size, variant, color, text, pageX, pageY, ...props }) => {

    const [coordinates, setCoordinates] = useState({
        x: pageX,
        y: pageY
    });

    const {
        connectors: { connect },
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
            /* Remember this!!!
            bounds = "parent" */
            //onDrag={handleDrag}
            onStop={handleStop}
        >
            <MaterialButton
                ref={connect}
                style={{
                    position: "absolute",
                    top: coordinates.y,
                    left: coordinates.x
                }}
                size={size}
                variant={variant}
                color={color}
                {...props}
            >
                {text}
            </MaterialButton>
        </Draggable>
    );
};