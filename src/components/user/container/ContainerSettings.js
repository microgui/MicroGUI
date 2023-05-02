import React, { useState } from 'react'
import { useNode } from '@craftjs/core'
import { EditSection } from "../../tools/editbox/EditSection"
import { EditItem } from "../../tools/editbox/EditItem"
import { FormControlLabel, Radio, Typography, Switch } from "@mui/material"


export const ContainerSettings = () => {
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
                title='Draggable'
                props={["draggable"]}
                summary={({ draggable }) => {
                    return draggable
                }}>
                <EditItem propKey='draggable' type='switch'>
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
                title="Children Justify"
                props={["childrenJustify"]}
                summary={({ childrenJustify }) => {
                    return childrenJustify
                }}
            >
                <EditItem propKey='childrenJustify' type='radio'>
                    <FormControlLabel value='flex-start' control={<Radio size='small' />} label={<Typography fontSize='0.9rem'>Flex-Start</Typography>} />
                    <FormControlLabel value='flex-end' control={<Radio size='small' />} label={<Typography fontSize='0.9rem'>Flex-End</Typography>} />
                    <FormControlLabel value='center' control={<Radio size='small' />} label={<Typography fontSize='0.9rem'>Center</Typography>} />
                    <FormControlLabel value='space-between' control={<Radio size='small' />} label={<Typography fontSize='0.9rem'>Space-Between</Typography>} />
                    <FormControlLabel value='space-around' control={<Radio size='small' />} label={<Typography fontSize='0.9rem'>Space-Around</Typography>} />
                </EditItem>
            </EditSection>
            <EditSection
                title="Children Align"
                props={["childrenAlign"]}
                summary={({ childrenAlign }) => {
                    return childrenAlign
                }}
            >
                <EditItem propKey='childrenAlign' type='radio'>
                    <FormControlLabel value='flex-start' control={<Radio size='small' />} label={<Typography fontSize='0.9rem'>Start</Typography>} />
                    <FormControlLabel value='flex-end' control={<Radio size='small' />} label={<Typography fontSize='0.9rem'>End</Typography>} />
                    <FormControlLabel value='center' control={<Radio size='small' />} label={<Typography fontSize='0.9rem'>Center</Typography>} />
                    <FormControlLabel value='stretch' control={<Radio size='small' />} label={<Typography fontSize='0.9rem'>Stretch</Typography>} />
                </EditItem>
            </EditSection>
            <EditSection
                title="Children Direction"
                props={["childrenDirection"]}
                summary={({ childrenDirection }) => {
                    return childrenDirection
                }}
            >
                <EditItem propKey='childrenDirection' type='radio'>
                    <FormControlLabel value='column' control={<Radio size='small' />} label={<Typography fontSize='0.9rem'>Column</Typography>} />
                    <FormControlLabel value='row' control={<Radio size='small' />} label={<Typography fontSize='0.9rem'>Row</Typography>} />
                </EditItem>
            </EditSection>


        </React.Fragment>
    )
}
