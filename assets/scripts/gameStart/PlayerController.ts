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
} from 'cc';
import { Store } from './Store';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
  start() {
    // this.node.addComponent(RigidBody2D);
    // this.node.addComponent(BoxCollider2D);
    // this.node.getComponent(RigidBody2D).enabledContactListener = true;
    input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);
    this.checkCrash();
  }

  update(deltaTime: number) {}
  checkCrash() {
    let colleder = this.node.getComponent(Collider2D);
    if (colleder) {
      colleder.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
  }

  onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact
  ) {
    // console.log(find('store'));
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
    localStorage.setItem('statusGame', 'gameover');
    director.loadScene('menu');
  }
  onMouseUp(event: EventMouse) {
    if (event.getButton() === 0) {
      this.node.getComponent(RigidBody2D).linearVelocity = new Vec2(0, 5);
      // this.node.rotation.z = 5;
    } else if (event.getButton() === 2) {
    }
  }
}
