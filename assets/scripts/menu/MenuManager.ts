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
  view,
  Prefab,
  instantiate,
} from 'cc';
import { GameManager } from '../gameStart/GameManagerController';
import { COLOR, POINT, POINTBEST } from '../constant/constant';
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
  private audioSource: AudioSource = null;
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
  private boxColor: Node = null;
  @property(Prefab)
  private prefabBoxColer: Prefab = null;
  @property(Sprite)
  private bird: Sprite = null;
  @property(Label)
  private pointBestLabel: Label = null;
  @property(Label)
  private pointLabel: Label = null;
  static statusGame: boolean = true;
  private sizeBoxColer = 7;
  private arrBoxColer: Node[] = [];
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
  protected start(): void {
    if (!MenuManager.statusGame) {
      this.pointBestLabel.string = localStorage.getItem(POINTBEST);
      this.pointLabel.string = localStorage.getItem(POINT);
      this.btnStart.active = false;
      this.score.active = true;
    } else {
      this.btnStart.active = true;
      this.score.active = false;
    }
  }

  protected onLoad(): void {
    this.initColor();
    this.eventColer();
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
    this.audio.on(Node.EventType.TOUCH_START, this.playAudio, this);
  }

  private initColor(): void {
    for (let i = 0; i < this.sizeBoxColer; i++) {
      this.arrBoxColer.push(instantiate(this.prefabBoxColer));
      this.boxColor.addChild(this.arrBoxColer[i]);
      this.arrBoxColer[i].setPosition(
        -(this.sizeBoxColer * 50) / 2 + i * 50,
        100
      );
      this.arrBoxColer[i].getComponent(Sprite).color = new Color(
        this.arrColer[i]
      );
    }
  }

  private eventColer(): void {
    for (let i = 0; i < this.arrBoxColer.length; i++) {
      this.arrBoxColer[i].on(
        Node.EventType.MOUSE_DOWN,
        () => {
          this.bird.color = new Color(this.arrColer[i]);
          localStorage.setItem(COLOR, this.arrColer[i]);
        },
        this
      );
    }
  }

  private onSettingColer(status: boolean): void {
    this.mapGame.active = status;
    this.colerBird.active = !status;
  }

  private playAudio(): void {
    if (this.statusAudio) {
      this.audioSource.play();
      this.statusAudio = false;
      this.closeAudio.active = false;
      this.openAudio.active = true;
    } else {
      this.audioSource.pause();
      this.statusAudio = true;
      this.openAudio.active = false;
      this.closeAudio.active = true;
    }
  }
  private onStartGame(): void {
    GameManager.point = 0;
    director.loadScene('game');
  }
  protected update(deltaTime: number): void {}
}
