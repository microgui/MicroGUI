import { useNode } from '@craftjs/core';
import React, { useRef } from 'react';
import { Box } from '@mui/material'

export const Container = ({ width, height, children, ...props }) => {
  const {
    connectors: { connect },
  } = useNode();

  const containerRef = useRef(null);

  return (
    <div
      ref={(ref) => {
        if (ref) {
          containerRef.current = ref;
          connect(containerRef.current);
        }
      }}
      {...props}
    >
      <Box
        sx={{
          width: width,
          height: height,
          backgroundColor: 'red',
        }}>
        {children}
      </Box>
    </div>
  );
};

Container.craft = {
  displayName: 'Container',
  props: {
    id: 'container',
    width: 100,
    height: 120,
  },
};
