import { tween, UIOpacity, Vec3 } from 'cc';
import { ActorStateMichine, CharacterState } from '../StateMachine/ActorStateMichine';
import { Command } from './Command';
import { Mediator } from '../Mediator/Mediator';
import { Constants } from '../Constants';

export class ActorCommands extends Command {
    private _mediator: Mediator;
    public get mediator(): Mediator {
        return this._mediator;
    }
    public set mediator(value: Mediator) {
        this._mediator = value;
    }

    constructor(mediator: Mediator) {
        super();
        this.mediator = mediator;
    }
}

export class MoveCommand extends ActorCommands {
    private _targePos: Vec3;
    public get targePos(): Vec3 {
        return this._targePos;
    }
    public set targePos(value: Vec3) {
        this._targePos = value;
    }

    constructor(mediator: Mediator, targetPos: Vec3) {
        super(mediator);
        this.targePos = targetPos;
    }

    execute(): void {
        this.mediator.changeState(CharacterState.WALKING);
        tween(this.mediator.node)
            .to(Constants.AttakingWalkTime, { position: this.targePos })
            .call(() => {
                this.complete();
            })
            .start();
    }
}

export class AttackCommand extends ActorCommands {

    private _defender: Mediator;
    public get defender(): Mediator {
        return this._defender;
    }
    public set defender(value: Mediator) {
        this._defender = value;
    }

    constructor(attacker: Mediator, target: Mediator) {
        super(attacker);
        this.defender = target;
    }

    execute(): void {
        this.mediator.changeState(CharacterState.ATTACKING);
        const attackDuration = (this.mediator.getAnimationDuration(CharacterState.ATTACKING) + this.mediator.actor.attackShake) * 1000;
        setTimeout(() => {
            this.complete();
        }, attackDuration);

        setTimeout(() => {
            const hurt = new HurtCommand(this.mediator, this.defender);
            hurt.execute();
        }, this.mediator.getAnimationDuration(CharacterState.ATTACKING) * 0.5 * 1000)
    }
}

export class HurtCommand extends ActorCommands {
    private _attacker: Mediator;
    public get attacker(): Mediator {
        return this._attacker;
    }
    public set attacker(value: Mediator) {
        this._attacker = value;
    }


    constructor(attack: Mediator, defender: Mediator) {
        super(defender);
        this.attacker = attack;
    }

    execute(): void {
        const attack = this.attacker.actor.attack;
        const defence = this.mediator.actor.defense;
        const hp = this.mediator.actor.hp;
        const lostHp = (attack - defence) > 0 ? attack - defence : 0;
        const currentHp = (hp - lostHp) > 0 ? hp - lostHp : 0;
        this.mediator.setHP(currentHp);
        this.mediator.changeState(CharacterState.HURT);
        const hurtDuration = this.mediator.getAnimationDuration(CharacterState.HURT) * 1000;
        setTimeout(() => {
            if (currentHp > 0) {
                this.mediator.changeState(CharacterState.IDLE);
            }else{
                const deadCommand = new DeadCommand(this.mediator);
                deadCommand.execute();
            }
            this.complete();
        }, hurtDuration);
    }
}

export class DeadCommand extends ActorCommands {
    constructor(deadActor: Mediator) {
        super(deadActor);
    }

    execute(): void {
        const uiopacity = this.mediator.getComponent(UIOpacity);
        if (uiopacity) {
            tween(uiopacity)
                .to(1, { opacity: 0 })
                .call(() => {
                    this.complete();
                })
                .start();
        }
    }
}


