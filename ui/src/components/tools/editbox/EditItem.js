import { useNode } from '@craftjs/core';
import { Grid, Slider, RadioGroup } from '@mui/material';

import { EditTextInput } from './EditTextInput';

export const EditItem = ({
    full = false,
    propKey,
    type,
    onChange,
    index,
    ...props
}) => {
    const {
        actions: { setProp },
        propValue,
    } = useNode((node) => ({
        propValue: node.data.props[propKey],
    }));
    const value = Array.isArray(propValue) ? propValue[index] : propValue;

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
                ) : null}
            </div>
        </Grid>
    );
};