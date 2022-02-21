import { Switch as MaterialSwitch } from '@mui/material';
import { useNode } from '@craftjs/core';
import { useState } from 'react'

export const Switch = ({ size, color, pageX, pageY, defaultChecked, ...props }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({
        x: 0,
        y: 0
    });
    const [coordinates, setCoordinates] = useState({
        x: pageX,
        y: pageY
    });

    const {
        connectors: { connect, drag },
        actions
    } = useNode();

    return (
        <MaterialSwitch
            // ref={(ref) => connect(drag(ref))}
            style={{
                // margin: '5px',
                position: "absolute",
                top: coordinates.y,
                left: coordinates.x,
            }}
            onMouseDown={(event) => {
                setIsDragging(true);
                const { pageX, pageY } = event;
                const { left, top } = event.currentTarget.getBoundingClientRect();
                setOffset({
                    x: pageX - left,
                    y: pageY - top
                });
            }}
            onMouseMove={(event) => {
                if (isDragging) {
                    const { pageX, pageY } = event;

                    const newX = pageX - offset.x;
                    const newY = pageY - offset.y;

                    setCoordinates({
                        x: newX,
                        y: newY
                    });
                }
            }}
            onMouseUp={() => {
                setIsDragging(false);
                actions.setProp((props) => {
                    props.pageX = coordinates.x;
                    props.pageY = coordinates.y;
                });
            }}
            size={size}
            // color={color}
            // defaultChecked={true}
            // disabled
            {...props}
        />
    );
};