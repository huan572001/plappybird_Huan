import {
  _decorator,
  Component,
  instantiate,
  Node,
  Prefab,
  view,
  Label,
  director,
} from 'cc';
import { PlayerController } from './PlayerController';
import { Store } from './Store';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
  @property({ type: Node })
  public PipeNode: Node = null;
  @property({ type: Node })
  public GameOver: Node = null;
  @property({ type: Node })
  private stote: Node = null;
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

  random() {
    const heightPine = Math.floor(Math.random() * 200);
    return heightPine;
  }

  update(deltaTime: number) {
    for (let i = 0; i < this.arrPipe.length; i++) {
      if (this.arrPipe[i].position.x < 0) {
        this.point += 1;
        this.stote.getComponent(Store).point = this.point;
        this.pointLabel.string = this.point.toString();
        this.arrPipe[i].setPosition(view.getVisibleSize().width, this.random());
      }
    }
  }
}
