import BinarySearchTree from "../BinarySearchTree"
describe("test BinarySearchTree", () => {
  it('test BinarySearchTree insert methods', () => {
    const bst = new BinarySearchTree<number>();
    bst.insert(10);
    bst.insert(8);
    bst.insert(20);
    bst.insert(7);
    bst.insert(21);
  });
})