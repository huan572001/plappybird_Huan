import {
  _decorator,
  Animation,
  Component,
  EventMouse,
  Input,
  input,
  RigidBody2D,
  Collider2D,
  Contact2DType,
  IPhysics2DContact,
  Vec2,
  director,
  find,
} from 'cc';
import { Store } from './Store';
import { MenuManager } from '../menu/MenuManager';
import { GameManager } from './GameManagerController';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
  start() {
    input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
    this.checkCrash();
  }

  update(deltaTime: number) {
    if (this.node.position.y < 50) {
      this.gameOver();
    }
    if (this.node.getComponent(RigidBody2D).linearVelocity.y < 0) {
      if (this.node.angle > -50) {
        this.node.angle =
          this.node.angle +
          this.node.getComponent(RigidBody2D).linearVelocity.y;
      }
    } else {
      if (this.node.angle < 50) {
        this.node.angle =
          this.node.angle +
          this.node.getComponent(RigidBody2D).linearVelocity.y;
      }
    }
  }
  private checkCrash() {
    let colleder = this.node.getComponent(Collider2D);
    if (colleder) {
      colleder.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
  }

  private gameOver(): void {
    const point = GameManager.point;
    if (localStorage.getItem('pointBest')) {
      if (point > parseInt(localStorage.getItem('pointBest'))) {
        localStorage.setItem('pointBest', point.toString());
      }
      localStorage.setItem('point', point.toString());
    } else {
      localStorage.setItem('point', point.toString());
      localStorage.setItem('pointBest', point.toString());
    }
    MenuManager.statusGame = false;
    director.loadScene('menu');
  }
  private onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact
  ): void {
    this.gameOver();
  }
  private onMouseDown(event: EventMouse): void {
    if (event.getButton() === 0) {
      this.node.getComponent(RigidBody2D).linearVelocity = new Vec2(0, 7);
    } else if (event.getButton() === 2) {
    }
  }
}
