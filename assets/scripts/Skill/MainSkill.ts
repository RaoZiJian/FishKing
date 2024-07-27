import { AnimationComponent, log, tween, Vec3 } from "cc";
import { SkillData } from "../Data/SkillData";
import { Mediator } from "../Mediator/Mediator";
import { HurtCommand } from "../Commands/ActorCommands";
import { SingleTauntBuff } from "./Buff";

export abstract class MainSkill {

    private _attacker: Mediator;
    public get attacker(): Mediator {
        return this._attacker;
    }
    public set attacker(value: Mediator) {
        this._attacker = value;
    }

    private _defender: Mediator[];
    public get defender(): Mediator[] {
        return this._defender;
    }
    public set defender(value: Mediator[]) {
        this._defender = value;
    }

    private _skillData: SkillData;
    public get skillData(): SkillData {
        return this._skillData;
    }
    public set skillData(value: SkillData) {
        this._skillData = value;
    }

    private _moveToTarget: boolean = false;
    public get moveToTarget(): boolean {
        return this._moveToTarget;
    }
    public set moveToTarget(value: boolean) {
        this._moveToTarget = value;
    }

    /**
     * 技能动画时间
     */
    private _duration: number = 0;
    public get duration(): number {
        return this._duration;
    }
    public set duration(value: number) {
        this._duration = value;
    }

    getSkillDamage(): number {
        return 0;
    }

    constructor(skillData: SkillData, attacker: Mediator, defender: Mediator[]) {
        this._skillData = skillData;
        this.attacker = attacker;
        this.defender = defender;
        this.moveToTarget = skillData.NeedMove;
    }

    abstract useSkill(): void;
}

/**
 * 跳劈主技能，造成暴击单体伤害
 */
export class JumpHitSkill extends MainSkill {

    private jumpAnimations = {
        jumpStart: 'jumpStart',
        jumpLoop: 'jumpLoop',
        jumpAttack: 'jumpAttack'
    }

    constructor(skillData: SkillData, attacker: Mediator, defender: Mediator[]) {
        let sortedDefenders = defender.sort((a, b) => { return b.actor.taunt - a.actor.taunt })
        let target = [sortedDefenders[0]];
        super(skillData, attacker, target);
        if (this.attacker && this.attacker.stateMachine && this.attacker.stateMachine.animationComponent) {
            let attackerAnimation = this.attacker.stateMachine.animationComponent;
            let clips = attackerAnimation.clips;
            if (clips.filter(clip => clip.name == this.jumpAnimations.jumpStart).length > 0 &&
                clips.filter(clip => clip.name == this.jumpAnimations.jumpLoop).length > 0 &&
                clips.filter(clip => clip.name == this.jumpAnimations.jumpAttack).length > 0) {

                const jumpStartAnimationDuration = attackerAnimation.clips.find(ani => ani.name == this.jumpAnimations.jumpStart).duration;
                const jumpAttacktAnimationDuration = attackerAnimation.clips.find(ani => ani.name == this.jumpAnimations.jumpAttack).duration;
                const jumpLoopAnimationDuration = attackerAnimation.clips.find(ani => ani.name == this.jumpAnimations.jumpLoop).duration;
                this.duration = jumpAttacktAnimationDuration + jumpLoopAnimationDuration * 2 + jumpStartAnimationDuration;
            } else {
                log("Cannot find JumpHit animation");
            }
        }
    }

    getSkillDamage(): number {
        return this.attacker.actor.attack * 2;
    }

    useSkill(): void {
        if (this.attacker && this.attacker.stateMachine && this.attacker.stateMachine.animationComponent) {
            let attackerAnimation = this.attacker.stateMachine.animationComponent;
            let clips = attackerAnimation.clips;
            if (clips.filter(clip => clip.name == this.jumpAnimations.jumpStart).length > 0 &&
                clips.filter(clip => clip.name == this.jumpAnimations.jumpLoop).length > 0 &&
                clips.filter(clip => clip.name == this.jumpAnimations.jumpAttack).length > 0) {

                const jumpStartAnimationDuration = attackerAnimation.clips.find(ani => ani.name == this.jumpAnimations.jumpStart).duration;
                const jumpLoopAnimationDuration = attackerAnimation.clips.find(ani => ani.name == this.jumpAnimations.jumpLoop).duration;
                const jumpAttacktAnimationDuration = attackerAnimation.clips.find(ani => ani.name == this.jumpAnimations.jumpAttack).duration;
                attackerAnimation.play(this.jumpAnimations.jumpStart);
                const isDirecationReverse = this.attacker.isDirecationReverse;
                const jumpOffsetX = isDirecationReverse ? -20 : 20;
                const jumpOffsetY = 50;

                this.attacker.scheduleOnce(() => {
                    tween(this.attacker.node)
                        .by(jumpLoopAnimationDuration, { position: new Vec3(jumpOffsetX, jumpOffsetY, 0) }, { easing: "elasticIn" })
                        .by(jumpAttacktAnimationDuration, { position: new Vec3(0, -jumpOffsetY, 0) })
                        .start();

                    this.attacker.scheduleOnce(() => {
                        attackerAnimation.play(this.jumpAnimations.jumpAttack);
                        const damage = this.getSkillDamage();
                        this.defender[0].scheduleOnce(() => {
                            const hurt = new HurtCommand(this.attacker, this.defender[0], damage);
                            hurt.execute();
                        }, this.duration * 0.5)

                    }, jumpLoopAnimationDuration);

                }, jumpStartAnimationDuration);


            } else {
                log("Cannot find JumpHit animation ");
            }
        }
    }
}

/**
 * 嘲讽主技能，对自己施加嘲讽的buff
 */
export class TauntSkill extends MainSkill {

    private tauntAniName: string = "taunt";

    private _tauntBuff: SingleTauntBuff;
    public get tauntBuff(): SingleTauntBuff {
        return this._tauntBuff;
    }
    public set tauntBuff(value: SingleTauntBuff) {
        this._tauntBuff = value;
    }

    private _casterAnimation: AnimationComponent;

    constructor(skillData: SkillData, caster: Mediator) {
        super(skillData, caster, null);
        this.tauntBuff = new SingleTauntBuff(skillData);
        this.tauntBuff.install(caster.effectTarget);
        this._casterAnimation = this.attacker?.stateMachine?.animationComponent;
        if (this._casterAnimation) {
            this.duration = this._casterAnimation.clips.find(ani => ani.name == this.tauntAniName).duration
        }
    }

    getSkillDamage(): number {
        return 0;
    }

    useSkill(): void {
        this.tauntBuff.work(this.attacker.effectTarget);
        if (this._casterAnimation) {
            this._casterAnimation.play(this.tauntAniName);
        }
    }
}