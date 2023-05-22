import {
  _decorator,
  BoxCollider2D,
  Collider2D,
  Component,
  RigidBody2D,
  Vec3,
} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PipeController')
export class PipeController extends Component {
  start() {}
  private step: number = 2;

  update(deltaTime: number) {
    this.node.position = new Vec3(
      this.node.position.x - this.step,
      this.node.position.y,
      0
    );
    this.node
      .getChildByName('pipeBottom')
      .getChildByName('body')
      .getComponent(Collider2D)
      .apply();

    this.node
      .getChildByName('pipeTop')
      .getChildByName('body')
      .getComponent(Collider2D)
      .apply();
  }
}
