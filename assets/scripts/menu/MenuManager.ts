import { _decorator, Component, Node, director, Label, find } from 'cc';
import { Store } from '../gameStart/Store';
const { ccclass, property } = _decorator;

@ccclass('MenuManager')
export class MenuManager extends Component {
  @property({ type: Node })
  private BtnStart: Node = null;
  @property({ type: Node })
  private BtnRestart: Node = null;
  @property({ type: Node })
  private BtnSetting: Node = null;
  @property({ type: Node })
  private audio: Node = null;
  @property({ type: Node })
  private score: Node = null;
  start() {
    // if (true) {
    if (find('store')) {
      const point = find('store').getComponent(Store).point.toString();
      // this.score.getChildByName('point').getComponent(Label).string = point;
      // if (localStorage.getItem('point')) {
      //   console.log(localStorage.getItem('point'));

      //   if (point > localStorage.getItem('point')) {
      //     localStorage.setItem('point', point);
      //   }
      // } else {
      //   localStorage.setItem('point', point);
      // }
      // this.score.getChildByName('pointBest').getComponent(Label).string =
      //   localStorage.getItem('point').toString();
      this.BtnStart.active = false;
      this.BtnRestart.active = true;
      this.score.active = true;
    } else {
      this.BtnStart.active = true;
      this.BtnRestart.active = false;
      this.score.active = false;
    }
  }
  onLoad() {
    this.BtnStart.on(Node.EventType.TOUCH_START, this.OnStartGame, this);
    this.BtnRestart.on(Node.EventType.TOUCH_START, this.OnStartGame, this);
  }

  protected OnStartGame() {
    director.loadScene('game');
  }
  update(deltaTime: number) {}
}
