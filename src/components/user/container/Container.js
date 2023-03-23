import { useNode, useEditor, Element } from '@craftjs/core';
import React, { useRef } from 'react';
import { Box } from '@mui/material'
import Draggable from 'react-draggable';
import { ContainerSettings } from './ContainerSettings'
import { handleStop, getX, getY } from '../Utilities';
import { useDrop } from 'react-dnd';

export const Container = ({ width, height, backgroundColor, border, childrenJustify, childrenAlign, children, pageX, pageY, ...props }) => {
  const {
    connectors: { connect },
    actions,
  } = useNode();

  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const [, dropRef] = useDrop({
    accept: 'component',
    drop(item, monitor) {
      const offset = monitor.getClientOffset();
      if (offset && containerRef.current) {
        const dropTargetXy = containerRef.current.getBoundingClientRect();
        return {
          x: parseInt(offset.x - dropTargetXy.left),
          y: parseInt(offset.y - dropTargetXy.top),
        };
      }
    },
  });

  const containerRef = useRef(null);

  return (
    <Draggable
      disabled={!enabled}
      bounds="parent"
      nodeRef={containerRef}
      onStop={() => handleStop(actions, containerRef)}
      position={{
        x: getX(pageX, containerRef),
        y: getY(pageY, containerRef),
      }}
    >
      <Box
        ref={(ref) => {
          if (ref) {
            containerRef.current = ref;
            connect(dropRef(ref));
          }
        }}
        {...props}
        id='canvasElement'
        sx={{
          width: width,
          height: height,
          backgroundColor: backgroundColor ? `rgba(${Object.values(backgroundColor)})` : 'red',
          border: border,
          position: 'static',
          overflow: 'visible',
          display: 'flex',
          justifyContent: childrenJustify,
          alignItems: childrenAlign,
          flexDirection: 'column',
        }}>
        {children}
      </Box>

    </Draggable>
  );
};

Container.craft = {
  displayName: 'Container',
  props: {
    id: 'container',
    width: 150,
    height: 180,
    backgroundColor: { r: 204, b: 153, g: 153, a: 1 },
    border: 'solid',
    childrenJustify: 'flex-start',
    childrenAlign: 'flex-start',
  },
  related: {
    toolbar: ContainerSettings
  }
};
