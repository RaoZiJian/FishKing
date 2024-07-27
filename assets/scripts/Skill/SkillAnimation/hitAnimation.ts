import { _decorator, Component, Label, Node, tween, UIOpacity, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('hitAnimation')
export class hitAnimation extends Component {

    @property(UIOpacity)
    uiopcatiy: UIOpacity;

    @property(Label)
    label: Label;

    private _reverse: boolean;
    public get reverse(): boolean {
        return this._reverse;
    }
    public set reverse(value: boolean) {
        this._reverse = value;
        this.node.scale = new Vec3(value ? -1 : 1, 1, 1);
    }

    private _damage: number;
    public get damage(): number {
        return this._damage;
    }
    public set damage(value: number) {
        this._damage = value;
        this.label.string = this.damage.toString();
    }

    start() {


    }

    showDamage(damage: number) {
        this.damage = damage;
        let t1 = tween(this.node)
            .by(0.2, { position: new Vec3(0, 20, 0) })
            .call(() => {
                tween(this.uiopcatiy)
                    .to(0.2, { opacity: 0 })
                    .call(() => {
                        this.node.removeFromParent()
                    })
                    .start();
            })
            .start();
    }

    update(deltaTime: number) {

    }
}


