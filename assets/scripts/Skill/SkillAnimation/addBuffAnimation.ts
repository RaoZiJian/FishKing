import { _decorator, Component, Label, Node, Animation, Vec3, UIOpacity, tween, AnimationComponent, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('addBuffAnimation')
export class addBuffAnimation extends Component {

    @property(Animation)
    leftArrow: Animation;

    @property(Animation)
    rightArrow: Animation;

    @property(Label)
    label: Label;

    @property(UIOpacity)
    uiopacity: UIOpacity;

    private _text: string;
    public get text(): string {
        return this._text;
    }
    public set text(value: string) {
        this._text = value;
        this.label.string = value;
    }

    private _reverse: boolean;
    public get reverse(): boolean {
        return this._reverse;
    }
    public set reverse(value: boolean) {
        this._reverse = value;
        this.node.scale = new Vec3(value ? -1 : 1, 1, 1);
        this.node.position = new Vec3(value ? -60 : 60, 80, 0);
    }

    private _duration: number;
    public get duration(): number {
        return this._duration;
    }
    public set duration(value: number) {
        this._duration = value;
    }

    start() {
        this.uiopacity.opacity = 0;
    }

    playBuffAnimation() {
        this.uiopacity.opacity = 255;
        this.leftArrow.play();
        this.rightArrow.play();

        this.scheduleOnce(() => {
            if (this.uiopacity) {
                tween(this.uiopacity)
                    .to(0.3, { opacity: 0 })
                    .call(() => {
                        this.uiopacity.opacity = 0;
                    })
                    .start();
            }
        }, this.duration)
    }

    update(deltaTime: number) {

    }
}


