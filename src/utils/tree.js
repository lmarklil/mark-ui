// :: 层次遍历树 ::
//
// 参数：
// onTraverse: 遍历节点时的回调函数 参数：(node,index,level)
// onWrap: 层次切换时的回调函数 参数：(levelNodes,level)
// childrenKey: 孩子节点键值
//
// 待办：
// 1. 增强容错性
export function levelOrderTree(
  tree,
  { onTraverse, onWrap, childrenKey = "children" }
) {
  const queue = [tree]; // 待遍历队列
  let index = 0; // 节点下标
  let level = 0; // 节点层次
  let nextLevelNodeCount = 1; // 下一层节点数

  while (queue.length > 0) {
    if (nextLevelNodeCount === queue.length) {
      level++;
      nextLevelNodeCount = 0; // 重置下一层节点数
      if (onWrap) onWrap([...queue], level);
    }

    const node = queue.shift();
    if (onTraverse) onTraverse(node, index++, level);

    const children = node[childrenKey];
    if (children) {
      children.forEach((child) => {
        queue.push(child);
        nextLevelNodeCount++;
      });
    }
  }
}

// :: 获取树的所有叶子结点 ::
//
// 参数：
// tree: 树
// childrenKey: 孩子属性键值
export function getTreeLeafNodes(tree, childrenKey = "children") {
  const leafNodes = [];
  const children = tree[childrenKey];
  if (children) {
    children.forEach((child) => {
      leafNodes.push(...getTreeLeafNodes(child, childrenKey));
    });
  } else {
    leafNodes.push(tree);
  }
  return leafNodes;
}

// :: 计算树的高度 ::
//
// 参数：
// tree: 树
// childrenKey: 孩子属性键值
export function computeTreeHeight(tree, childrenKey = "children") {
  let height = 1;
  if (tree[childrenKey]) {
    let maxHeight = 1;
    tree[childrenKey].forEach((child) => {
      const childTreeHeight = computeTreeHeight(child, childrenKey);
      if (childTreeHeight > maxHeight) maxHeight = childTreeHeight;
    });
    height += maxHeight;
  }
  return height;
}

// :: 计算树的度 ::
//
// 参数：
// tree: 树
// childrenKey: 孩子属性键值
export function computeTreeDegree(tree, childrenKey = "children") {
  if (tree[childrenKey]) {
    let maxDegree = tree[childrenKey].length;
    tree[childrenKey].forEach((child) => {
      const childTreeDegree = computeTreeDegree(child, childrenKey);
      if (childTreeDegree > maxDegree) maxDegree = childTreeDegree;
    });
    return maxDegree;
  } else {
    return 0;
  }
}
