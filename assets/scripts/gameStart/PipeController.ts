import { _decorator, Collider2D, Component, Node, Vec3 } from 'cc';
import { STEP } from '../constant/constant';
const { ccclass, property } = _decorator;

@ccclass('PipeController')
export class PipeController extends Component {
  @property({ type: Collider2D })
  private top: Collider2D = null;
  @property({ type: Collider2D })
  private bottom: Collider2D = null;
  start() {}

  update(deltaTime: number) {
    this.node.position = new Vec3(
      this.node.position.x - STEP * deltaTime,
      this.node.position.y,
      0
    );
    this.top.apply();
    this.bottom.apply();
  }
}
