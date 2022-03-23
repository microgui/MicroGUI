import { Switch as MaterialSwitch } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { useNode } from '@craftjs/core'
import { useState, useRef } from 'react'
import Draggable from 'react-draggable'

import { Tooltip } from '../../tools/Tooltip'
import { SwitchSettings } from './SwitchSettings'

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
                    <div>
                        <MaterialSwitch
                            ref={connect}
                            size={size}
                            sx={{
                                '& .MuiSwitch-switchBase.Mui-checked': {
                                    color: `rgba(${Object.values(color)})`,
                                    '&:hover': {
                                      backgroundColor: alpha(`rgba(${Object.values(color)})`, 0.15),
                                    },
                                  },
                                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                    backgroundColor: `rgba(${Object.values(color)})`,
                                  },
                            }}
                            {...props}
                        />
                    </div>
                </Tooltip>
            </div>
        </Draggable>
    )
}

Switch.craft = {
    related: {
        toolbar: SwitchSettings
    }
}