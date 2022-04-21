import { Button as MaterialButton } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { useNode, useEditor } from '@craftjs/core'
import { useState, useRef } from 'react'
import Draggable from 'react-draggable'

import { Tooltip } from '../../tools/Tooltip'
import { ButtonSettings } from './ButtonSettings'

import { handleStart, handleStop, getBounds } from '../Utilities'

export const Button = ({ custom, onClick, size, variant, background, color, 
    text, pageX, pageY, width, height, ...props }) => {

    const [coordinates] = useState({
        x: pageX,
        y: pageY
    })

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
                                variant === 'outlined' ? `rgba(${Object.values(background)})` : 'transparent',
                            "&:hover": {
                                backgroundColor: variant === 'contained' ? alpha(`rgba(${Object.values(background)})`, 0.9) : null
                            }
                        }}
                        {...props}
                    >
                        {text}
                    </MaterialButton>
                </Tooltip>
            </div>
        </Draggable>
    )
}

Button.craft = {
    displayName: 'Button',
    props: {
        text: 'Button',
        size: 'small',
        variant: 'contained',
        background: { r: 63, g: 81, b: 181, a: 1 },
        color: { r: 255, g: 255, b: 255, a: 1 }
    },
    related: {
        toolbar: ButtonSettings
    }
}