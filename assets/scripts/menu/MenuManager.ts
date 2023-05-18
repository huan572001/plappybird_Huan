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
  static statusGame: boolean = true;
  start() {
    if (!MenuManager.statusGame) {
      this.score.getChildByName('pointBest').getComponent(Label).string =
        localStorage.getItem('pointBest').toString();
      this.score.getChildByName('point').getComponent(Label).string =
        localStorage.getItem('point').toString();
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
