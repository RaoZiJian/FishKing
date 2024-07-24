import { _decorator, AnimationClip, Component, instantiate, Node, Prefab, resources, Animation, UITransform, Vec3, Sprite, UIOpacity, AnimationState } from 'cc';
import { RES_URL } from './ResourceUrl';
const { ccclass, property } = _decorator;

@ccclass('ClickCircle')
export class ClickCircle extends Component {
    private _clickNode: Node;

    private _effect: Node;

    private _effectOpacity: UIOpacity;

    private _clickAnimation: Animation;

    protected onLoad(): void {
        this._clickNode = new Node('clickEffect');
        this.node.addChild(this._clickNode);
        resources.load(RES_URL.clickEffect, Prefab, (error, prefab) => {
            let clickSprite = instantiate(prefab);
            if (clickSprite) {
                this._effect = clickSprite;
                this._clickNode.addChild(this._effect);
                this._effectOpacity = this._effect.getComponent(UIOpacity);
                this._effectOpacity.opacity = 0;
                this._clickAnimation = this._effect.getComponent(Animation);
                this._clickAnimation.on(Animation.EventType.FINISHED, (event) => {
                    this._effectOpacity.opacity = 0;
                }, this);

                this._clickAnimation.on(Animation.EventType.PLAY, (event) => {
                    this._effectOpacity.opacity = 255;
                }, this);

                this._clickAnimation.on(Animation.EventType.STOP, (event) => {
                    this._effectOpacity.opacity = 0;
                }, this);
            }
        })
    }

    start() {
        this.node.on(Node.EventType.MOUSE_DOWN, (event) => {
            let location = event.getUILocation();
            this._clickNode.setWorldPosition(new Vec3(location.x, location.y, 0));
            this._clickAnimation.play();
        }, this);
    }

    update(deltaTime: number) {

    }
}


