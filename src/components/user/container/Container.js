import React from 'react';

import { ContainerSettings } from './ContainerSettings';
import { Resizable } from 'react-resizable'

export const Container = ({ flexDirection, alignItems, justifyContent, fillSpace,
  background, color, padding, margin, shadow, radius, children, ...props }) => {

  return (
    <Resizable
      propKey={{ width: 'width', height: 'height' }}
      style={{
        justifyContent,
        flexDirection,
        alignItems,
        background: `rgba(${Object.values(background)})`,
        color: `rgba(${Object.values(color)})`,
        padding: `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`,
        margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
        boxShadow:
          shadow === 0
            ? 'none'
            : `0px 3px 100px ${shadow}px rgba(0, 0, 0, 0.13)`,
        borderRadius: `${radius}px`,
        flex: fillSpace === 'yes' ? 1 : 'unset',
      }}
    >
      {children}
    </Resizable>
  );
};

Container.craft = {
  displayName: 'Container',
  props: {
    flexDirection: 'row',
    alignItems: '',
    justifyContent: '',
    fillSpace: '',
    background: { r: 1, b: 2, g: 3, a: 4 },
    color: { r: 1, b: 2, g: 3, a: 4 },
    padding: [],
    margin: [],
    shadow: 1,
    radius: 1,
    children: React.ReactNode
  },
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: ContainerSettings,
  },
};
