"use client"

import React, { useEffect, useState } from 'react';
import { Layer, Stage, Rect } from 'react-konva';
import { Html } from 'react-konva-utils';


export default function Canvas() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? (
    <Stage width={window.innerWidth} height={window.innerHeight}>
    <Layer>
      <Html>
        <input placeholder="DOM input from Konva nodes" />
        <div>Hello</div>
        <button>Click me</button>
      </Html>
      <Rect
        x={20}
        y={20}
        width={50}
        height={50}
        fill="red"
        shadowBlur={5}
      />
      </Layer>
    </Stage>
  ) : (
    <div>Loading...</div>
  );
}
