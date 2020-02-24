import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Stage, Layer, Text, Arrow, Label, Tag } from 'react-konva';
import PropTypes from 'prop-types';

import { setAnimationStep } from '../actions/actionCreators';
import StackNode from './StackNode';
import { buildDisplayArray } from '../dataTypes/stack';

const stageStyle = {
  border: '1px solid black',
  display: 'inline-block',
};

function getDisplayProps(
  _node,
  _maxDepth,
  _firstColumnX,
  _columns,
  _nodesPerColumn,
  _spacing
) {
  const x =
    _firstColumnX *
    (_columns - Math.floor((_maxDepth - _node.depth) / _nodesPerColumn));
  const y = 450 - ((_maxDepth - _node.depth) % 5) * _spacing;
  return [x, y];
}

const StackCanvas = props => {
  /* eslint-disable no-shadow */
  const { animationState, displaySettings, nodeList } = props;
  /* eslint-enable no-shadow */
  let displayObj;

  if (nodeList.head) {
    displayObj = buildDisplayArray(nodeList);
  } else {
    displayObj = {};
  }
  const {
    radius,
    spacing,
    stageHeight,
    stageWidth,
    nodesPerColumn,
  } = displaySettings;

  const {
    showFirst,
    headLabelDepth,
    headArrow,
    newHeadLabel,
  } = animationState.frame;

  const columns = Math.floor((displayObj.maxDepth - 1) / nodesPerColumn) + 1;
  const firstColumnX = stageWidth / (columns + 1);

  return (
    <Stage height={stageHeight} width={stageWidth} style={stageStyle}>
      <Layer>
        {displayObj.displayArr &&
          displayObj.displayArr.map(node => {
            [node.x, node.y] = getDisplayProps(
              node,
              displayObj.maxDepth,
              firstColumnX,
              columns,
              nodesPerColumn,
              spacing
            );

            const displayNode =
              showFirst || node.depth > 1 ? (
                <StackNode x={node.x} y={node.y} radius={radius} node={node} />
              ) : null;

            let label = null;
            if (node.depth === headLabelDepth) {
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
            } else if (node.depth === 1 && newHeadLabel) {
              label = (
                <Label x={node.x - radius} y={node.y}>
                  <Tag
                    fill="green"
                    pointerDirection="right"
                    pointerWidth={20}
                    pointerHeight={25}
                  />
                  <Text
                    text="NEW HEAD"
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
                  fill={node.depth === 1 ? headArrow : 'black'}
                  stroke={node.depth === 1 ? headArrow : 'black'}
                />
              ) : (
                <Arrow
                  points={[
                    node.x,
                    node.y + radius,
                    node.x,
                    node.y + spacing - radius,
                  ]}
                  fill={node.depth === 1 ? headArrow : 'black'}
                  stroke={node.depth === 1 ? headArrow : 'black'}
                />
              );
            return node.next
              ? [displayNode, arrow, label]
              : [displayNode, label];
          })}
      </Layer>
    </Stage>
  );
};

StackCanvas.propTypes = {
  animationState: {
    animating: PropTypes.bool,
    animationType: PropTypes.string,
    frame: {
      headArrow: PropTypes.string,
      headLabelDepth: PropTypes.number,
      last: PropTypes.bool,
      newHeadLabel: PropTypes.bool,
      showFirst: PropTypes.bool,
    },
    lastStep: PropTypes.number,
    step: PropTypes.number,
  },
  displaySettings: {
    radius: PropTypes.number,
    spacing: PropTypes.number,
    stageHeight: PropTypes.number,
    stageWidth: PropTypes.number,
    nodesPerColumn: PropTypes.number,
  },
  nodeList: PropTypes.object,
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
