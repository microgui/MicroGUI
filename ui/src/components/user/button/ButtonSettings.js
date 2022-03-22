import { EditSection } from "../../tools/editbox/EditSection"
import { EditItem } from "../../tools/editbox/EditItem"
import { FormControlLabel, Radio } from "@mui/material"
import React from 'react'

export const ButtonSettings = () => {
    return (
        <React.Fragment>
            <EditSection
                title="Text"
                props={['text']}
                summary={({ text }) => {
                    return text
                }}
            >
                <EditItem
                    propKey='text'
                    type='text'
                />
            </EditSection>
            <EditSection
                title="Size"
                props={['size']}
                summary={({ size }) => {
                    return size[0].toUpperCase() + size.substr(1, size.length);
                }}
            >
                <EditItem
                    propKey='size'
                    type='radio'
                >
                    <FormControlLabel value='small' control={<Radio/>} label='Small'/>
                    <FormControlLabel value='medium' control={<Radio/>} label='Medium'/>
                    <FormControlLabel value='large' control={<Radio/>} label='Large'/>
                </EditItem>
   
            </EditSection>
        </React.Fragment>
    )
}