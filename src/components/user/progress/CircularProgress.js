import { CircularProgress as MaterialProgress } from '@mui/material/';
import { Box } from '@mui/material/';
import { useNode, useEditor } from '@craftjs/core'
import { useRef } from 'react'
import Draggable from 'react-draggable'

import { Tooltip } from '../../tools/Tooltip'
import { ProgressbarSettings } from './ProgressbarSettings'

import { handleStop, getX, getY, getWS } from '../Utilities'

export const CircularProgress = ({ custom, onClick, size, event,
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
                    <Box sx={{ width: '100%' }}>
                        {text}
                        <div style={{ width: `${size}px`, margin: '0 auto' }}>
                            <MaterialProgress
                                ref={connect}

                                value={66}
                                onClick={() => {
                                    const ws = getWS()
                                    if (ws != null) {
                                        let message = { "Parent": String(id), "Event": String(event), "Value": 1 };
                                        ws.send(JSON.stringify(message))
                                    }
                                }}
                                {...props}
                            />
                        </div>
                    </Box>
                </Tooltip>
            </div>
        </Draggable>
    )
}
CircularProgress.craft = {
    displayName: 'Circular Progress',
    props: {
        text: 'Circular Progress',
        size: '150',
        value: '0',
        event: ''
    },
    related: {
        toolbar: ProgressbarSettings
    }
}