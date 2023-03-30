import { EditSection } from "../../tools/editbox/EditSection"
import { EditItem } from "../../tools/editbox/EditItem"
import { FormControlLabel, Radio, Typography } from "@mui/material"

import { Tooltip } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import React, { useState } from 'react'
import { useNode } from '@craftjs/core'

export const CanvasObjectSettings = () => {
    const [copied, setCopied] = useState(false)

    const { id } = useNode()

    const copyId = () => {
        setCopied(true)
        navigator.clipboard.writeText(id)
    }

    const { actions } = useNode()

    const [isImage, setIsImage] = useState(false)

    const loadFile = (file) => {
        var reader = new FileReader()
        reader.onload = function () {
            actions.setProp((props) => {
                props.image = reader.result
                props.background = props.background ? props.background : { r: 255, g: 255, b: 255, a: 1 }
            })
        }
        reader.readAsDataURL(file)
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
                title='Image'
                props={['image']}
                summary={({ image }) => {
                    return (
                        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                            <div
                                style={{
                                    backgroundImage: `url(${image})`,
                                    backgroundPosition: '0 0',
                                    backgroundSize: '20px 20px',
                                    borderRadius: '50%',
                                    height: '20px',
                                    width: '20px'
                                }}
                            />
                        </div>
                    )
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%'
                    }}
                >
                    < input
                        type='file'
                        onChange={(e) => {
                            loadFile(e.target.files[0])
                            setIsImage(true)
                        }}
                        id='custom-file-input'
                    />
                    {isImage ?
                        <Tooltip
                            title='Remove image'
                        >
                            <ClearIcon
                                sx={{ marginTop: '20px' }}
                                onClick={() => {
                                    document.getElementById('custom-file-input').value = null
                                    actions.setProp((props) => {
                                        props.image = null
                                    })
                                    setIsImage(false)
                                }}
                            />
                        </Tooltip>
                        : null
                    }
                </div>
            </EditSection>

            <EditSection
                title='Size'
                props={['width', 'height']}
                summary={({ width, height }) => {
                    return `width: ${width}px, height: ${height}px`
                }}
            >
                <EditItem propKey='width' type='number' label='Width' />
                <EditItem propKey='height' type='number' label='Height' />
            </EditSection>

            <EditSection
                title='Variant'
                props={['variant']}
                summary={({ variant }) => {
                    return (variant)
                }}
            >
                <EditItem
                    propKey='variant'
                    type='radio'
                >


                    <FormControlLabel value='100% 100%' control={<Radio size='small' />} label={<Typography fontSize='0.9rem'>Stretch</Typography>} />
                    <FormControlLabel value='cover' control={<Radio size='small' />} label={<Typography fontSize='0.9rem'>Cover</Typography>} />
                    <FormControlLabel value='contain' control={<Radio size='small' />} label={<Typography fontSize='0.9rem'>Contain</Typography>} />

                </EditItem>
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