"use client"

import Konva from 'konva';
import React, { useEffect, useState } from 'react';
import { Layer, Stage, Rect } from 'react-konva';

class MyRect extends React.Component {
  rect: Konva.Rect | null = null;

  changeSize = () => {
    // to() is a method of `Konva.Node` instances
    if (this.rect) {
      this.rect.to({
        scaleX: Math.random() + 0.8,
        scaleY: Math.random() + 0.8,
        duration: 0.2,
        fill: 'red',
      });
    }
  };

  changeColor = (color: string) => {
    if (this.rect) {
      this.rect.to({
        fill: color,
        duration: 0.2,
      });
    }
  };

  render() {
    return (
      <Rect
        ref={(node) => {
          this.rect = node;
        }}
        width={50}
        height={50}
        fill="green"
        draggable
        onDragStart={this.changeSize}
        onDragEnd={this.changeSize}
        onMouseOver={() => this.changeColor('blue')}
        onMouseOut={() => this.changeColor('green')}
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
        <MyRect />
      </Layer>
    </Stage>
  ) : (
    <div>Loading...</div>
  );
}
