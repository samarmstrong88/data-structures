import React, { useEffect, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Konva from 'konva';
import { Stage, Layer, Circle, Text, Arrow, Label, Tag } from 'react-konva';

import { setAnimationStep } from '../actions/actionCreators';
import StackNode from './StackNode';
import { buildList, buildDisplayArray } from '../dataTypes/stack';
import { getAnimationFrame } from '../animation/animationSteps.js';

const stageStyle = {
  border: '1px solid black',
  display: 'inline-block',
};

const StackCanvas = props => {

  useLayoutEffect(()=> {if (props.animationState.frame === null) props.setAnimationStep('stack', 'static')})



  let nodes;
  let displayObj;
  if (props.nodeList.head) {
    nodes = { head: buildList(props.nodeList) };
    displayObj = buildDisplayArray(props.nodeList); 
  } else {
    nodes = {};
    displayObj = {};
  }

  const {
    radius,
    spacing,
    stageHeight,
    stageWidth,
    nodesPerColumn,
  } = props.displaySettings;

  let showFirst, headLabelDepth, headArrow, newHeadLabel;

  if (props.animationState.frame) {
    ({ showFirst, headLabelDepth, headArrow, newHeadLabel } = props.animationState.frame);
  }
  // } else { const {headLabelDepth, headArrow, newHeadLabel} = getAnimationFrame('stack', 'static', 0)}

  const columns = Math.floor((displayObj.maxDepth - 1) / nodesPerColumn) + 1;
  const firstColumnX = stageWidth / (columns + 1);

  // move this fn outside component
  function getDisplayProps(node_, maxDepth_, nodesPerColumn_, spacing_) {
    const x =
      firstColumnX *
      (columns - Math.floor((maxDepth_ - node_.depth) / nodesPerColumn_));
    const y = 450 - ((maxDepth_ - node_.depth) % 5) * spacing_;
    return [x, y];
  }

  return (
    <Stage height={stageHeight} width={stageWidth} style={stageStyle}>
      <Layer>
        {displayObj.displayArr &&
          displayObj.displayArr.map(node => {
            [node.x, node.y] = getDisplayProps(
              node,
              displayObj.maxDepth,
              nodesPerColumn,
              spacing
            );

            const displayNode = ( showFirst || node.depth > 1 ? 
              <StackNode x={node.x} y={node.y} radius={radius} node={node} /> :
              null
            );

            let label = null;
            if (node.depth == headLabelDepth) {
              label = (
                <Label x={node.x - radius} y={node.y}>
                  <Tag
                    fill="blue"
                    pointerDirection="right"
                    pointerWidth={20}
                    pointerHeight={25}
                  />
                  <Text
                    text="HEAD"
                    fontFamily="Calibri"
                    fontSize={18}
                    padding={5}
                    fill="white"
                  />
                </Label>
              );
            }

            const arrow =
              node.depth % nodesPerColumn ===
                displayObj.maxDepth % nodesPerColumn && node.next ? (
                <Arrow
                  points={[
                    node.x + radius,
                    node.y,
                    node.x + firstColumnX / 2,
                    node.y,
                    node.x + firstColumnX / 2,
                    node.y - (nodesPerColumn - 1) * spacing,
                    node.x + firstColumnX - radius,
                    node.y - (nodesPerColumn - 1) * spacing,
                  ]}
                  fill={node.depth == 1 ? headArrow : 'black'}
                  stroke={node.depth == 1 ? headArrow : 'black'}
                />
              ) : (
                <Arrow
                  points={[
                    node.x,
                    node.y + radius,
                    node.x,
                    node.y + spacing - radius,
                  ]}
                  fill={node.depth == 1 ? headArrow : 'black'}
                  stroke={node.depth == 1 ? headArrow : 'black'}
                />
              );
            return node.next ? [displayNode, arrow, label] : displayNode;
          })}
      </Layer>
    </Stage>
  );
};

function mapStateToProps({ nodeList, displaySettings, animationState }) {
  return {
    nodeList,
    displaySettings,
    animationState,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setAnimationStep }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StackCanvas);
