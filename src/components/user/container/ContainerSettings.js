import React, { useState } from 'react'
import { useNode } from '@craftjs/core'
import { EditSection } from "../../tools/editbox/EditSection"
import { EditItem } from "../../tools/editbox/EditItem"

export const ContainerSettings = () => {
    const [copied, setCopied] = useState(false)

    const { id, childrenJustify, childrenAlign } = useNode((node) => ({
        childrenJustify: node.data.props.childrenJustify,
        childrenAlign: node.data.props.childrenAlign,
    }))

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
                title='Size'
                props={['width', 'height']}
                summary={({ width, height }) => {
                    return `${width}x${height} px`
                }}
            >
                <EditItem propKey='width' type='number' label='Width' />
                <EditItem propKey='height' type='number' label='Height' />
            </EditSection>
            <EditSection
                title="Background"
                props={["backgroundColor"]}
                summary={({ backgroundColor }) => {
                    return (
                        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                            <div
                                style={{
                                    backgroundColor: `rgba(${Object.values(backgroundColor)})`,
                                    borderRadius: "50%",
                                    height: "20px",
                                    width: "20px",
                                }}
                            />
                        </div>
                    )
                }}
            >
                <EditItem propKey="backgroundColor" type="color" label="Background Color" />
            </EditSection>
            <EditSection
                title="Border"
                props={["border"]}
                summary={({ border }) => {
                    return border
                }}
            >
                <EditItem propKey="border" type="text" label="Border" />
            </EditSection>
            <EditSection
                title="Children Alignment"
                props={["childrenJustify", "childrenAlign"]}
                summary={() => { return `Horizontal: ${childrenJustify}, Vertical: ${childrenAlign}` }}

            >
                <EditItem
                    propKey="childrenJustify"
                    type="select"
                    label="Horizontal Alignment"
                    options={[
                        { value: 'flex-start', label: 'Start' },
                        { value: 'center', label: 'Center' },
                        { value: 'flex-end', label: 'End' },
                        { value: 'space-between', label: 'Space Between' },
                        { value: 'space-around', label: 'Space Around' },
                        { value: 'space-evenly', label: 'Space Evenly' },
                    ]}
                />
                <EditItem
                    propKey="childrenAlign"
                    type="select"
                    label="Vertical Alignment"
                    options={[
                        { value: 'flex-start', label: 'Start' },
                        { value: 'center', label: 'Center' },
                        { value: 'flex-end', label: 'End' },
                        { value: 'stretch', label: 'Stretch' },
                        { value: 'baseline', label: 'Baseline' },
                    ]}
                />
            </EditSection>
        </React.Fragment>
    )
}
