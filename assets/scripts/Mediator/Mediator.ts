import { _decorator, Component, Node, ProgressBar, Vec3 } from 'cc';
import { Actor } from '../Actors/Actor';
import { ActorStateMichine, CharacterState } from '../StateMachine/ActorStateMachine';
import { EffectTarget } from '../Skill/EffectTarget';
import { addBuffAnimation } from '../Skill/SkillAnimation/addBuffAnimation';
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

    private _effectTarget: EffectTarget;
    public get effectTarget(): EffectTarget {
        return this._effectTarget;
    }
    public set effectTarget(value: EffectTarget) {
        this._effectTarget = value;
    }

    private _isAlive: boolean = true;
    public get isAlive(): boolean {
        return this._isAlive;
    }
    public set isAlive(value: boolean) {
        this._isAlive = value;
    }

    private _isDirecationReverse: boolean = false;
    public get isDirecationReverse(): boolean {
        return this._isDirecationReverse;
    }
    public set isDirecationReverse(value: boolean) {
        this._isDirecationReverse = value;
    }

    @property(ProgressBar)
    hpBar: ProgressBar;

    @property(ProgressBar)
    rageBar: ProgressBar;

    @property(addBuffAnimation)
    addBuffAni: addBuffAnimation;

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
    setDireactionReverse() {
        this.node.scale = new Vec3(this.node.scale.x * -1, this.node.scale.y, this.node.scale.z);
        this.hpBar.reverse = true;
        this.rageBar.reverse = true;
        this.isDirecationReverse = true;
    }

    protected updateHpBar(): void {
        if (this.actor && this.actor.cfg) {
            const percent = this.actor.hp / this.actor.cfg.hp;
            this.hpBar.progress = percent;
        }
    }

    protected updateRageBar(): void {
        if (this.actor && this.actor.cfg) {
            const percent = this.actor.rage / this.actor.cfg.rage;
            this.rageBar.progress = percent;
        }
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
        const duration = this.getAnimationDuration(CharacterState.HURT);
        this.scheduleOnce(() => {
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


