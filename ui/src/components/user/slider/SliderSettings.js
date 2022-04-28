import React, { useState } from 'react'
import { useNode } from '@craftjs/core'
import { EditSection } from "../../tools/editbox/EditSection"
import { EditItem } from "../../tools/editbox/EditItem"
import { FormControlLabel, Radio, Typography } from "@mui/material"
import { capitalize } from '../Utilities'

export const SliderSettings = () => {
    const [copied, setCopied] = useState(false)

    const { id } = useNode()

    const [connected, setConnected] = useState(false)

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
                title='Size'
                props={['size']}
                summary={({ size }) => {
                    return capitalize(size)
                }}
            >
                <EditItem
                    propKey='size'
                    type='radio'
                >
                    <FormControlLabel value='small' control={<Radio size='small' />} label={<Typography fontSize='0.9rem'>Small</Typography>} />
                    <FormControlLabel value='medium' control={<Radio size='small' />} label={<Typography fontSize='0.9rem'>Medium</Typography>} />
                </EditItem>
            </EditSection>
            <EditSection
                title='Width'
                props={['width']}
                summary={({ width }) => {
                    return width
                }}
            >
                <EditItem 
                    propKey='width' 
                    type='sliderInput' 
                    error={true}
                />
            </EditSection>
            <EditSection
                title='Color'
                props={['background', 'color']}
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
                title={connected ? 'Connected' : 'Connect'}
                props={['connectedNode']}
                summary={({ connectedNode }) => {
                    if (connectedNode) setConnected(true) 
                    else setConnected(false)
                    return connectedNode
                }}
            >
                <EditItem propKey='connectedNode' type='text' full={true} label='Id' />
            </EditSection>
        </React.Fragment>
    )
}