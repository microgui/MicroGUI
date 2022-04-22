import ContentEditable from 'react-contenteditable';
import { useNode, useEditor } from '@craftjs/core';
import { useRef, useEffect } from 'react'

import Draggable from 'react-draggable';
import { Tooltip } from '../../tools/Tooltip'
import { TextfieldSettings } from './TextfieldSettings';

import { handleStop } from '../Utilities'

/**
 * Creates a textfield that can be edited.
 * @returns The 'Textfield' object
 */
export const Textfield = ({ fontSize, textAlign, fontWeight, color,
    text, pageX, pageY, propId, ...props }) => {

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

    useEffect(() => {
        actions.setProp((props) => {
            props.propId = id
        })
    }, [actions, id])

    const nodeRef = useRef()

    return (
        <Draggable
            disabled={!enabled}
            onStop={() => handleStop(actions, nodeRef)}
            nodeRef={nodeRef}
            bounds='parent'
            position={{ x: pageX, y: pageY }}
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
                                actions.setProp((prop) => (prop.text = e.target.value), 500)
                            }}
                            tagName='h2'
                            id='editableText'
                            style={{
                                width: '100%',
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
        </Draggable >
    )
}

Textfield.craft = {
    displayName: 'Textfield',
    props: {
        text: 'Text',
        fontSize: 15,
        textAlign: 'left',
        fontWeight: '500',
        color: { r: 0, g: 0, b: 0, a: 1 }
    },
    related: {
        toolbar: TextfieldSettings
    }
}