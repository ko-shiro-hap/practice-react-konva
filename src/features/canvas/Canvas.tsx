"use client"

import React, { useEffect, useState } from 'react';
import { Stage, Layer, Rect, Text, Circle, Line, Shape } from 'react-konva';

export default function Canvas() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? (
    <Stage width={500} height={500}>
      <Layer>
        <Text text="Some text on canvas" fontSize={15} />
        <Rect
          x={20}
          y={50}
          width={100}
          height={100}
          fill="red"
          shadowBlur={10}
        />
        <Circle x={200} y={100} radius={50} fill="green" />
        <Line
          x={20}
          y={200}
          points={[0, 0, 100, 0, 100, 100]}
          tension={0.5}
          closed
          stroke="black"
          fillLinearGradientStartPoint={{ x: -50, y: -50 }}
          fillLinearGradientEndPoint={{ x: 50, y: 50 }}
          fillLinearGradientColorStops={[0, 'red', 1, 'yellow']}
        />
        <Shape
            width={260}
            height={170}
            x={280}
            y={50}
            sceneFunc={function (context, shape) {
              const width = shape.width();
              const height = shape.height();
              context.beginPath();
              context.moveTo(0, 0);
              context.lineTo(width - 40, height - 90);
              context.quadraticCurveTo(width - 110, height - 70, width, height);
              context.closePath();

              // (!) Konva specific method, it is very important
              context.fillStrokeShape(shape);
            }}
            fill="#00D2FF"
            stroke="black"
            strokeWidth={4}
          />
      </Layer>
    </Stage>
  ) : (
    <div>Loading...</div>
  );
}
