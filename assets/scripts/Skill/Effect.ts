import { _decorator } from 'cc';
import { EffectTarget } from './EffectTarget';

export interface Effect {
    cast(target: EffectTarget): void;
    remove(): void;
}

export interface EffectContainer {
    getEffects(): Effect[];
}

/**
 * 单体嘲讽值增加
 */
export class SingleTauntEffect implements Effect {

    private _taunt: number = 0;
    public get taunt(): number {
        return this._taunt;
    }
    public set taunt(value: number) {
        this._taunt = value;
    }

    private _target: EffectTarget;
    public get target(): EffectTarget {
        return this._target;
    }
    public set target(value: EffectTarget) {
        this._target = value;
    }

    constructor(value: number) {
        this.taunt = value;
    }

    cast(target: EffectTarget): void {
        this.target = target;
        this.target.mediator.actor.taunt += this.taunt;
    }

    remove() {
        if (this.target) {
            this.target.mediator.actor.taunt -= this.taunt;
        }
    }
}

export class SingleHealingEffect implements Effect {

    private _healingHp: number = 0;
    public get healingHp(): number {
        return this._healingHp;
    }
    public set healingHp(value: number) {
        this._healingHp = value;
    }

    private _target: EffectTarget;
    public get target(): EffectTarget {
        return this._target;
    }
    public set target(value: EffectTarget) {
        this._target = value;
    }

    constructor(healingHp: number) {
        this.healingHp = healingHp;
    }

    cast(target: EffectTarget): void {
        this.target = target;
        const currentHp = this.target.mediator.actor.hp + this.healingHp;
        this.target.mediator.setHP(currentHp > this.target.mediator.actor.cfg.hp ? this.target.mediator.actor.cfg.hp : currentHp);
    }
    remove(): void {

    }

}