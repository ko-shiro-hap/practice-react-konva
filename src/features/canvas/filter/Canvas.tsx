"use client"

import Konva from 'konva';
import React, { useEffect, useState, useRef } from 'react';
import { Stage, Layer, Image, Rect } from 'react-konva';
import useImage from 'use-image';


// the first very simple and recommended way:
const URL = 'https://konvajs.org/assets/lion.png';

// example of functional component
const FilterImage = () => {
  const [image] = useImage(URL, 'anonymous');
  const imageRef = useRef<Konva.Image | null>(null);

  // when image is loaded we need to cache the shape
  useEffect(() => {
    if (image) {
      // you many need to reapply cache on some props changes like shadow, stroke, etc.
      imageRef.current?.cache();
    }
  }, [image]);

  return (
    <Image
      ref={imageRef}
      x={10}
      y={10}
      alt="lion"
      image={image}
      filters={[Konva.Filters.Blur]}
      blurRadius={10}
    />
  );
};

// example of good old classes
// try to click on rect to see color updates
class FilterRect extends React.Component {
  private rect: Konva.Rect | null = null;
  state = {
    color: 'red',
  };

  componentDidMount() {
    this.applyCache();
  }
  handleClick = () => {
    this.setState(
      {
        color: Konva.Util.getRandomColor(),
      },
      () => {
        // recache shape when we updated it
        this.applyCache();
      }
    );
  };
  applyCache() {
    this.rect?.cache();
  }
  render() {
    return (
      <Rect
        filters={[Konva.Filters.Noise]}
        noise={1}
        x={200}
        y={10}
        width={50}
        height={50}
        fill={this.state.color}
        shadowBlur={10}
        ref={(node) => {
          this.rect = node;
        }}
        onClick={this.handleClick}
      />
    );
  }
}

export default function Canvas() {
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });
    setIsMounted(true);
  }, []);

  return isMounted ? (
    <Stage width={dimensions.width} height={dimensions.height}>
      <Layer>
        <FilterImage />
        <FilterRect />
      </Layer>
  </Stage>
  ) : (
    <div>Loading...</div>
  );
}
