import { EditSection } from '../../tools/editbox/EditSection'
import { EditItem } from '../../tools/editbox/EditItem'
import { FormControlLabel, Radio, Typography, Divider } from '@mui/material'
import React from 'react'
import { capitalize } from '../Utilities'

const weightDescription = ({ weight }) => {
    return weight === 400 ? 'Regular' : weight === 500 ? 'Medium' : 'Bold'
}

export const TextfieldSettings = () => {
    return (
        <React.Fragment>
            <EditSection
                title='Typography'
                props={['fontSize', 'fontWeight', 'textAlign']}
                summary={({ fontSize, fontWeight, textAlign }) => {
                    return `${fontSize || 0}, ${weightDescription(fontWeight)}, ${capitalize(textAlign)}`;
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
                <EditItem propKey='fontWeight' type='radio' label={<Typography fontSize='0.95rem'>Left</Typography>}>
                    <FormControlLabel value='400' control={<Radio size='small' />} label={<Typography fontSize='0.9rem'>Regular</Typography>} />
                    <FormControlLabel value='500' control={<Radio size='small' />} label={<Typography fontSize='0.9rem'>Medium</Typography>} />
                    <FormControlLabel value='700' control={<Radio size='small' />} label={<Typography fontSize='0.9rem'>Bold</Typography>} />
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
                    );
                }}
            >
                <EditItem full={true} propKey='color' type='color' label='Text' />
            </EditSection>
        </React.Fragment>
    )
}