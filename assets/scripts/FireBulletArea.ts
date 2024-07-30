import { _decorator, Component, instantiate, Node, NodeEventType, Prefab, resources, UIOpacity, Animation, Vec3, director } from 'cc';
import { RES_URL } from './ResourceUrl';
import { FireBulletCommand } from './Commands/Command';
import { HurtCommand } from './Commands/ActorCommands';
const { ccclass, property } = _decorator;

@ccclass('FireBulletArea')
export class FireBulletArea extends Component {

    @property({ type: Node })
    leftFish: Node;

    @property({ type: Node })
    rightFish: Node;

    private _clickNode: Node;

    private _uiOpacity: UIOpacity;

    private _clickAnimation: Animation;

    start() {
        this._clickNode = new Node();
        const canvas = director.getScene().getChildByName('Canvas');
        canvas.addChild(this._clickNode);
        resources.load(RES_URL.clickEffect, Prefab, (error, prefab) => {
            let clickSprite = instantiate(prefab);
            if (clickSprite) {
                let clickEffect = clickSprite;
                this._clickNode.addChild(clickEffect);
                this._uiOpacity = clickEffect.getComponent(UIOpacity);
                this._uiOpacity.opacity = 0;
                this._clickAnimation = clickEffect.getComponent(Animation);
                this._clickAnimation.on(Animation.EventType.FINISHED, (event) => {
                    this._uiOpacity.opacity = 0;
                }, this);

                this._clickAnimation.on(Animation.EventType.PLAY, (event) => {
                    this._uiOpacity.opacity = 255;
                }, this);

                this._clickAnimation.on(Animation.EventType.STOP, (event) => {
                    this._uiOpacity.opacity = 0;
                }, this);
            }
        })
    }

    openFire() {
        this.node.on(NodeEventType.MOUSE_DOWN, (event) => {
            resources.load(RES_URL.clickBullet, Prefab, (error, prefab) => {
                let bulletNode = instantiate(prefab);
                bulletNode = instantiate(prefab);
                this.node.addChild(bulletNode);

                if (bulletNode) {
                    bulletNode.active = true;
                    const bulletCommand = new FireBulletCommand(event.getUILocation(), this.rightFish, bulletNode, () => {
                    });
                    bulletCommand.execute();
                }
            });

            let location = event.getUILocation();
            this._clickNode.setWorldPosition(new Vec3(location.x, location.y, 0));
            this._clickAnimation.play();
        }, this);
    }

    closeFire() {
        this.node.off(NodeEventType.MOUSE_DOWN);
    }

    update(deltaTime: number) {

    }
}

