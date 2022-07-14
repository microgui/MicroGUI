import { Slider as MaterialSlider } from '@mui/material'
import { useNode, useEditor } from '@craftjs/core'
import { useRef } from 'react'
import Draggable from 'react-draggable'
import { Resizable } from 'react-resizable'

import { Tooltip } from '../../tools/Tooltip'
import { SliderSettings } from './SliderSettings'

import { handleStop, getX, getY, getWS } from '../Utilities'

/**
 * Creates a slider object. 
 * @returns The 'slider' object
 */
export const Slider = ({ size, width, min, max, color, pageX, pageY, event,
    value, valueLabelDisplay, connectedNode, ...props }) => {

    const { enabled, query: { node } } = useEditor((state) => ({
        enabled: state.options.enabled
    }))

    const editorActions = useEditor().actions

    const {
        id,
        name,
        connectors: { connect },
        actions
    } = useNode((node) => ({
        name: node.data.custom.displayName || node.data.displayName
    }))

    const nodeRef = useRef()

    const updateText = (value) => {
        if (node(connectedNode).get()) {
            editorActions.setProp(connectedNode, (props) => {
                props.text = value
            })
            actions.setProp((props) => {
                props.valueLabelDisplay = 'off'
            })
        }
        else actions.setProp((props) => {
            props.connectedNode = null
        })
    }

    const resize = (_, data) => {
        actions.setProp((props) => {
            props.width = data.size.width
        })
    }

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
                height={0}
                width={width}
                onResize={resize}
                minConstraints={[20,20]}
                maxConstraints={[300,300]}
            >
                <div
                    style={{ position: 'absolute', paddingLeft: '10px', paddingRight: '10px' }}
                    ref={nodeRef}
                >
                    <Tooltip
                        name={name}
                        id={id}
                    >
                        <MaterialSlider
                            ref={connect}
                            size={size}
                            sx={{
                                color: `rgba(${Object.values(color)})`,
                                width: `${width}px`,
                                "& .MuiSlider-thumb.Mui-focusVisible": {
                                    boxShadow: 'none'
                                },
                                "& .MuiSlider-thumb:hover": {
                                    boxShadow: 'none'
                                },
                                "& .MuiSlider-thumb.Mui-active": {
                                    boxShadow: 'none'
                                }
                            }}
                            min={min}
                            max={max}
                            value={value}
                            onChange={(_, val) => {
                                if (connectedNode) updateText(val.toString())
                                actions.setProp((props) => {
                                    props.value = val
                                })

                                const ws = getWS()
                                if (ws != null) {
                                    let message = { "Parent":String(id), "Event":String(event), "Value":value };
                                    ws.send(JSON.stringify(message))
                                }
                            }}
                            valueLabelDisplay={valueLabelDisplay}
                            {...props}
                        />
                    </Tooltip>
                </div>
            </Resizable>
        </Draggable>
    )
}

Slider.craft = {
    displayName: 'Slider',
    props: {
        size: 'small',
        width: 100,
        value: 0,
        min: 0,
        max: 100,
        color: { r: 63, g: 81, b: 181, a: 1 },
        valueLabelDisplay: 'auto',
        event: ''
    },
    related: {
        toolbar: SliderSettings
    }
}