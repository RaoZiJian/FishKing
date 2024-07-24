import { tween, UIOpacity, Vec3 } from 'cc';
import { CharacterState } from '../StateMachine/ActorStateMachine';
import { Command } from './Command';
import { Mediator } from '../Mediator/Mediator';
import { Constants } from '../Constants';
import { MainSkill } from '../Skill/MainSkill';

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

export class AttackCommand extends Command {

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
        const attackDuration = this.duration * 1000;
        const attack = this.attacker.actor.attack;
        const defence = this.defender.actor.defense;
        const damage = (attack - defence) > 0 ? attack - defence : 0;

        setTimeout(() => {
            this.complete();
        }, attackDuration);

        setTimeout(() => {
            const hurt = new HurtCommand(this.attacker, this.defender, damage);
            hurt.execute();
        }, this.attacker.getAnimationDuration(CharacterState.ATTACKING) * 0.5 * 1000)
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
        this.duration = this.defender.getAnimationDuration(CharacterState.HURT);
    }

    execute(): void {
        const attack = this.attacker.actor.attack;
        const defence = this.defender.actor.defense;
        // const hp = this.defender.actor.hp;
        // const lostHp = (attack - defence) > 0 ? attack - defence : 0;
        // const currentHp = (hp - lostHp) > 0 ? hp - lostHp : 0;
        // this.defender.setHP(currentHp);
        const hp = this.defender.actor.hp;
        const currentHp = (hp - this.damage) > 0 ? hp - this.damage : 0;
        this.defender.setHP(currentHp);
        this.defender.changeState(CharacterState.HURT);
        const hurtDuration = this.duration * 1000;

        setTimeout(() => {
            if (currentHp > 0) {
                this.defender.changeState(CharacterState.IDLE);
            } else {
                const deadCommand = new DeadCommand(this.defender);
                deadCommand.execute();
            }
            this.complete();
        }, hurtDuration);
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
        this.skill.useSkill();
        setTimeout(() => {
            this.complete();
        }, this.duration * 1000);
    }
}


