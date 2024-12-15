"use client"

import Konva from 'konva';
import React, { useEffect, useState } from 'react';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';


// the first very simple and recommended way:
const LionImage = () => {
  const [image] = useImage('https://konvajs.org/assets/lion.png');
  return <Image image={image} alt="lion" />;
};

class URLImage extends React.Component<{ src: string, x: number, y: number }> {
  private image: CanvasImageSource | null = null;
  private imageNode: Konva.Image | null = null;

  state: {
    image: CanvasImageSource | null;
  } = {
    image: null,
  };

  componentDidMount() {
    this.loadImage();
  }
  componentDidUpdate(oldProps: { src: string }) {
    if (oldProps.src !== this.props.src) {
      this.loadImage();
    }
  }
  componentWillUnmount() {
    if (this.image) {
      (this.image as HTMLImageElement).removeEventListener('load', this.handleLoad);
    }
  }
  loadImage() {
    // save to "this" to remove "load" handler on unmount
    this.image = new window.Image();
    this.image.src = this.props.src;
    this.image.addEventListener('load', this.handleLoad);
  }
  handleLoad = () => {
    this.setState({
      image: this.image as HTMLImageElement
    });
  };
  render() {
    return (
      <Image
        x={this.props.x}
        y={this.props.y}
        alt="image"
        image={this.state.image || undefined}
        ref={(node) => {
          this.imageNode = node;
        }}
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
        <URLImage src="https://konvajs.org/assets/yoda.jpg" x={150} y={150} />
        <LionImage />
      </Layer>
    </Stage>
  ) : (
    <div>Loading...</div>
  );
}
