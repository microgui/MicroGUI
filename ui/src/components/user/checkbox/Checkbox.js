import { Checkbox as MaterialCheckbox } from '@mui/material'
import Draggable from 'react-draggable'
import { useNode, useEditor } from '@craftjs/core'
import { useRef } from 'react'

import { Tooltip } from '../../tools/Tooltip'
import { handleStop, getX, getY } from '../Utilities'
import { CheckboxSettings } from './CheckboxSettings'

export const Checkbox = ({ size, color, pageX, pageY, state, event,
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
                    <div>
                        <MaterialCheckbox
                            ref={connect}
                            size={size}
                            disableRipple={true}
                            sx={{
                                color: `rgba(${Object.values(color)})`,
                                "& .MuiSvgIcon-root": {
                                    fill: `rgba(${Object.values(color)})`
                                },
                                padding: 0
                            }}
                            checked={state}
                            onClick={() => {
                                actions.setProp((props) => {props.state = !props.state})
                            }}
                            {...props}
                        />
                    </div>
                </Tooltip>
            </div>
        </Draggable>
    )
}

Checkbox.craft = {
    displayName: 'Checkbox',
    props: {
        state: false,
        size: 'small',
        color: { r: 63, g: 81, b: 181, a: 1 },
        event: ''
    },
    related: {
        toolbar: CheckboxSettings
    }
}