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
  Vec3,
  director,
  find,
  Node,
} from 'cc';
import { Store } from './Store';
import { MenuManager } from '../menu/MenuManager';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
  start() {
    input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
    input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);
    this.checkCrash();
  }

  update(deltaTime: number) {
    if (this.node.position.y < 50) {
      this.gameOver();
    }
  }
  private checkCrash() {
    let colleder = this.node.getComponent(Collider2D);
    if (colleder) {
      colleder.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
  }

  private gameOver(): void {
    const point = find('store').getComponent(Store).point.toString();
    // director.addPersistRootNode(find('store'));
    if (localStorage.getItem('pointBest')) {
      if (point > localStorage.getItem('pointBest')) {
        localStorage.setItem('pointBest', point);
      }
      localStorage.setItem('point', point);
    } else {
      localStorage.setItem('point', point);
      localStorage.setItem('pointBest', point);
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
  private onMouseUp(event: EventMouse): void {
    if (event.getButton() === 0) {
      this.node.angle = -20;
    } else if (event.getButton() === 2) {
    }
  }
  private onMouseDown(event: EventMouse): void {
    if (event.getButton() === 0) {
      this.node.getComponent(RigidBody2D).linearVelocity = new Vec2(0, 5);
      this.node.angle = 50;
    } else if (event.getButton() === 2) {
    }
  }
}
