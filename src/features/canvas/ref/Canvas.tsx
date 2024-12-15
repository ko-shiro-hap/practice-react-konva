"use client"

import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import React, { useEffect, useState } from 'react';
import { Stage, Layer, Circle, Text } from 'react-konva';

const pulseShape = (shape: Konva.Circle) => {
  // use Konva methods to animate a shape
  shape.to({
    scaleX: 1.5,
    scaleY: 1.5,
    onFinish: () => {
      shape.to({
        scaleX: 1,
        scaleY: 1,
      });
    },
  });
};

export default function Canvas() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const circleRef = React.useRef<Konva.Circle | null>(null);

  const handleStageClick = () => {
    // this event demonstrates how to access Konva node using ref
    const shape = circleRef.current;
    if (shape) {
      pulseShape(shape);
    }
  };

  const handleCircleClick = (e: KonvaEventObject<MouseEvent>) => {
    // another way to access Konva nodes is to just use event object
    const shape = e.target;
    if (shape instanceof Konva.Circle) {
      pulseShape(shape);
    }
    // prevent click on stage
    e.cancelBubble = true;
  };

  return isMounted ? (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onClick={handleStageClick}
      onTap={handleStageClick}
    >
      <Layer>
        <Text text="Click on any place to see an animation" />
        <Circle
          ref={circleRef}
          x={window.innerWidth / 2}
          y={window.innerHeight / 2}
          radius={80}
          fill="red"
          onClick={handleCircleClick}
          onTap={handleCircleClick}
        />
      </Layer>
    </Stage>
  ) : (
    <div>Loading...</div>
  );
}
