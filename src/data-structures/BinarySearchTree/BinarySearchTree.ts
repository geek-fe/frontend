import { IBinarySearchTree } from "./interface";
import BinarySearchTreeNode from "./BinarySearchTreeNode";
import Comparator, { ComparatorFunction } from "../../utils/comparator";

export default class BinarySearchTree<T> implements IBinarySearchTree<T> {
  protected root: BinarySearchTreeNode<T> | null;
  /**
 * @description 比较树的方法
 * @protected
 * @type {ComparatorFunction<T>}
 * @memberof LinkedList
 */
  protected compare: Comparator<T>;
  constructor(compareFunction?: ComparatorFunction<T>) {
    this.root = null;
    this.compare = new Comparator<T>(compareFunction);
  }

  /**
   * @description 向BST插入一个节点
   * @author fengshaojian
   * @param {T} value
   * @memberof BinarySearchTree
   */
  insert(value: T): void {
    if (!this.root) {
      this.root = new BinarySearchTreeNode<T>(value);
    } else {
      this.insertNode(this.root, value);
    }
  }

  /**
   * @description 在BST里搜索一个节点
   * @author fengshaojian
   * @param {T} value
   * @returns {boolean}
   * @memberof BinarySearchTree
   */
  search(value: T): boolean {
    return this.searchNode(this.root, value);
  }

  /**
   * @description 中序遍历
   * @author fengshaojian
   * @param {(...args: any[]) => void} callback
   * @memberof BinarySearchTree
   */
  inOrderTraverse(callback: (...args: any[]) => void): void {
    this.inOrderTraverseNode(this.root, callback);
  }

  /**
   * @description 前序遍历
   * @author fengshaojian
   * @param {(...args: any[]) => void} callback
   * @memberof BinarySearchTree
   */
  preOrderTraverse(callback: (...args: any[]) => void): void {
    this.preOrderTraverseNode(this.root, callback);
  }

  /**
   * @description 后序遍历
   * @author fengshaojian
   * @param {(...args: any[]) => void} callback
   * @memberof BinarySearchTree
   */
  postOrderTraverse(callback: (...args: any[]) => void): void {
    this.postOrderTraverseNode(this.root, callback);
  }

  /**
   * @description 查找最小值
   * @author fengshaojian
   * @returns {(BinarySearchTreeNode<T> | null)}
   * @memberof BinarySearchTree
   */
  min(): BinarySearchTreeNode<T> | null{
    return this.minNode(this.root);
  }

  /**
   * @description 查找最大值
   * @author fengshaojian
   * @returns {(BinarySearchTreeNode<T> | null)}
   * @memberof BinarySearchTree
   */
  max(): BinarySearchTreeNode<T> | null {
    return this.maxNode(this.root);
  }

  /**
   * @description 移除节点
   * @author fengshaojian
   * @param {T} value
   * @memberof BinarySearchTree
   */
  remove(value: T): void {
    this.root = this.removeNode(this.root, value);
  }

  protected insertNode(node: BinarySearchTreeNode<T>, value: T) {
    if (this.compare.lessThan(value, node.value)) { // 插入的值如果比当前节点的值小，就往当前节点的左子树里面比较插入
      if (node.left === null) {
        node.left = new BinarySearchTreeNode(value);
      } else {
        this.insertNode(node.left, value);
      }
    } else if (this.compare.greaterThan(value, node.value)) { // 插入的值如果比当前节点的值大，就往当前节点的右子树里面比较插入
      if (node.right === null) {
        node.right = new BinarySearchTreeNode(value);
      } else {
        this.insertNode(node.right, value);
      }
    } else {
      throw new Error("树中已经有相同的值");
    }
  }

  /**
   * @description 先中后序遍历值的是当前节点的位置，先序 => 当前节点 、左、右
   * 中序 => 左、当前节点 、右      后序  => 左 、右、当前
   * @author fengshaojian
   * @private
   * @param {(BinarySearchTreeNode<T> | null)} node
   * @param {(...args: any[]) => void} callback
   * @memberof BinarySearchTree
   */
  private inOrderTraverseNode(node: BinarySearchTreeNode<T> | null, callback: (...args: any[]) => void) {
    if (node !== null) {
      // 中序遍历就是升序遍历，值从小到大遍历
      this.inOrderTraverseNode(node.left, callback);
      callback(node.value);
      this.inOrderTraverseNode(node.right, callback);
    }
  }

  private preOrderTraverseNode(node: BinarySearchTreeNode<T> | null, callback: (...args: any[]) => void) {
    if (node !== null) {
      // 先序遍历就是先父后子，子又是先小后大
      callback(node.value);
      this.preOrderTraverseNode(node.left, callback);
      this.preOrderTraverseNode(node.right, callback);
    }
  }

  private postOrderTraverseNode(node: BinarySearchTreeNode<T> | null, callback: (...args: any[]) => void) {
    if (node !== null) {
      // 后序遍历就是先子后父，子又是先小后大
      this.postOrderTraverseNode(node.left, callback);
      this.postOrderTraverseNode(node.right, callback);
      callback(node.value);
    }
  }

  /**
   * @description 寻找最小值，只需要在左子树上找
   * @author fengshaojian
   * @private
   * @param {(BinarySearchTreeNode<T> | null)} node
   * @returns
   * @memberof BinarySearchTree
   */
  protected minNode(node: BinarySearchTreeNode<T> | null) {
    let current = node;
    while (current !== null && current.left !== null) {
      current = current.left;
    }
    return current;
  }

  /**
   * @description 寻找最大值只需在右子树上找
   * @author fengshaojian
   * @private
   * @param {(BinarySearchTreeNode<T> | null)} node
   * @returns
   * @memberof BinarySearchTree
   */
  protected maxNode(node: BinarySearchTreeNode<T> | null) {
    let current = node;
    while (current !== null && current.right !== null) {
      current = current.right;
    }
    return current;
  }

  /**
   * @description 寻找任意一个值就得比较他与当前节点的值的大小，大往右子树里面找，小往左子树里面找
   * @author fengshaojian
   * @private
   * @param {(BinarySearchTreeNode<T> | null)} node
   * @param {T} value
   * @returns {boolean}
   * @memberof BinarySearchTree
   */
  protected searchNode(node: BinarySearchTreeNode<T> | null, value: T): boolean {
    if (node === null) {
      return false;
    }
    if (this.compare.lessThan(value, node.value)) {
      return this.searchNode(node.left, value);
    } else if (this.compare.greaterThan(value, node.value)) {
      return this.searchNode(node.right, value);
    } else {
      return true;
    }
  }

  /**
   * @description 移除节点 注意一个点就是保持引用
   * @author fengshaojian
   * @private
   * @param {(BinarySearchTreeNode<T> | null)} node
   * @param {T} value
   * @returns
   * @memberof BinarySearchTree
   */
  protected removeNode(node: BinarySearchTreeNode<T> | null, value: T) {
    if (node === null) {
      return null;
    }
    if (this.compare.lessThan(value, node.value)) {
      node.left = this.removeNode(node.left, value);
      return node;
    } else if (this.compare.greaterThan(value, node.value)) {
      node.right = this.removeNode(node.right, value);
      return node;
    } else {
      // 键等于node.value
      // 第一种情况 移除的是叶子节点
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }
      // 第二种情况 移除的节点只有一个左子节点或者又子节点
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }
      // 第三种情况 移除的的节点是有左右子节点的，需要找到右子节点的最小值，并替换当前移除的节点，然后删除最小子节点
      const aux = this.minNode(node.right) as BinarySearchTreeNode<T>;
      node.value = aux.value;
      node.right = this.removeNode(node.right, aux.value);
      return node;
    }
  }
}
