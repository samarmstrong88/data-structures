import React, { Component } from 'react';
import { Circle, Text } from 'react-konva';

class StackNode extends Component {
  render() {
    const textWidth = this.props.radius * Math.sqrt(2);
    return (
      <>
        <Circle
          radius={this.props.radius}
          fill="red"
          x={this.props.x}
          y={this.props.y}
        />
        <Text
          text={this.props.node.depth}
          x={this.props.x}
          y={this.props.y}
          width={textWidth}
          height={textWidth}
          offsetX={textWidth / 2}
          offsetY={textWidth / 2}
          align="center"
          verticalAlign="middle"
          fontSize={textWidth * 0.5}
          padding={0}
        />
      </>
    );
  }
}

export default StackNode;
