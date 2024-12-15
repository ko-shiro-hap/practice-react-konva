"use client"

import React, { useEffect, useState } from 'react';
import { Layer, Stage, Text } from 'react-konva';
import { Spring, animated } from '@react-spring/konva';

interface ColoredRectState {
  flag: boolean;
}

class ColoredRect extends React.Component<Record<string, never>, ColoredRectState> {
  state: ColoredRectState = { flag: false };
  handleClick = () => this.setState((state) => ({ flag: !state.flag }));
  render() {
    const { flag } = this.state;
    return (
      <Spring
        from={{ x: 0, shadowBlur: 0, fill: 'rgb(10,50,19)' }}
        to={{
          x: flag ? 150 : 50,
          shadowBlur: flag ? 25 : 5,
          fill: flag ? 'seagreen' : 'hotpink',
          width: flag ? 300 : 50,
          height: flag ? 300 : 50,
        }}
      >
        {(props) => (
          <animated.Rect {...props} y={50} onClick={this.handleClick} />
        )}
      </Spring>
    );
  }
}

export default function Canvas() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? (
    <Stage width={window.innerWidth} height={window.innerHeight}>
    <Layer>
      <Text text="Try clicking the rectangle" />
      <ColoredRect />
    </Layer>
  </Stage>
  ) : (
    <div>Loading...</div>
  );
}
