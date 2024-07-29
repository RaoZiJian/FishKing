import { _decorator, Component, director, instantiate, log, Node, Prefab, resources, tween, UITransform, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

import { FireBulletExplodeCommand } from './Commands/Command';
import { RES_URL } from './ResourceUrl';

@ccclass('ClickBullet')
export class ClickBullet extends Component {

    _isFire: boolean = false;

    private _baseSpeed: number = 10;
    public get baseSpeed(): number {
        return this._baseSpeed;
    }
    public set baseSpeed(value: number) {
        this._baseSpeed = value;
    }

    private _maxSpeed: number = 2500;
    public get maxSpeed(): number {
        return this._maxSpeed;
    }
    public set maxSpeed(value: number) {
        this._maxSpeed = value;
    }

    private _accelerationDistance: number = 1000;
    public get accelerationDistance(): number {
        return this._accelerationDistance;
    }
    public set accelerationDistance(value: number) {
        this._accelerationDistance = value;
    }

    private _startLocation: Vec3;
    public get startLocation(): Vec3 {
        return this._startLocation;
    }
    public set startLocation(value: Vec3) {
        this._startLocation = value;
    }

    private _endNode: Node;
    public get endNode(): Node {
        return this._endNode;
    }
    public set endNode(value: Node) {
        this._endNode = value;
    }

    public onHit?: () => void;

    @property({ type: Node })
    public bullet: Node;

    setReverse() {
        this.bullet.scale = new Vec3(this.bullet.scale.x * -1, this.bullet.scale.y, this.bullet.scale.z);
    }

    start() {
    }

    _lookAt() {
        let direction = this.bullet.worldPosition.subtract(this.endNode.worldPosition);
        let angle = Math.atan2(direction.y, direction.x) * (180 / Math.PI);
        this.bullet.angle = angle;
    }

    _move(dt: number) {

        let direction = new Vec3(this.endNode.worldPosition.x - this.node.worldPosition.x, this.endNode.worldPosition.y - this.node.worldPosition.y, 0);
        let normalize: Vec3 = direction.normalize();

        let x = this.node.worldPosition.x + normalize.x * this.baseSpeed;
        let y = this.node.worldPosition.y + normalize.y * this.baseSpeed;

        this.node.worldPosition = new Vec3(x, y, 0);
    }

    _testHit(): boolean {

        if (this.endNode.getComponent(UITransform).getBoundingBoxToWorld().contains(new Vec2(this.node.getWorldPosition().x, this.node.getWorldPosition().y))) {
            return true;
        }

        return false;
    }

    update(deltaTime: number) {
        if (this._isFire) {
            this._move(deltaTime);
            this._lookAt();
            if (this._testHit()) {
                resources.load(RES_URL.clickBulletExplode, Prefab, (error, prefab) => {
                    let explosion = instantiate(prefab);
                    if (explosion) {
                        let explsionCommand = new FireBulletExplodeCommand(this.endNode.worldPosition, explosion);
                        explsionCommand.execute();
                        this.onHit();
                        this.node.destroy();
                    }
                })
                this.node.active = false;
            }
        }
    }

    fire(start: Vec3, end: Node, onHit: () => void) {
        this.startLocation = start;
        this.endNode = end;
        this.node.worldPosition = new Vec3(this.startLocation.x, this.startLocation.y, 0);
        this._isFire = true;
        this.onHit = onHit
    }
}


