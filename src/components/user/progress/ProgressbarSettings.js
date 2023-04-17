import { EditSection } from "../../tools/editbox/EditSection"
import { EditItem } from "../../tools/editbox/EditItem"
import React, { useState } from 'react'
import { useNode } from '@craftjs/core'
import { FormControlLabel, Radio, Typography } from "@mui/material"

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
                title='Color'
                props={['color']}
                summary={({ color }) => {
                    return (
                        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                            <div
                                style={{
                                    background:
                                        color && `rgba(${Object.values(color)})`,
                                    borderRadius: '50%',
                                    height: '20px',
                                    width: '20px'
                                }}
                            />
                        </div>
                    )
                }}
            >
                <EditItem
                    full={true}
                    propKey='color'
                    type='color'
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
                >

                </EditItem>
            </EditSection>

            <EditSection
                title='Rotation'
                props={['rotation']}
                summary={({ rotation }) => {
                    return rotation
                }}
            >
                <EditItem
                    propKey='rotation'
                    type='radio'
                    label='Rotation'
                    full={true}
                >
                    <FormControlLabel value='0' control={<Radio size='small' />} label={<Typography fontSize='0.9rem'>0 Degrees</Typography>} />
                    <FormControlLabel value='90' control={<Radio size='small' />} label={<Typography fontSize='0.9rem'>90 Degrees</Typography>} />
                    <FormControlLabel value='270' control={<Radio size='small' />} label={<Typography fontSize='0.9rem'>270 Degrees</Typography>} />

                </EditItem>
            </EditSection>

            <EditSection
                title='Value range'
                props={['min', 'max']}
                summary={({ min, max }) => {
                    return `[${Number(min)},${Number(max)}]`
                }}
            >
                <EditItem propKey='min' type='min' label='Min' />
                <EditItem propKey='max' type='max' label='Max' />
            </EditSection>

            <EditSection
                title='URL'
                props={['URL']}

            >
                <EditItem propKey='URL' type='text' label='URL' full={true} />
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