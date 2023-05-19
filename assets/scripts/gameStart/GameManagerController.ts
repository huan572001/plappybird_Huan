import {
  _decorator,
  Component,
  instantiate,
  Node,
  Prefab,
  view,
  Label,
  director,
  Vec3,
  Sprite,
  Color,
} from 'cc';
import { PlayerController } from './PlayerController';
import { Store } from './Store';
import { MenuManager } from '../menu/MenuManager';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
  @property({ type: Node })
  public PipeNode: Node = null;
  @property({ type: Node })
  private Bg: Node = null;
  @property({ type: Sprite })
  private bird: Sprite = null;
  @property({ type: Label })
  public pointLabel: Label = null;
  @property({ type: Prefab })
  public pipePrefab: Prefab | null = null;
  @property({ type: Prefab })
  public gameOverPrefab: Prefab | null = null;
  @property({ type: PlayerController })
  public playerCtrl: PlayerController | null = null;

  public arrPipe: Node[] = [null, null, null];
  private point: number = 0;
  //   public NodePipe: Node;
  start() {
    this.bird.color = new Color(localStorage.getItem('color'));
    this.pointLabel.string = `${this.point}`;
    for (let i = 0; i < this.arrPipe.length; i++) {
      this.arrPipe[i] = instantiate(this.pipePrefab);
      this.arrPipe[i].setPosition(
        view.getVisibleSize().width + i * 300,
        this.random()
      );
      this.PipeNode.addChild(this.arrPipe[i]);
    }
  }
  random(): number {
    return Math.floor(Math.random() * 200);
  }
  update(deltaTime: number) {
    if (this.Bg.position.x < -view.getVisibleSize().width) {
      this.Bg.position = new Vec3(
        view.getVisibleSize().width / 2,
        this.Bg.position.y,
        0
      );
    } else {
      this.Bg.position = new Vec3(
        this.Bg.position.x - 2,
        this.Bg.position.y,
        0
      );
    }
    for (let i = 0; i < this.arrPipe.length; i++) {
      if (this.arrPipe[i].position.x < 0) {
        this.point += 1;
        this.pointLabel.string = this.point.toString();
        this.arrPipe[i].setPosition(view.getVisibleSize().width, this.random());
      }
    }
  }
}
