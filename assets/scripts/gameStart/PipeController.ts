import { _decorator, BoxCollider2D, Component, RigidBody2D, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PipeController')
export class PipeController extends Component {
  private _jumpTime: number = 4;
  start() {
    // this.runPine();
  }
  private step: number = 2;

  update(deltaTime: number) {
    // if(this.node.position.x===0){
    //     this.node.removeChild();
    // }
    this.node.position = new Vec3(
      this.node.position.x - this.step,
      this.node.position.y,
      0
    );
  }
}
