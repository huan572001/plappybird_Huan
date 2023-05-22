import { _decorator, Collider2D, Component, Vec3 } from 'cc';
import { STEP } from '../constant/constant';
const { ccclass, property } = _decorator;

@ccclass('PipeController')
export class PipeController extends Component {
  start() {}

  update(deltaTime: number) {
    this.node.position = new Vec3(
      this.node.position.x - STEP * deltaTime,
      this.node.position.y,
      0
    );
    this.node.getChildByName('pipeBottom').getComponent(Collider2D).apply();
    this.node.getChildByName('pipeTop').getComponent(Collider2D).apply();
  }
}
