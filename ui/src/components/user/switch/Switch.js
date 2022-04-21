import { Switch as MaterialSwitch } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { useNode, useEditor } from '@craftjs/core'
import { useRef } from 'react'
import Draggable from 'react-draggable'

import { Tooltip } from '../../tools/Tooltip'
import { SwitchSettings } from './SwitchSettings'

import { handleStart, handleStop, getBounds } from '../Utilities'

/**
 * Creates a switch object that can be toggled.
 * @returns The 'switch' object.
 */
export const Switch = ({ height, width, size, color, pageX, pageY,
    defaultChecked, ...props }) => {

    const { enabled } = useEditor((state) => ({
        enabled: state.options.enabled
    }))

    const {
        id,
        name,
        connectors: { connect },
        actions
    } = useNode((node) => ({
        name: node.data.custom.displayName || node.data.displayName,
    }))

    const nodeRef = useRef()

    return (
        <Draggable
            disabled={!enabled}
            onStart={() => handleStart(actions, nodeRef)}
            onStop={() => handleStop(actions, nodeRef)}
            nodeRef={nodeRef}
            bounds={getBounds(height, width)}
            position={{x:pageX, y:pageY}}
        >
            <div
                style={{position: 'absolute'}}
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
    displayName: 'Switch',
    props: {
        size: 'small',                                
        color: { r: 63, g: 81, b: 181, a: 1 }
    },
    related: {
        toolbar: SwitchSettings
    }
}