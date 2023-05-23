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
import { MenuManager } from '../menu/MenuManager';
import { GameManager } from './GameManagerController';
import { POINT, POINTBEST } from '../constant/constant';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
  protected start() {
    input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
    this.checkCrash();
  }

  protected update(deltaTime: number) {
    this.animation();
  }

  private animation(): void {
    let velocity_Y: number =
      this.node.getComponent(RigidBody2D).linearVelocity.y;
    if (this.node.position.y < 50) {
      this.gameOver();
    }
    if (velocity_Y < 0) {
      if (this.node.angle > -50) {
        this.node.angle = this.node.angle + velocity_Y;
      }
    } else {
      if (this.node.angle < 50) {
        this.node.angle = this.node.angle + velocity_Y;
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
    if (localStorage.getItem(POINTBEST)) {
      if (point > parseInt(localStorage.getItem(POINTBEST))) {
        localStorage.setItem(POINTBEST, point.toString());
      }
      localStorage.setItem(POINT, point.toString());
    } else {
      localStorage.setItem(POINT, point.toString());
      localStorage.setItem(POINTBEST, point.toString());
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
