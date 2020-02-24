const animationFrame = {
  stack: {
    static: [
      {
        showFirst: true,
        headLabelDepth: 1,
        headArrow: 'black',
        newHeadLabel: false,
        last: true,
      },
    ],
    push: [
      {
        showFirst: false,
        headLabelDepth: 2,
        headArrow: null,
        newHeadLabel: false,
        last: false,
      },
      {
        showFirst: true,
        headLabelDepth: 2,
        headArrow: null,
        newHeadLabel: true,
        last: false,
      },
      {
        showFirst: true,
        headLabelDepth: 2,
        headArrow: 'green',
        newHeadLabel: true,
        last: false,
      },
      {
        showFirst: true,
        headLabelDepth: 1,
        headArrow: 'black',
        newHeadLabel: false,
        last: true,
      },
    ],
    pop: [
      {
        showFirst: true,
        headLabelDepth: 2,
        headArrow: 'black',
        newHeadLabel: false,
        last: false,
      },
      {
        showFirst: false,
        headLabelDepth: 2,
        headArrow: null,
        newHeadLabel: false,
        last: true,
      },
      {
        showFirst: true,
        headLabelDepth: 1,
        headArrow: 'black',
        newHeadLabel: false,
        last: true,
      },
    ],
  },
};

export function getAnimationFrame(dataType, operation = 'static', i = 0) {
  if (!operation) return animationFrame[dataType].static[0];
  const lastIndex = animationFrame[dataType][operation].length - 1;
  if (i < 0 || i > lastIndex) i = lastIndex;
  return animationFrame[dataType][operation][i];
}

export function getLastAnimationStep(dataType, operation = 'static') {
  if (!operation) return 0;
  return animationFrame[dataType][operation].length - 1;
}
