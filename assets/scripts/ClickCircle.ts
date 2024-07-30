import { _decorator, AnimationClip, Component, instantiate, Node, Prefab, resources, Animation, UITransform, Vec3, Sprite, UIOpacity, AnimationState } from 'cc';
import { RES_URL } from './ResourceUrl';
const { ccclass, property } = _decorator;

@ccclass('ClickCircle')
export class ClickCircle extends Component {
    private _clickNode: Node;

    private _uiOpacity: UIOpacity;

    private _clickAnimation: Animation;

    protected onLoad(): void {

    }

    start() {

    }

    openFire(){
        this.node.on(Node.EventType.MOUSE_DOWN, (event) => {
            let location = event.getUILocation();
            this._clickNode.setWorldPosition(new Vec3(location.x, location.y, 0));
            this._clickAnimation.play();
        }, this);
    }

    closeFire(){
        this.node.off(Node.EventType.MOUSE_DOWN);
    }

    update(deltaTime: number) {

    }
}


