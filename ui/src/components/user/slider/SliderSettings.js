import React, { useState, useEffect } from 'react'
import { useNode } from '@craftjs/core'
import { EditSection } from "../../tools/editbox/EditSection"
import { EditItem } from "../../tools/editbox/EditItem"
import { FormControlLabel, Radio, Typography } from "@mui/material"
import { capitalize } from '../Utilities'

export const SliderSettings = () => {
    const [copied, setCopied] = useState(false)

    const { id, props } = useNode((node) => ({
        props: node.data.props
    }))

    const [connected, setConnected] = useState(false)

    useEffect(() => {
        const connectedNode = props.connectedNode
        if (connectedNode) setConnected(true)
        else setConnected(false)
    }, [props.connectedNode])

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
                    return `X: ${Number(pageX).toFixed(0)}, Y: ${Number(pageY).toFixed(0)}`
                }}
            >
                <EditItem propKey='pageX' type='number' label='X' />
                <EditItem propKey='pageY' type='number' label='Y' />
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
                    return `${width}px`
                }}
            >
                <EditItem propKey='width' type='sliderWidth' label='px' full={true} />
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
                title='Value label'
                props={['valueLabelDisplay']}
                summary={({ valueLabelDisplay }) => {
                    return capitalize(valueLabelDisplay)
                }}
            >
                <EditItem
                    propKey='valueLabelDisplay'
                    type='radio'
                >
                    <FormControlLabel value='auto' control={<Radio size='small' />} label={<Typography fontSize='0.9rem'>Auto</Typography>} />
                    <FormControlLabel value='off' control={<Radio size='small' />} label={<Typography fontSize='0.9rem'>Off</Typography>} />
                    <FormControlLabel value='on' control={<Radio size='small' />} label={<Typography fontSize='0.9rem'>On</Typography>} />
                </EditItem>
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
                    return connectedNode
                }}
            >
                <EditItem propKey='connectedNode' type='text' full={true} label='Id' />
            </EditSection>
        </React.Fragment>
    )
}