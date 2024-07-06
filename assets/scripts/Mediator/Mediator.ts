import { _decorator, Component, Node, ProgressBar, Vec3 } from 'cc';
import { Actor } from '../Actors/Actor';
import { ActorStateMichine, CharacterState } from '../StateMachine/ActorStateMachine';
const { ccclass, property } = _decorator;

@ccclass('Mediator')
export class Mediator extends Component {

    private _actor: Actor;
    public get actor(): Actor {
        return this._actor;
    }
    public set actor(value: Actor) {
        this._actor = value;
    }

    private _stateMachine: ActorStateMichine;
    public get stateMachine(): ActorStateMichine {
        return this._stateMachine;
    }
    public set stateMachine(value: ActorStateMichine) {
        this._stateMachine = value;
    }

    private _isAlive: boolean = true;
    public get isAlive(): boolean {
        return this._isAlive;
    }
    public set isAlive(value: boolean) {
        this._isAlive = value;
    }

    @property(ProgressBar)
    hpBar: ProgressBar;

    @property(ProgressBar)
    rageBar: ProgressBar;

    getHP(): number {
        return this.actor.hp;
    }

    setHP(value: number) {
        if (value != this.actor.hp) {
            this.actor.hp = value;
            this.updateHpBar();
        }
    }

    /**
     * 默认朝向向右，如果需要单位向左，需要调用此方法
     */
    setDireactionReverse(){
        this.node.scale = new Vec3(this.node.scale.x * -1, this.node.scale.y, this.node.scale.z);
        this.hpBar.reverse = true;
        this.rageBar.reverse = true;
    }

    protected updateHpBar(): void {

    }

    protected updateRageBar(): void {

    }

    getAnimationDuration(state) {
        return this.stateMachine.getAnimationDuration(state);
    }

    changeState(newState) {
        switch (newState) {
            case CharacterState.ATTACKING:
                this.attack();
                break;
            case CharacterState.CASTING:
                this.cast();
                break;
            case CharacterState.EMPTY:
                break;
            case CharacterState.HURT:
                this.hurt();
                break;
            case CharacterState.IDLE:
                this.idle();
                break;
            case CharacterState.WALKING:
                this.walk();
                break;
            case CharacterState.DYING:
                this.dying();
                break;
            default:
                break;
        }
    }

    // Example methods to change state
    idle() {
        this.stateMachine.changeState(CharacterState.IDLE);
    }

    walk() {
        this.stateMachine.changeState(CharacterState.WALKING);
    }

    attack() {
        this.stateMachine.changeState(CharacterState.ATTACKING);
    }

    cast() {
        this.stateMachine.changeState(CharacterState.CASTING);
    }

    hurt() {
        this.stateMachine.changeState(CharacterState.HURT);
        const duration = this.getAnimationDuration(CharacterState.HURT) * 1000;
        setTimeout(() => {
            if (this.isAlive) {
                this.changeState(CharacterState.IDLE);
            }
        }, duration)
    }

    dying() {
        this.stateMachine.changeState(CharacterState.DYING);
    }

    start() {
        this.stateMachine = this.getComponent(ActorStateMichine);
    }

    update(deltaTime: number) {

    }
}


