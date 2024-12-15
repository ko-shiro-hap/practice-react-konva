"use client"

import { KonvaEventObject } from 'konva/lib/Node';
import React, { useEffect, useState } from 'react';
import { Layer, Stage, Text } from 'react-konva';

class KonvaText extends React.Component {
  state = {
    x: 10,
    y: 10,
  };

  handleDragStart = () => {
    this.setState({
      isDragging: true,
    });
  };

  handleDragEnd = (e: KonvaEventObject<MouseEvent>) => {
    this.setState({
      isDragging: false,
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  render() {
    return (
      <Text
        text="Draggable Text"
        x={this.state.x}
        y={this.state.y}
        draggable
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
        fontSize={40}
      />
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
        <KonvaText />
      </Layer>
    </Stage>
  ) : (
    <div>Loading...</div>
  );
}
