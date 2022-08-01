import ContentEditable from 'react-contenteditable'
import { useNode, useEditor } from '@craftjs/core'
import { useRef } from 'react'
import Draggable from 'react-draggable'
import { Resizable } from 'react-resizable'
import { Tooltip } from '../../tools/Tooltip'
import { TextfieldSettings } from './TextfieldSettings'

import { handleStop, getX, getY } from '../Utilities'

/**
 * Creates a textfield that can be edited.
 * @returns The 'Textfield' object
 */
export const Textfield = ({ fontSize, textAlign, fontWeight, color,
    text, pageX, pageY, width, height, ...props }) => {

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
                minConstraints={[40, 30]}
                maxConstraints={[300, 300]}
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
                            <ContentEditable
                                innerRef={connect}
                                html={text}
                                disabled={!enabled}
                                onChange={(e) => {
                                    actions.setProp((props) => (props.text = e.target.value), 500)
                                }}
                                tagName='h2'
                                style={{
                                    minWidth: `${width}px`,
                                    minHeight: `${height}px`,
                                    color: `rgba(${Object.values(color)})`,
                                    fontSize: `${fontSize}px`,
                                    fontWeight: fontWeight,
                                    textAlign: textAlign,
                                }}
                                {...props}
                            />
                        </div>
                    </Tooltip>
                </div>
            </Resizable>
        </Draggable >
    )
}

Textfield.craft = {
    displayName: 'Textfield',
    props: {
        text: 'Text',
        fontSize: 15,
        textAlign: 'left',
        fontWeight: 500,
        width: 40,
        height: 30,
        color: { r: 0, g: 0, b: 0, a: 1 }
    },
    related: {
        toolbar: TextfieldSettings
    }
}