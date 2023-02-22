import { RadioGroup as MaterialRadiogroup } from '@mui/material'
import { Radio } from '@mui/material'
import Draggable from 'react-draggable'
import { useNode, useEditor } from '@craftjs/core'
import { useRef } from 'react'

import { Tooltip } from '../../tools/Tooltip'
import { handleStop, getX, getY, getWS } from '../Utilities'
import { RadiobuttonSettings } from './RadiobuttonSettings'

export const Radiobutton = ({ custom, onClick, size, background, color, event,
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
                    <MaterialRadiogroup

                        ref={connect}
                        size={size}

                        onClick={() => {
                            const ws = getWS()
                            if (ws != null) {
                                let message = { "Parent": String(id), "Event": String(event), "Value": 1 };
                                ws.send(JSON.stringify(message))
                            }
                        }}
                        sx={{
                            '& .MuiSvgIcon-root': {
                                fontSize: 28,
                            }
                        }
                        }
                        {...props}
                    >
                        {text}



                        <Radio
                            value="a"
                        >
                        </Radio>
                        <Radio
                            value="b"
                        > </Radio>

                    </MaterialRadiogroup>

                </Tooltip>
            </div>
        </Draggable>
    )
}

Radiobutton.craft = {
    displayName: 'Radiobutton',
    props: {
        size: 'small',
        text: 'Radiobuttons',
        variant: 'contained',
        background: { r: 63, g: 81, b: 181, a: 1 },
        color: { r: 255, g: 255, b: 255, a: 1 },
        event: ''
    },
    related: {
        toolbar: RadiobuttonSettings
    }
}