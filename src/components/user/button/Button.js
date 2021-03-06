import { Button as MaterialButton } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { useNode, useEditor } from '@craftjs/core'
import { useRef } from 'react'
import Draggable from 'react-draggable'

import { Tooltip } from '../../tools/Tooltip'
import { ButtonSettings } from './ButtonSettings'

import { handleStop, getX, getY, getWS } from '../Utilities'

export const Button = ({ custom, onClick, size, variant, background, color, event,
    text, pageX, pageY, ...props }) => {

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
            onStop={() => handleStop(actions, nodeRef)}
            nodeRef={nodeRef}
            bounds='parent'
            position={{
                x: getX(pageX, nodeRef),
                y: getY(pageY, nodeRef)
            }}
        >
            <div
                style={{ position: 'absolute' }}
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
                        onClick={() => {
                            const ws = getWS()
                            if (ws != null) {
                                let message = { "Parent":String(id), "Event":String(event), "Value":1 };
                                ws.send(JSON.stringify(message))
                            }
                        }}
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
        color: { r: 255, g: 255, b: 255, a: 1 },
        event: ''
    },
    related: {
        toolbar: ButtonSettings
    }
}