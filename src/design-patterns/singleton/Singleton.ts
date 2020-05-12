export default class Signleton {
  // 保存的唯一实例的变量
  private static instance: Signleton;

  // 构造函数私有化，保证不能被实例化
  private constructor() {} // eslint-disable-line

  // 获取实例的唯一入口
  static getInstance() {
    // 判断是否已经创建过实例
    if (!Signleton.instance) {
      // 如果没有创建，则创建一个实例保存在变量中
      Signleton.instance = new Signleton();
    }
    // 返回实例
    return Signleton.instance;
  }
}
