import BinarySearchTree from "./BinarySearchTree";
import BinarySearchTreeNode from "./BinarySearchTreeNode";
import { ComparatorFunction } from "../../utils/comparator";

enum BalanceFactor {
  UNBALANCED_RIGHT = 1,
  SLIGHTLY_UNBALANCED_RIGHT = 2,
  BALANCED = 3,
  SLIGHTLY_UNBALANCED_LEFT = 4,
  UNBALANCED_LEFT = 5
}

export class AVLTree<T> extends BinarySearchTree<T> {
  constructor(compareFunction?: ComparatorFunction<T>) { // eslint-disable-line
    super(compareFunction);
  }

  private getNodeHeight(node: BinarySearchTreeNode<T> | null): number {
    if (node === null) {
      return -1;
    }
    return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1;
  }

  /**
* Left left case: rotate right
*
*       b                           a
*    L / \                         / \
*     a   e -> rotationLL(b) ->   c   b
*  L / \                         /   / \
*   c   d                       f   d   e
*  /
* f
* @description LL 左左：左侧子节点的高度大于右侧子节点的高度时，
* 并且左侧子节点也是平衡或左侧较重的，此时需要向右做单旋转
* @author fengshaojian
* @private
* @param node BinarySearchTreeNode<T>
* @return {BinarySearchTreeNode<T>}
*/
  private rotationLL(node: BinarySearchTreeNode<T>) {
    const leftNode = node.left as BinarySearchTreeNode<T>;
    node.left = leftNode.right;
    leftNode.right = node;
    return leftNode;
  }

  /**
* Right Right case: rotate left
*
*     a                                 b
*    / \ R                             / \
*   c   b   -> rotationRR(a) ->       a   e
*      / \ R                        /  \   \
*     d   e                        c    d   f
*          \
            f
* @description RR 右右：右侧子节点的高度大于左侧子节点的高度时，并且右侧子节点也是平衡或右侧较重的，此时需要向左做单旋转
* @author fengshaojian
* @private
* @param node BinarySearchTreeNode<T>
* @return {BinarySearchTreeNode<T>}
*/
  private rotationRR(node: BinarySearchTreeNode<T>) {
    const rightNode = node.right as BinarySearchTreeNode<T>;
    node.right = rightNode.left;
    rightNode.left = node;
    return rightNode;
  }

  /**
  * Left Right case: rotate left then right
  *
  *     a                                a                               e
  *    / \                              / \                             / \
  *   c   b   -> rotationRR(c) ->      e   b  -> rotationLL(a) ->      c   a
  *  / \                              / \                             / \ / \
  * d   e                            c   g                           d  f g  b
  *    / \                          / \
      f   g                        d   f
   * @description  Left right case: rotate left then right
   * 指的是左侧节点的高度大于右侧节点的高度，并且左侧节点是右侧较重的，此时需要做向右的双旋转
   * 具体为对左侧子节点做向左的单旋转，这样会形成左-左的情况，然后再对不平
   * 衡的节点进行一个右旋转来修复
   * @author fengshaojian
   * @private
   * @param {BinarySearchTreeNode<T>} node
   * @memberof AVLTree
   */
  private rotationLR(node: BinarySearchTreeNode<T>) {
    node.left = this.rotationRR(node.left as BinarySearchTreeNode<T>);
    return this.rotationLL(node);
  }

  /**
  * Right Left case: rotate right then left
  *
  *     a                                a                               d
  *    / \                              / \                             / \
  *   c   b   -> rotationLL(b) ->      c   d  -> rotationRR(a) ->      a   b
  *      / \                              / \                         / \ / \
  *     d   e                            f   b                        c f g  e
  *    / \                                  / \
      f   g                                g   e
   * @description  Right left case: rotate right then left
   * 指的是右侧节点的高度大于左侧节点的高度，并且右侧节点是左侧较重的，此时需要做向左的双旋转
   * 具体为对右侧子节点做向右的单旋转，这样会形成右-右的情况，然后再对不平
   * 衡的节点进行一个左旋转来修复
   * @author fengshaojian
   * @private
   * @param {BinarySearchTreeNode<T>} node
   * @memberof AVLTree
   */
  private rotationRL(node: BinarySearchTreeNode<T>) {
    node.right = this.rotationLL(node.right as BinarySearchTreeNode<T>);
    return this.rotationRR(node);
  }

  private getBalanceFactor(node: BinarySearchTreeNode<T>) {
    // 平衡因子
    const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
    switch (heightDifference) {
      case -2:
        return BalanceFactor.UNBALANCED_RIGHT;
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
      case 2:
        return BalanceFactor.UNBALANCED_LEFT;
      default:
        return BalanceFactor.BALANCED;
    }
  }

  insert(value: T) {
    this.root = this.insertNode(this.root, value);
  }

  protected insertNode(node: BinarySearchTreeNode<T> | null, value: T) {
    if (node === null) {
      return new BinarySearchTreeNode<T>(value);
    } else if (this.compare.lessThan(value, node.value)) {
      node.left = this.insertNode(node.left, value);
    } else if (this.compare.greaterThan(value, node.value)) {
      node.right = this.insertNode(node.right, value);
    } else {
      return node;
    }
    // 平衡因子
    const balanceState = this.getBalanceFactor(node);

    if (balanceState === BalanceFactor.UNBALANCED_LEFT) { // 左侧子节点比右侧子节点高
      // 因为时候左侧子节点比右侧子节点高，并且当前插入的值比节点的值小，说明是LL 否则LR
      if (this.compare.lessThan(value, node.value)) {
        node = this.rotationLL(node);
      } else {
        return this.rotationLR(node);
      }
    }
    if (balanceState === BalanceFactor.UNBALANCED_RIGHT) {
      if (this.compare.greaterThan(value, node.value)) {
        node = this.rotationRR(node);
      } else {
        return this.rotationRL(node);
      }
    }
    return node;
  }

  protected removeNode(node: BinarySearchTreeNode<T> | null, value: T): BinarySearchTreeNode<T> | null {
    if (node === null) {
      return null;
    }

    if (this.compare.lessThan(value, node.value)) {
      node.left = this.removeNode(node.left, value);
    } else if (this.compare.greaterThan(value, node.value)) {
      node.right = this.removeNode(node.right, value);
    } else {
      if (node.left === null && node.right === null) {
        node = null;
      } else if (node.left == null && node.right != null) {
        node = node.right;
      } else if (node.left != null && node.right == null) {
        node = node.left;
      } else {
        // node has 2 children, get the in-order successor
        const inOrderSuccessor = this.minNode(node.right) as BinarySearchTreeNode<T>;
        node.value = inOrderSuccessor.value;
        node.right = this.removeNode(node.right, inOrderSuccessor.value);
      }
    }

    if (node === null) {
      return node;
    }
    const balanceState = this.getBalanceFactor(node);
    // 左侧子节点比右侧子节点高
    if (balanceState === BalanceFactor.UNBALANCED_LEFT) {
      if (node.left) {
        // Left left case
        if (
          this.getBalanceFactor(node.left) === BalanceFactor.BALANCED ||
          this.getBalanceFactor(node.left) === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
        ) {
          return this.rotationLL(node);
        }
        // Left right case
        if (this.getBalanceFactor(node.left) === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
          return this.rotationLR(node.left);
        }
      }
    }

    if (balanceState === BalanceFactor.UNBALANCED_RIGHT) {
      if (node.right) {
        // Right right case
        if (
          this.getBalanceFactor(node.right) === BalanceFactor.BALANCED ||
          this.getBalanceFactor(node.right) === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
        ) {
          return this.rotationRR(node);
        }
        // Right left case
        if (this.getBalanceFactor(node.right) === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
          return this.rotationRL(node.right);
        }
      }
    }

    return node;
  }
}
