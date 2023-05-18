import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Store')
export class Store extends Component {
  public point: number = 0;
  start() {}

  update(deltaTime: number) {}
}
