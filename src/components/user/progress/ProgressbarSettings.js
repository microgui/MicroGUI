import { EditSection } from "../../tools/editbox/EditSection"
import { EditItem } from "../../tools/editbox/EditItem"
import React, { useState } from 'react'
import { useNode } from '@craftjs/core'

export const ProgressbarSettings = () => {
    const [copied, setCopied] = useState(false)

    const { id } = useNode()

    const copyId = () => {
        setCopied(true)
        navigator.clipboard.writeText(id)
    }

    return (
        <React.Fragment>
            <EditSection
                title='Id'
                summary={id}
            >
                <EditItem
                    type='button'
                    onClick={copyId}
                    disabled={copied}
                >
                    {copied ? 'Copied' : 'Copy'}
                </EditItem>
            </EditSection>
            <EditSection
                title='Position'
                props={['pageX', 'pageY']}
                summary={({ pageX, pageY }) => {
                    return `X: ${Number(pageX)}, Y: ${Number(pageY)}`
                }}
            >
                <EditItem propKey='pageX' type='number' label='X' />
                <EditItem propKey='pageY' type='number' label='Y' />
            </EditSection>
            <EditSection
                title='Text'
                props={['text']}
                summary={({ text }) => {
                    return text
                }}
            >
                <EditItem
                    propKey='text'
                    type='text'
                    full={true}
                />
            </EditSection>

            <EditSection
                title='Size'
                props={['size']}
                summary={({ size }) => {
                    return size
                }}
            >
                <EditItem
                    propKey='size'
                    type='number'
                    label='Size'
                    full={true}
                />
            </EditSection>

            <EditSection
                title='Event'
                props={['event']}
                summary={({ event }) => {
                    return event
                }}
            >
                <EditItem
                    propKey='event'
                    type='text'
                    label='Id'
                    full={true}
                />
            </EditSection>
        </React.Fragment>
    )
}