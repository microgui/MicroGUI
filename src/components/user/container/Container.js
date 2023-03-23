import { useNode } from '@craftjs/core';
import React, { useRef } from 'react';
import { Box } from '@mui/material'
import Draggable from 'react-draggable';
import { useEditor } from '@craftjs/core';
import { ContainerSettings } from './ContainerSettings'

export const Container = ({ width, height, backgroundColor, border, childrenJustify, childrenAlign, children, ...props }) => {
  const {
    connectors: { connect },
  } = useNode();

  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const containerRef = useRef(null);

  return (
    <Draggable
      disabled={!enabled}
      bounds="parent"
      nodeRef={containerRef}
    >
      <Box
        ref={(ref) => {
          if (ref) {
            containerRef.current = ref;
            connect(containerRef.current);
          }
        }}
        {...props}

        sx={{
          width: width,
          height: height,
          backgroundColor: backgroundColor ? `rgba(${Object.values(backgroundColor)})` : 'red',
          border: border,
          position: 'relative',
          overflow: 'hidden',
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
    width: 100,
    height: 120,
    backgroundColor: { r: 204, b: 153, g: 153, a: 1 },
    border: 'solid',
    childrenJustify: 'flex-start',
    childrenAlign: 'flex-start',
  },
  related: {
    toolbar: ContainerSettings
  }
};
