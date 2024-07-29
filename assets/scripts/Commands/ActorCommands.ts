import { director, instantiate, Prefab, resources, tween, UIOpacity, Vec3 } from 'cc';
import { CharacterState } from '../StateMachine/ActorStateMachine';
import { Command, FireBulletCommand } from './Command';
import { Mediator } from '../Mediator/Mediator';
import { MainSkill } from '../Skill/MainSkill';
import { DamageFactory } from '../Skill/DamageFactory';
import { ClickBullet } from '../ClickBullet';
import { SingleHealingBuff } from '../Skill/Buff';

export class MoveCommand extends Command {

    private _mediator: Mediator;
    public get mediator(): Mediator {
        return this._mediator;
    }
    public set mediator(value: Mediator) {
        this._mediator = value;
    }

    private _time: number = 0;
    public get time(): number {
        return this._time;
    }
    public set time(value: number) {
        this._time = value;
    }

    private _targePos: Vec3;
    public get targePos(): Vec3 {
        return this._targePos;
    }
    public set targePos(value: Vec3) {
        this._targePos = value;
    }

    constructor(mediator: Mediator, targetPos: Vec3, time: number) {
        super();
        this.mediator = mediator;
        this.targePos = targetPos;
        this.time = time;
        this.duration = this.time;
    }

    execute(): void {
        this.mediator.changeState(CharacterState.WALKING);
        tween(this.mediator.node)
            .to(this.time, { position: this.targePos })
            .call(() => {
                this.mediator.changeState(CharacterState.IDLE);
                this.complete();
            })
            .start();
    }
}

export class MeleeAttackCommand extends Command {

    private _attacker: Mediator;
    public get attacker(): Mediator {
        return this._attacker;
    }
    public set attacker(value: Mediator) {
        this._attacker = value;
    }

    private _defender: Mediator;
    public get defender(): Mediator {
        return this._defender;
    }
    public set defender(value: Mediator) {
        this._defender = value;
    }

    constructor(attacker: Mediator, target: Mediator) {
        super();
        this.attacker = attacker
        this.defender = target;
        this.duration = this.attacker.getAnimationDuration(CharacterState.ATTACKING) + this.attacker.actor.attackShake;
    }

    execute(): void {
        this.attacker.changeState(CharacterState.ATTACKING);
        const attackDuration = this.duration;
        const attack = this.attacker.actor.attack;
        const defence = this.defender.actor.defense;
        const damage = (attack - defence) > 0 ? attack - defence : 0;
        const hp = this.defender.actor.hp;
        const currentHp = (hp - damage) > 0 ? hp - damage : 0;
        const isDead = currentHp == 0;

        this.attacker.scheduleOnce(() => {
            const currentRage = this.attacker.getRage() + 50 > 100 ? 100 : this.attacker.getRage() + 50;
            this.attacker.setRage(currentRage);
            this.complete();
        }, attackDuration);


        this.defender.scheduleOnce(() => {
            if (isDead) {
                const deadCommand = new DeadCommand(this.defender);
                deadCommand.execute();
            } else {
                const hurt = new HurtCommand(this.attacker, this.defender, damage);
                hurt.execute();
            }
        }, this.attacker.getAnimationDuration(CharacterState.ATTACKING) * 0.5)
    }
}

export class RangedAttackCommand extends Command {

    private _attacker: Mediator;
    public get attacker(): Mediator {
        return this._attacker;
    }
    public set attacker(value: Mediator) {
        this._attacker = value;
    }

    private _defender: Mediator;
    public get defender(): Mediator {
        return this._defender;
    }
    public set defender(value: Mediator) {
        this._defender = value;
    }

    private _shouldReverse: boolean;
    public get shouldReverse(): boolean {
        return this._shouldReverse;
    }
    public set shouldReverse(value: boolean) {
        this._shouldReverse = value;
    }

    private _arrowRes: string;
    public get arrowRes(): string {
        return this._arrowRes;
    }
    public set arrowRes(value: string) {
        this._arrowRes = value;
    }

    constructor(attacker: Mediator, target: Mediator, arrowRes: string, shouldReverse: boolean) {
        super();
        this.attacker = attacker
        this.defender = target;
        this.shouldReverse = shouldReverse;
        this.arrowRes = arrowRes;
        this.duration = this.attacker.getAnimationDuration(CharacterState.SHOOTING) + this.attacker.actor.attackShake;
    }

    execute(): void {
        this.attacker.changeState(CharacterState.SHOOTING);
        const attack = this.attacker.actor.attack;
        const defence = this.defender.actor.defense;
        const damage = (attack - defence) > 0 ? attack - defence : 0;
        const hp = this.defender.actor.hp;
        const currentHp = (hp - damage) > 0 ? hp - damage : 0;
        const isDead = currentHp == 0;
        const canvas = director.getScene().getChildByName('Canvas');

        resources.load(this.arrowRes, Prefab, (error, prefab) => {
            if (prefab) {
                let arrow = instantiate(prefab);
                let bullet = arrow.getComponent(ClickBullet);
                if (this.shouldReverse) {
                    bullet.setReverse();
                }
                canvas.addChild(arrow);
                let shootingDuration = 0

                const shootingCommand = new FireBulletCommand(this.attacker.node.worldPosition, this.defender.node, arrow, () => {
                    if (isDead) {
                        const deadCommand = new DeadCommand(this.defender);
                        deadCommand.execute();
                        shootingDuration += deadCommand.duration;
                    } else {
                        const hurt = new HurtCommand(this.attacker, this.defender, damage);
                        hurt.execute();
                        shootingDuration += hurt.duration;
                    }

                    this.attacker.scheduleOnce(() => {
                        this.attacker.changeState(CharacterState.IDLE);
                        this.complete();
                    }, shootingDuration);
                });
                shootingDuration += shootingCommand.duration;
                shootingCommand.execute();
            }
        });
    }

}

export class HurtCommand extends Command {

    private _defender: Mediator;
    public get defender(): Mediator {
        return this._defender;
    }
    public set defender(value: Mediator) {
        this._defender = value;
    }

    private _attacker: Mediator;
    public get attacker(): Mediator {
        return this._attacker;
    }
    public set attacker(value: Mediator) {
        this._attacker = value;
    }

    private _damage: number;
    public get damage(): number {
        return this._damage;
    }
    public set damage(value: number) {
        this._damage = value;
    }

    constructor(attack: Mediator, defender: Mediator, damage: number) {
        super();
        this.defender = defender
        this.attacker = attack;
        this.damage = damage;
        this.duration = this.defender.getAnimationDuration(CharacterState.HURT);
    }

    execute(): void {
        const attack = this.attacker.actor.attack;
        const defence = this.defender.actor.defense;
        const hp = this.defender.actor.hp;
        const currentHp = (hp - this.damage) > 0 ? hp - this.damage : 0;
        DamageFactory.showDamage(this.defender, this.damage);
        this.defender.setHP(currentHp);
        this.defender.changeState(CharacterState.HURT);

        this.defender.scheduleOnce(() => {
            if (currentHp > 0) {
                this.defender.changeState(CharacterState.IDLE);
            } else {
                const deadCommand = new DeadCommand(this.defender);
                deadCommand.execute();
            }
            this.complete();
        }, this.duration);
    }
}

export class DeadCommand extends Command {

    private _deadActor: Mediator;
    public get deadActor(): Mediator {
        return this._deadActor;
    }
    public set deadActor(value: Mediator) {
        this._deadActor = value;
    }

    constructor(deadActor: Mediator) {
        super();
        this.deadActor = deadActor;
        this.duration = this.deadActor.getAnimationDuration(CharacterState.DYING);
    }

    execute(): void {
        this.deadActor.changeState(CharacterState.DYING);
        const uiopacity = this.deadActor.getComponent(UIOpacity);
        this.deadActor.isAlive = false;
        if (uiopacity) {
            tween(uiopacity)
                .to(this.duration, { opacity: 0 })
                .call(() => {
                    this.complete();
                })
                .start();
        }
    }
}

export class HealCommand extends Command {

    private _doctor: Mediator;
    public get doctor(): Mediator {
        return this._doctor;
    }
    public set doctor(value: Mediator) {
        this._doctor = value;
    }

    private _target: Mediator;
    public get target(): Mediator {
        return this._target;
    }
    public set target(value: Mediator) {
        this._target = value;
    }

    constructor(doctor: Mediator, target: Mediator) {
        super();
        this.doctor = doctor;
        this.target = target;
        this.duration = this.doctor.getAnimationDuration(CharacterState.HEALING);
    }

    execute(): void {
        this.doctor.changeState(CharacterState.HEALING);
        const healingBuff = new SingleHealingBuff(this.doctor.actor.attack);
        healingBuff.install(this.target.effectTarget);
        healingBuff.work(this.target.effectTarget);

        let addBuffAni = this.target.addBuffAni;
        addBuffAni.text = "HP+" + this.doctor.actor.attack;
        addBuffAni.reverse = this.doctor.isDirecationReverse;
        addBuffAni.duration = this.duration;
        addBuffAni.playBuffAnimation();

        this.doctor.scheduleOnce(() => {
            this.doctor.changeState(CharacterState.IDLE);
            this.complete();
        }, this.duration)
    }

}

export class MainSkillCommand extends Command {

    private _skill: MainSkill;
    public get skill(): MainSkill {
        return this._skill;
    }
    public set skill(value: MainSkill) {
        this._skill = value;
    }

    constructor(skill: MainSkill) {
        super()
        this.skill = skill;
        this.duration = skill.duration;
    }

    execute(): void {
        const rageCost = this.skill.skillData.RageCost;
        const currentRage = this.skill.attacker.getRage();
        if (rageCost > currentRage) {
            this.complete();
        } else {
            this.skill.attacker.changeState(CharacterState.CASTING);
            this.skill.useSkill();
            this.skill.attacker.scheduleOnce(() => {
                if (!this.skill.skillData.NeedMove) {
                    this.skill.attacker.changeState(CharacterState.IDLE);
                }

                this.skill.attacker.setRage(currentRage - rageCost);
                this.complete();
            }, this.duration);
        }

    }
}


