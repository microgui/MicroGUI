import { EditSection } from "../../tools/editbox/EditSection"
import { EditItem } from "../../tools/editbox/EditItem"
import { FormControlLabel, Radio, Typography } from "@mui/material"
import React from 'react'
import { capitalize } from '../Utilities'

export const ButtonSettings = () => {
    return (
        <React.Fragment>
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
                title='Variant'
                props={['variant']}
                summary={({ variant }) => {
                    return capitalize(variant)
                }}
            >
                <EditItem
                    propKey='variant'
                    type='radio'
                >
                    <FormControlLabel value='text' control={<Radio size='small' />} label={<Typography fontSize='0.9rem'>Text</Typography>} />
                    <FormControlLabel value='contained' control={<Radio size='small' />} label={<Typography fontSize='0.9rem'>Contained</Typography>} />
                    <FormControlLabel value='outlined' control={<Radio size='small' />} label={<Typography fontSize='0.9rem'>Outlined</Typography>} />
                </EditItem>
            </EditSection>
            <EditSection
                title='Colors'
                props={['background', 'color']}
                summary={({ background, color }) => {
                    return (
                        <div style={{display:'flex', flexDirection:'row-reverse'}}>
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
                    label='Background'
                />
                <EditItem 
                    full={true} 
                    propKey='color' 
                    type='color' 
                    label='Text' 
                />
            </EditSection>
        </React.Fragment>
    )
}