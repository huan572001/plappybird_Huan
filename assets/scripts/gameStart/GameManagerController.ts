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
  Collider,
  Collider2D,
} from 'cc';
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

  private arrPipe: Node[] = [null, null, null];
  static point: number = 0;
  start() {
    this.bird.color = new Color(localStorage.getItem('color'));
    this.pointLabel.string = `${GameManager.point}`;
    for (let i = 0; i < this.arrPipe.length; i++) {
      this.arrPipe[i] = instantiate(this.pipePrefab);
      this.arrPipe[i].setPosition(
        view.getVisibleSize().width + i * 300,
        this.random()
      );
      this.PipeNode.addChild(this.arrPipe[i]);
      this.arrPipe[i]
        .getChildByName('pipeBottom')
        .getChildByName('body')
        .getComponent(Collider2D)
        .apply();

      this.arrPipe[i]
        .getChildByName('pipeTop')
        .getChildByName('body')
        .getComponent(Collider2D)
        .apply();
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
        GameManager.point += 1;
        this.pointLabel.string = GameManager.point.toString();
        this.arrPipe[i].setPosition(view.getVisibleSize().width, this.random());
      }
    }
  }
}
