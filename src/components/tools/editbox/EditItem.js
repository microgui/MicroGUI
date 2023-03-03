import { useNode } from '@craftjs/core'
import { Grid, Slider, RadioGroup, Button } from '@mui/material'
import { useState } from 'react'

import { EditTextInput } from './EditTextInput'

export const EditItem = ({ full = false, propKey, type, ...props }) => {

    const {
        actions: { setProp },
        propValue,
        nodeProps
    } = useNode((node) => ({
        propValue: node.data.props[propKey],
        nodeProps: node.data.props
    }))

    const MinMaxInput = (type) => {
        const [error, setError] = useState(false)

        return (
            <EditTextInput
                {...props}
                type='number'
                value={propValue}
                onChange={(value) => {
                    value = parseInt(value)
                    if ((type === 'min' && value < nodeProps.max) || (type === 'max' && value > nodeProps.min)) {
                        setError(false)
                        setProp((props) => {
                            props[propKey] = value
                        }, 500)
                    } else {
                        setError(true)
                    }
                }}
                error={error}
                helperText={error ?
                    (type === 'min' ? 'Min value must be lower than Max'
                        : 'Max value must be higher than Min')
                    : null
                }
            />
        )
    }

    const SliderWidth = () => {
        const [error, setError] = useState(false)
        const [errorMsg, setErrorMsg] = useState('')

        return (
            <EditTextInput
                {...props}
                type='number'
                value={propValue}
                onChange={(value) => {
                    value = parseInt(value)
                    if (isNaN(value)) {
                        setError(true)
                        setErrorMsg('Only numbers allowed')
                    } else if (value <= 300 && value >= 20) {
                        setError(false)
                        setProp((props) => {
                            props[propKey] = value
                        }, 500)
                    } else {
                        setError(true)
                        setErrorMsg('Width should be 20-300 px')
                    }
                }}
                error={error}
                helperText={error ? errorMsg : null}
            />
        )
    }

    const NumberType = () => {
        const [error, setError] = useState(false)

        return (
            <EditTextInput
                {...props}
                type={type}
                value={propValue}
                onChange={(value) => {
                    value = parseInt(value)
                    if (!isNaN(value)) {
                        setError(false)
                        setProp((props) => {
                            props[propKey] = value
                        }, 500)
                    } else {
                        setError(true)
                    }
                }}
                error={error}
                helperText={error ? 'Insert valid number' : null}
            />
        )
    }

    const ArrayType = () => {
        const [error, setError] = useState(false);

        return (
            <EditTextInput
                {...props}
                value={propValue}
                onChange={(event) => {
                    const newValue = event // get value entered into settings-form
                    try {
                        const parsedValue = newValue.split(',').map((item) => { // split on commas, map over every element
                            return item.trim(); //remove whitespaces before/after
                        });
                        setProp((props) => {
                            props[propKey] = parsedValue;   // if nothing is set, 0 is default value, e.g ',' ==> '0' for the label
                        }, 500);
                        setError(false);
                    } catch {
                        setError(true);
                    }
                }}
                error={error}
                helperText={error ? 'Insert valid array' : null}
            />
        );
    };


    return (
        <Grid item xs={full ? 12 : 6}>
            <div style={{ paddingTop: '10px' }}>
                {['text', 'color', 'bg'].includes(type) ? (
                    <EditTextInput
                        {...props}
                        type={type}
                        value={propValue}
                        onChange={(value) => {
                            setProp((props) => {
                                props[propKey] = value
                            }, 500)
                        }}
                    />
                ) : type === 'number' ? (
                    NumberType()
                ) : type === 'array' ? (
                    ArrayType()
                ) : type === 'slider' ? (
                    <>
                        {props.label ? (
                            <h4>{props.label}</h4>
                        ) : null}
                        <Slider
                            value={parseInt(propValue) || 0}
                            onChange={((_, value) => {
                                setProp((props) => {
                                    props[propKey] = value
                                }, 1000)
                            })}
                        />
                    </>
                ) : type === 'radio' ? (
                    <>
                        {props.label ? (
                            <h4>{props.label}</h4>
                        ) : null}
                        <RadioGroup
                            value={propValue}
                            onChange={(_, value) => {
                                if (!isNaN(value)) value = parseInt(value)
                                setProp((props) => {
                                    props[propKey] = value
                                })
                            }}
                        >
                            {props.children}
                        </RadioGroup>
                    </>
                ) : type === 'button' ? (
                    <div style={{ marginLeft: '-40px' }}>
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
                    </div>
                ) : type === 'min' ? (
                    MinMaxInput(type)
                ) : type === 'max' ? (
                    MinMaxInput(type)
                ) : type === 'sliderWidth' ? (
                    SliderWidth()
                ) : null
                }
            </div>
        </Grid>
    )
}