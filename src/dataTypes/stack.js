export class StackNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}
export function buildList(listObj) {
  function build(node) {
    if (node.next) {
      const nextNode = build(listObj[node.next]);
      return new StackNode(node.value, nextNode);
    }
    return new StackNode(node.value);
  }
  const head = build(listObj.head);
  return head;
}

export function buildDisplayArray(listObj) {
  const displayArr = [];
  let maxDepth = 0;

  function build(listObjToBuild, node, depth = 1) {
    displayArr.push({
      value: node.value,
      next: node.next,
      depth,
    });
    if (node.next) {
      return build(listObjToBuild, listObjToBuild[node.next], depth + 1);
    }

    maxDepth = depth;
  }
  build(listObj, listObj.head);
  return { displayArr, maxDepth };
}
