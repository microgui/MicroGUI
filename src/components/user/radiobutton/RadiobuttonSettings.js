import { EditSection } from "../../tools/editbox/EditSection"
import { EditItem } from "../../tools/editbox/EditItem"
import { FormControlLabel, Radio, Typography } from "@mui/material"
import React, { useState } from 'react'
import { useNode } from '@craftjs/core'
import { capitalize } from '../Utilities'

export const RadiobuttonSettings = () => {
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
                    return capitalize(size)
                }}
            >
                <EditItem
                    propKey='size'
                    type='radio'
                >
                    <FormControlLabel value='small' control={<Radio size='small' />} label={<Typography fontSize='0.9rem'>Small</Typography>} />
                    <FormControlLabel value='medium' control={<Radio size='small' />} label={<Typography fontSize='0.9rem'>Medium</Typography>} />
                    <FormControlLabel value='large' control={<Radio size='small' />} label={<Typography fontSize='0.9rem'>Large</Typography>} />
                </EditItem>
            </EditSection>
            <EditSection
                title='Color'
                props={['background', 'color']}
                summary={({ background, color }) => {
                    return (
                        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                            <div
                                style={{
                                    background:
                                        background && `rgba(${Object.values(background)})`,
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    borderRadius: '50%',
                                    height: '20px',
                                    width: '20px'
                                }}
                            >
                                <p
                                    style={{
                                        color: color && `rgba(${Object.values(color)})`,
                                        width: '100%',
                                        textAlign: 'center'
                                    }}
                                >
                                    T
                                </p>
                            </div>
                        </div>
                    )
                }}
            >
                <EditItem
                    full={true}
                    propKey='background'
                    type='bg'
                    label='Color'
                />

            </EditSection>

            <EditSection
                title='Amount'
                props={['amount']}
                summary={({ amount }) => {
                    return amount
                }}
            >
                <EditItem
                    propKey='amount'
                    type='number'
                    label='amount'
                    full={true}
                />
            </EditSection>

            <EditSection
                title='Labels'
                props={['labelTexts']}
            >
                <EditItem
                    propKey='labelTexts'
                    label={'labels'}
                    type='array'
                    full={true}
                />

                <p
                    style={{
                        width: '100%',
                        textAlign: 'center',
                        fontSize: 13,
                        color: 'gray',
                        marginTop: '20px'
                    }}
                >
                    Enter your labels separated by commas
                </p>


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

        </React.Fragment >
    )
} 
