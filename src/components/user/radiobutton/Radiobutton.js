import { RadioGroup as MaterialRadiogroup } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel';
import { Radio } from '@mui/material'
import Draggable from 'react-draggable'
import { useNode, useEditor } from '@craftjs/core'
import { useRef } from 'react'

import { Tooltip } from '../../tools/Tooltip'
import { handleStop, getX, getY, getWS } from '../Utilities'
import { RadiobuttonSettings } from './RadiobuttonSettings'

export const Radiobutton = ({ custom, onClick, size, background, event,
    text, pageX, pageY, labelTexts, amount, ...props }) => {

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

                        onClick={() => {
                            const ws = getWS()
                            if (ws != null) {
                                let message = { "Parent": String(id), "Event": String(event), "Value": 1 };
                                ws.send(JSON.stringify(message))
                            }
                        }}
                        sx={{
                            '& .MuiSvgIcon-root': {
                                color: `rgba(${Object.values(background)})`,
                            }
                        }
                        }
                        {...props}
                    >
                        {text}

                        {[...Array(amount)].map((_, i) => {
                            return (

                                <FormControlLabel control={<Radio value={i} size={size} label={labelTexts[i]} />} label={labelTexts[i]} key={i} />


                            );
                        })}

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
        background: { r: 0, g: 0, b: 0, a: 1 },
        color: { r: 255, g: 255, b: 255, a: 1 },
        event: '',
        amount: 2,
        labelTexts: [""]

    },
    related: {
        toolbar: RadiobuttonSettings
    }
}