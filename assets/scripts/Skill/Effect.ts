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