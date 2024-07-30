import { _decorator, Component, Label, Node, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UIAnimation')
export class UIAnimation extends Component {

    @property(Label)
    label: Label;

    start() {

    }

    showAnimation(duration: number, text: string) {
        this.label.string = text;
        this.node.scale = new Vec3(0, 0, 0);
        let t1 = tween(this.node)
            .by(0.5, { scale: new Vec3(1, 1, 1) })
        let t2 = tween(this.node)
            .by(0.5, { position: new Vec3(0, 15, 0) });
        tween(this.node)
            .parallel(t1, t2)
            .delay(duration)
            .call(() => {
                this.node.removeFromParent();
            })
            .start();
    }

    update(deltaTime: number) {

    }
}