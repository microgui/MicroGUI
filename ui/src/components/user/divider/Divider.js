import { Divider as MaterialDivider } from '@mui/material'
import { useNode, useEditor } from '@craftjs/core'
import { useRef } from 'react'
import Draggable from 'react-draggable'

import { Tooltip } from '../../tools/Tooltip'
import { DividerSettings } from './DividerSettings'

import { handleStop, getX, getY } from '../Utilities'

export const Divider = ({ length, thickness, variant, color, orientation,
    pageX, pageY, ...props }) => {

    const { enabled } = useEditor((state) => ({
        enabled: state.options.enabled
    }))

    const {
        id,
        name,
        connectors: { connect },
        actions
    } = useNode((node) => ({
        name: node.data.displayName,
    }))

    console.log(orientation)

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
                    <div
                        ref={connect}
                        style={{
                            minHeight: `5px`,
                            minWidth: `5px`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <MaterialDivider
                            variant={variant}
                            orientation={orientation}
                            sx={{
                                background: `rgba(${Object.values(color)})`,
                                width: orientation === 'horizontal' ? `${length}px` : `${thickness}px`,
                                height: orientation === 'horizontal' ? `${thickness}px` : `${length}px`,
                                cursor: 'pointer'
                            }}
                            {...props}
                        />
                    </div>
                </Tooltip>
            </div>
        </Draggable>
    )
}

Divider.craft = {
    displayName: 'Divider',
    props: {
        length: 100,
        thickness: 1,
        variant: 'fullWidth',
        orientation: 'horizontal',
        color: { r: 63, g: 81, b: 181, a: 1 }
    },
    related: {
        toolbar: DividerSettings
    }
}