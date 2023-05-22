import {
  _decorator,
  Component,
  instantiate,
  Node,
  Prefab,
  view,
  Label,
  Vec3,
  Sprite,
  Color,
} from 'cc';
import { STEP } from '../constant/constant';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
  @property({ type: Node })
  private PipeNode: Node = null;
  @property({ type: Node })
  private Bg: Node = null;
  @property({ type: Sprite })
  private bird: Sprite = null;
  @property({ type: Label })
  private pointLabel: Label = null;
  @property({ type: Prefab })
  private pipePrefab: Prefab | null = null;
  private arrPipe: Node[] = [null, null, null, null];
  static point: number = 0;
  private statustPipe: Boolean = true;
  private withScreen: number = view.getVisibleSize().width;
  protected start() {
    localStorage.getItem('color')
      ? (this.bird.color = new Color(localStorage.getItem('color')))
      : null;
    this.pointLabel.string = `${GameManager.point}`;
    this.initPipe();
  }
  private initPipe(): void {
    for (let i = 0; i < this.arrPipe.length; i++) {
      this.arrPipe[i] = instantiate(this.pipePrefab);
      this.arrPipe[i].setPosition(this.withScreen + i * 300, this.random());
      this.PipeNode.addChild(this.arrPipe[i]);
    }
  }
  private random(): number {
    return Math.floor(Math.random() * 200);
  }
  protected update(deltaTime: number) {
    if (this.Bg.position.x < -this.withScreen / 2) {
      this.Bg.position = new Vec3(this.withScreen / 2, this.Bg.position.y, 0);
    } else {
      this.Bg.position = new Vec3(
        this.Bg.position.x - STEP * deltaTime,
        this.Bg.position.y,
        0
      );
    }
    for (let i = 0; i < this.arrPipe.length; i++) {
      if (this.arrPipe[i]?.position.x < 0 && this.statustPipe) {
        this.statustPipe = false;
        GameManager.point += 1;
        this.pointLabel.string = GameManager.point.toString();
      }
      if (this.arrPipe[i].position.x < this.withScreen - 300 * 4) {
        this.statustPipe = true;
        this.arrPipe[i].setPosition(this.withScreen, this.random());
      }
    }
  }
}
