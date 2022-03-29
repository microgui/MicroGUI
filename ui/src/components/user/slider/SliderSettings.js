import { EditSection } from "../../tools/editbox/EditSection"
import { EditItem } from "../../tools/editbox/EditItem"
import { FormControlLabel, Radio, Typography } from "@mui/material"
import React from 'react'
import { capitalize } from '../Utilities'

export const SliderSettings = () => {
    return (
        <React.Fragment>
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
                <EditItem propKey='width' type='text' />
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
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    textAlign: 'center',
                                    alignItems: 'center',
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
        </React.Fragment>
    )
}