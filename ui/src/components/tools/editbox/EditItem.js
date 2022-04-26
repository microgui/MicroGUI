import { useNode } from '@craftjs/core'
import { Grid, Slider, RadioGroup, Button } from '@mui/material'

import { EditTextInput } from './EditTextInput'

export const EditItem = ({ full = false, propKey, type, onChange,
    index, ...props }) => {

    const {
        actions: { setProp },
        propValue,
    } = useNode((node) => ({
        propValue: node.data.props[propKey],
    }))

    const value = Array.isArray(propValue) ? propValue[index] : propValue

    return (
        <Grid item xs={full ? 12 : 6}>
            <div>
                {['text', 'color', 'bg', 'number'].includes(type) ? (
                    <EditTextInput
                        {...props}
                        type={type}
                        value={value}
                        onChange={(value) => {
                            setProp((props) => {
                                if (Array.isArray(propValue)) {
                                    props[propKey][index] = onChange ? onChange(value) : value;
                                } else {
                                    props[propKey] = onChange ? onChange(value) : value;
                                }
                            }, 500);
                        }}
                    />
                ) : type === 'slider' ? (
                    <>
                        {props.label ? (
                            <h4>{props.label}</h4>
                        ) : null}
                        <Slider
                            value={parseInt(value) || 0}
                            onChange={
                                ((_, value) => {
                                    setProp((props) => {
                                        if (Array.isArray(propValue)) {
                                            props[propKey][index] = onChange
                                                ? onChange(value)
                                                : value;
                                        } else {
                                            props[propKey] = onChange ? onChange(value) : value;
                                        }
                                    }, 1000);
                                })
                            }
                        />
                    </>
                ) : type === 'radio' ? (
                    <>
                        {props.label ? (
                            <h4>{props.label}</h4>
                        ) : null}
                        <RadioGroup
                            value={value || 0}
                            onChange={(e) => {
                                const value = e.target.value;
                                setProp((props) => {
                                    props[propKey] = onChange ? onChange(value) : value;
                                });
                            }}
                        >
                            {props.children}
                        </RadioGroup>
                    </>
                ) : type === 'button' ? (
                    <>
                        {props.label ? (
                            <h4>{props.label}</h4>
                        ) : null}
                        <Button
                            disabled={props.disabled}
                            onClick={props.onClick}
                            variant='contained'
                            size='small'
                        >
                            {props.children}
                        </Button>
                    </>
                ) : type === 'sliderInput' ? (
                    <EditTextInput
                        {...props}
                        type={type}
                        value={value}
                        onChange={(value) => {
                            setProp((props) => {
                                if (Array.isArray(propValue)) {
                                    props[propKey][index] = onChange ? onChange(value) : value;
                                } else {
                                    if(isNaN(parseInt(value))){
                                        alert('You should only write numbers, duh!')
                                    }
                                    else if(value <= 300 && value >= 20){
                                        props[propKey] = value;
                                    } else {
                                        alert('The slider can be no longer than 300px, and no shorter than 20px.')    
                                    }
                                }
                            }, 500);
                        }}
                    />
                ): null
                }
            </div>
        </Grid>
    )
}