import { LinearProgress as MaterialProgress } from '@mui/material/';
import { Box } from '@mui/material/';
import { useNode, useEditor } from '@craftjs/core'
import { useRef } from 'react'
import Draggable from 'react-draggable'

import { Tooltip } from '../../tools/Tooltip'
import { ProgressbarSettings } from './ProgressbarSettings'

import { handleStop, getX, getY, getWS } from '../Utilities'

export const Progressbar = ({ custom, onClick, size, background, color, event,
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

                    <Box sx={{
                        width: '300%'
                    }} >


                        {text}

                        <MaterialProgress
                            ref={connect}
                            color="secondary"
                            onClick={() => {
                                const ws = getWS()
                                if (ws != null) {
                                    let message = { "Parent": String(id), "Event": String(event), "Value": 1 };
                                    ws.send(JSON.stringify(message))
                                }
                            }}

                        >
                        </MaterialProgress>

                    </Box>
                </Tooltip>
            </div>
        </Draggable>
    )
}

Progressbar.craft = {
    displayName: 'Progressbar',
    props: {
        text: 'Progressbar',
        variant: "determinate",
        size: 'small',
        background: { r: 63, g: 81, b: 181, a: 1 },
        color: { r: 255, g: 255, b: 255, a: 1 },
        event: ''
    },
    related: {
        toolbar: ProgressbarSettings
    }
}