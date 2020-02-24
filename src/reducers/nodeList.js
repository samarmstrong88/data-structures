import { StackNode } from '../dataTypes/stack.js';

const initialNodeList = null;

const nodeList = (state = initialNodeList, action) => {
  switch (action.type) {
    case 'PUSH_NODE':
      if (state.head) {
        const key = Object.keys(state).length;
        return {
          ...state,
          [key]: state.head,
          head: new StackNode(action.nodeVal, key),
        };
      }
      return {
        ...state,
        head: new StackNode(action.nodeVal),
      };

    case 'POP_NODE': {
      let nextKey;
      if (state.head) {
        nextKey = state.head.next;
      }
      if (nextKey) {
        const { head, [nextKey]: nextNode, ...rest } = state;
        console.log(head, nextNode, rest);

        return {
          head: nextNode,
          ...rest,
        };
      }

      return {
        head: null,
      };
    }
    default:
      return state;
  }
};

export default nodeList;
