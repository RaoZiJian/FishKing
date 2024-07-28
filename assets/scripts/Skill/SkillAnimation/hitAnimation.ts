import { _decorator, Component, Label, Node, tween, UIOpacity, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('hitAnimation')
export class hitAnimation extends Component {

    @property(UIOpacity)
    uiopcatiy: UIOpacity;

    @property(Label)
    label: Label;

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
        tween(this.node)
        .by(0.3, { position: new Vec3(0, 10, 0) }, {easing: "cubicOut"})
        .delay(0.5)
        .call(()=>{
            let t1 = tween(this.node)
            .by(0.3, {position: new Vec3(0,5,0)}, {easing:"quadIn"});

            let t2 = tween(this.node)
            .call(()=>{
                tween(this.uiopcatiy)
                    .to(0.3, { opacity: 0 })
                    .call(() => {
                        this.node.removeFromParent()
                    })
                    .start();
            });

            let t3 = tween(this.node)
            .to(0.3, {scale: new Vec3(0,0,0)});

            tween(this.node).parallel(t1,t2,t3).start();
        })
        .start();
    }

    update(deltaTime: number) {

    }
}


