import {
  _decorator,
  Component,
  Node,
  director,
  Label,
  find,
  AudioSource,
  assert,
  Color,
  Sprite,
  EventMouse,
  UITransform,
  view,
} from 'cc';
import { Store } from '../gameStart/Store';
const { ccclass, property } = _decorator;

@ccclass('MenuManager')
export class MenuManager extends Component {
  @property({ type: Node })
  private btnStart: Node = null;
  @property({ type: Node })
  private btnRestart: Node = null;
  @property({ type: Node })
  private btnSetting: Node = null;
  @property({ type: Node })
  private audio: Node = null;
  @property({ type: Node })
  private score: Node = null;
  @property(AudioSource)
  private _audioSource: AudioSource = null;
  @property(Node)
  private openAudio: Node = null;
  @property(Node)
  private closeAudio: Node = null;
  @property(Node)
  private mapGame: Node = null;
  @property(Node)
  private colerBird: Node = null;
  @property(Node)
  private btnBack: Node = null;
  @property(Node)
  private color: Node = null;
  @property(Sprite)
  private bird: Sprite = null;
  static statusGame: boolean = true;
  private widthScane = view.getVisibleSize().width;
  private arrColer: string[] = [
    '#FF0000',
    '#FF9900',
    '#FFFF00',
    '#00FF00',
    '#0099FF',
    '#003399',
    '#FF00CC',
  ];
  private statusAudio: boolean = true;
  start() {
    this.color
      .getComponent(UITransform)
      .setContentSize(this.widthScane / 2, 50);
    if (!MenuManager.statusGame) {
      this.score.getChildByName('pointBest').getComponent(Label).string =
        localStorage.getItem('pointBest').toString();
      this.score.getChildByName('point').getComponent(Label).string =
        localStorage.getItem('point').toString();
      this.btnStart.active = false;
      this.btnRestart.active = true;
      this.score.active = true;
    } else {
      this.btnStart.active = true;
      this.btnRestart.active = false;
      this.score.active = false;
    }
  }
  onLoad() {
    this.btnStart.on(Node.EventType.TOUCH_START, this.onStartGame, this);
    this.btnRestart.on(Node.EventType.TOUCH_START, this.onStartGame, this);
    this.btnSetting.on(
      Node.EventType.TOUCH_START,
      () => this.onSettingColer(false),
      this
    );
    this.btnBack.on(
      Node.EventType.TOUCH_START,
      () => this.onSettingColer(true),
      this
    );

    this.color.on(Node.EventType.MOUSE_DOWN, this.onColer, this);
    const audioSource = this.audio.getComponent(AudioSource)!;
    assert(audioSource);
    this._audioSource = audioSource;
    this.audio.on(Node.EventType.TOUCH_START, this.playAudio, this);
  }
  private onColer(event: EventMouse): void {
    const mousePos = event.getLocation(); // Lấy tọa độ chuột
    const indexColor = Math.floor(
      (mousePos.x / 2 - this.widthScane / 4) / (this.widthScane / 2 / 7)
    );
    console.log(indexColor);

    this.bird.color = new Color(this.arrColer[indexColor]);
    localStorage.setItem('color', this.arrColer[indexColor]);
  }
  public onSettingColer(status: boolean): void {
    this.mapGame.active = status;
    this.colerBird.active = !status;
  }
  public playAudio(): void {
    if (this.statusAudio) {
      this._audioSource.play();
      this.statusAudio = false;
      this.closeAudio.active = false;
      this.openAudio.active = true;
    } else {
      this._audioSource.pause();
      this.statusAudio = true;
      this.openAudio.active = false;
      this.closeAudio.active = true;
    }
  }
  public onStartGame(): void {
    director.loadScene('game');
  }
  update(deltaTime: number) {}
}
