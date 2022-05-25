import React, { useState } from 'react'
import { useNode } from '@craftjs/core'
import { EditSection } from "../../tools/editbox/EditSection"
import { EditItem } from "../../tools/editbox/EditItem"
import { FormControlLabel, Radio, Typography } from "@mui/material"
import { capitalize } from '../Utilities'

export const DividerSettings = () => {
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
                title='Length'
                props={['length']}
                summary={({ length }) => {
                    return `${length}px`
                }}
            >
                <EditItem propKey='length' type='number' label='px'/>
            </EditSection>
            <EditSection
                title='Thickness'
                props={['thickness']}
                summary={({ thickness }) => {
                    return `${thickness}px`
                }}
            >
                <EditItem propKey='thickness' type='number' label='px' />
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
                <EditItem full={true} propKey='color' type='color' />
            </EditSection>
            <EditSection
                title='Orientation'
                props={['orientation']}
                summary={({ orientation }) => {
                    return capitalize(orientation)
                }}
            >
                <EditItem propKey='orientation' type='radio'>
                    <FormControlLabel value='horizontal' control={<Radio size='small' />} label={<Typography fontSize='0.9rem'>Horizontal</Typography>} />
                    <FormControlLabel value='vertical' control={<Radio size='small' />} label={<Typography fontSize='0.9rem'>Vertical</Typography>} />
                </EditItem>
            </EditSection>
        </React.Fragment>
    )
}