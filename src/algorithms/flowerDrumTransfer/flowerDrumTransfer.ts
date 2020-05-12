import Queue from "../../data-structures/Queue/Queue";

/**
 * @description 击鼓传花游戏
 * 在这个游戏中，孩子们围成一个圆圈，把花尽快地传递给旁边的人。
 * 某一时刻传花停止， 这个时候花在谁手里，谁就退出圆圈、结束游戏。
 * 重复这个过程，直到只剩一个孩子(胜者)。
 * @author fengshaojian
 * @param {string[]} children 玩家
 * @param {number} num 花一次传递人数
 * @export
 */
export function flowerDrumTransfer(children: string[], num: number) {
  const queue = new Queue<string>();
  const elimitatedList: string[] = [];
  for (let i = 0; i < children.length; i++) {
    queue.enqueue(children[i]); // 玩家入队
  }

  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) { // 没在到达指定次数的时候，将出队的重新加入队尾, 实现循环
      queue.enqueue(queue.dequeue() as string);
    }
    // 经过上面的循环后，此时花已经到了指定的人手上了，他会退出圆圈
    elimitatedList.push(queue.dequeue() as string);
  }
  return {
    eliminated: elimitatedList,
    winner: queue.dequeue()
  };
}
