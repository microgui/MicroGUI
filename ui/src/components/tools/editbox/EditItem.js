import { useNode } from '@craftjs/core'
import { Grid, Slider, RadioGroup, Button } from '@mui/material'

import { EditTextInput } from './EditTextInput'

export const EditItem = ({ full = false, propKey, type, ...props }) => {

    const {
        actions: { setProp },
        propValue,
    } = useNode((node) => ({
        propValue: node.data.props[propKey],
    }))

    return (
        <Grid item xs={full ? 12 : 6}>
            <div style={{ paddingTop: '10px' }}>
                {['text', 'color', 'bg', 'number'].includes(type) ? (
                    <EditTextInput
                        {...props}
                        type={type}
                        value={propValue}
                        onChange={(value) => {
                            setProp((props) => {
                                props[propKey] = value;
                            }, 500)
                        }}
                    />
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
                            value={propValue || 0}
                            onChange={(_, value) => {
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
                ) : type === 'sliderInput' ? (
                    <EditTextInput
                        {...props}
                        type={type}
                        value={propValue}
                        onChange={(value) => {
                            setProp((props) => {
                                if (isNaN(parseInt(value))) {
                                    alert('You should only write numbers, duh!')
                                }
                                else if (value <= 300 && value >= 20) {
                                    props[propKey] = value
                                } else {
                                    alert('The slider can be no longer than 300px, and no shorter than 20px.')
                                }
                            }, 500)
                        }}
                    />
                ) : null
                }
            </div>
        </Grid>
    )
}