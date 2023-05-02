import { useNode, useEditor } from '@craftjs/core'
import { useRef } from 'react'
import Draggable from 'react-draggable'


import { Resizable } from 'react-resizable'

import { Box } from '@mui/material'

import { Tooltip } from '../../tools/Tooltip'
import { CanvasObjectSettings } from './CanvasObjectSettings'
import { handleStop, getX, getY } from '../Utilities'

export const CanvasObject = ({ event, pageX, pageY, width, height, image, background, variant, URL,  ...props }) => {

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


    const resize = (_, data) => {
        actions.setProp((props) => {
            props.width = data.size.width
            props.height = data.size.height

        })
    }

    // lägg en liten förklaring grej för hur API skiten funkar i frontenden 

    return (
        <Draggable
            disabled={!enabled}
            cancel={".react-resizable-handle"}
            onStop={() => handleStop(actions, nodeRef)}
            nodeRef={nodeRef}
            bounds='parent'
            position={{
                x: getX(pageX, nodeRef),
                y: getY(pageY, nodeRef)
            }}
        >
            <Resizable
                height={height}
                width={width}
                onResize={resize}
                minConstraints={[70, 70]}
                maxConstraints={[480, 320]}>

                <div
                    style={{ position: 'absolute' }}
                    ref={nodeRef}

                >
                    <Tooltip
                        name={name}
                        id={id}
                    >
                        <Box
                            ref={connect}
                            sx={{
                                width: width,
                                height: height,
                                backgroundImage: `url(${image})`,
                                backgroundSize: variant,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                position: 'relative',
                                border: '1px solid black'
                            }}

                            {...props}
                        />

                    </Tooltip>
                </div>
            </Resizable>
        </Draggable>
    )
}

CanvasObject.craft = {
    displayName: 'Canvas Object',
    props: {
        text: 'Canvas Object',
        variant: '100%100%',
        width: 150,
        height: 150,
        image: '',
        event: ''
    },
    related: {
        toolbar: CanvasObjectSettings
    }
}