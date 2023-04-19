import React, { useState } from 'react'
import { useNode } from '@craftjs/core'
import { EditSection } from '../../tools/editbox/EditSection'
import { EditItem } from '../../tools/editbox/EditItem'
import { FormControlLabel, Radio, Typography } from '@mui/material'
import { capitalize } from '../Utilities'

const weightDescription = (weight) => {
    return weight === 400 ? 'Regular' : weight === 500 ? 'Medium' : 'Bold'
}

export const TextfieldSettings = () => {
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
                title='Typography'
                props={['fontSize', 'fontWeight', 'textAlign']}
                summary={({ fontSize, fontWeight, textAlign }) => {
                    return `${fontSize || 0}, ${capitalize(textAlign)}, ${weightDescription(fontWeight)}`
                }}
            >
                <EditItem
                    full={true}
                    propKey='fontSize'
                    type='slider'
                    label={<Typography fontSize='0.95rem'>Font size</Typography>}
                />
                <EditItem propKey='textAlign' type='radio' label={<Typography fontSize='0.95rem'>Align</Typography>}>
                    <FormControlLabel value='left' control={<Radio size='small' />} label={<Typography fontSize='0.9rem'>Left</Typography>} />
                    <FormControlLabel value='center' control={<Radio size='small' />} label={<Typography fontSize='0.9rem'>Center</Typography>} />
                    <FormControlLabel value='right' control={<Radio size='small' />} label={<Typography fontSize='0.9rem'>Right</Typography>} />
                </EditItem>
                <EditItem propKey='fontWeight' type='radio' label={<Typography fontSize='0.95rem'>Style</Typography>}>
                    <FormControlLabel value={400} control={<Radio size='small' />} label={<Typography fontSize='0.9rem'>Regular</Typography>} />
                    <FormControlLabel value={500} control={<Radio size='small' />} label={<Typography fontSize='0.9rem'>Medium</Typography>} />
                    <FormControlLabel value={700} control={<Radio size='small' />} label={<Typography fontSize='0.9rem'>Bold</Typography>} />
                </EditItem>
            </EditSection>
            <EditSection
                title='Color'
                props={['color']}
                summary={({ color }) => {
                    return (
                        <div style={{ textAlign: 'right' }}>
                            <p
                                style={{
                                    color: color && `rgba(${Object.values(color)})`,
                                    textAlign: 'right'
                                }}
                            >
                                T
                            </p>
                        </div>
                    )
                }}
            >
                <EditItem full={true} propKey='color' type='color' label='Text' />
            </EditSection>

            <EditSection
                title='URL'
                props={['URL']}

            >
                <EditItem propKey='URL' type='text' label='URL' full={true} />

                <p
                    style={{
                        width: '100%',
                        textAlign: 'center',
                        fontSize: 13,
                        color: 'gray',
                        marginTop: '20px'
                    }}
                >
                    URL for an API 
                </p>

            </EditSection>

            <EditSection
                title='Interval'
                props={['interval']}

            >
                <EditItem propKey='interval' type='number' label='Interval' full={true} />

                <p
                    style={{
                        width: '100%',
                        textAlign: 'center',
                        fontSize: 13,
                        color: 'gray',
                        marginTop: '20px'
                    }}
                >
                    This interval referes to the frequency of how often the API updates (in seconds)
                </p>

            </EditSection>

            <EditSection
                title='Key '
                props={['key']}

            >
                <EditItem propKey='key' type='text' label='Key' full={true} />

                <p
                    style={{
                        width: '100%',
                        textAlign: 'center',
                        fontSize: 13,
                        color: 'gray',
                        marginTop: '20px'
                    }}
                >
                    This is the JSON key to be extracted from the API 
                </p>
            </EditSection>



        </React.Fragment>
    )
}