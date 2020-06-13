import BinarySearchTreeNode from "./BinarySearchTreeNode";

export interface IBinarySearchTree<T> {
  /**
   * @description 向树中插入一个新的键。
   * @author fengshaojian
   * @param {T} value
   * @memberof IBinarySearchTree
   */
  insert(value: T): void;
  /**
   * @description 在树中查找一个键。如果节点存在，则返回 true; 如果不存在，则返回false
   * @author fengshaojian
   * @param {T} value
   * @memberof IBinarySearchTree
   */
  search(value: T): boolean;
  /**
   * @description 通过中序遍历方式遍历所有节点
   * @author fengshaojian
   * @returns {通过中序遍历方式遍历所有节点}
   * @memberof IBinarySearchTree
   */
  inOrderTraverse(callback: (...args: any[]) => void): void;
  /**
   * @description 通过先序遍历方式遍历所有节点
   * @author fengshaojian
   * @memberof IBinarySearchTree
   */
  preOrderTraverse(callback: (...args: any[]) => void): void;
  /**
   * @description 通过后序遍历方式遍历所有节点
   * @author fengshaojian
   * @memberof IBinarySearchTree
   */
  postOrderTraverse(callback: (...args: any[]) => void): void;
  /**
   * @description 返回树中最小的值
   * @author fengshaojian
   * @memberof IBinarySearchTree
   */
  min(): BinarySearchTreeNode<T> | null;

  /**
   * @description  返回树中最大的值
   * @author fengshaojian
   * @memberof IBinarySearchTree
   */
  max(): BinarySearchTreeNode<T> | null;
  /**
   * @description 从树中移除某个值。
   * @author fengshaojian
   * @param {*} value
   * @memberof IBinarySearchTree
   */
  remove(value: T): void;
}
