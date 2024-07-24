import { _decorator } from 'cc';
import { EffectTarget } from './EffectTarget';
import { Effect, EffectContainer, SingleTauntEffect } from './Effect';
import { SkillData } from '../Data/SkillData';

const { ccclass } = _decorator;

@ccclass('Buff')
export abstract class Buff implements EffectContainer {

    private _target: EffectTarget;
    public get target(): EffectTarget {
        return this._target;
    }
    public set target(value: EffectTarget) {
        this._target = value;
    }

    abstract getEffects(): Effect[];
    abstract install(target: EffectTarget): void;
    abstract work(target: EffectTarget): void;
}

/**
 * 单体嘲讽BUFF
 */
export class SingleTauntBuff extends Buff {

    private _tauntEffect: SingleTauntEffect;
    public get tauntEffect(): SingleTauntEffect {
        return this._tauntEffect;
    }
    public set tauntEffect(value: SingleTauntEffect) {
        this._tauntEffect = value;
    }

    private _tauntDuration: number;
    public get tauntDuration(): number {
        return this._tauntDuration;
    }
    public set tauntDuration(value: number) {
        this._tauntDuration = value;
    }

    constructor(skillData: SkillData) {
        super();
        this.tauntEffect = new SingleTauntEffect(skillData.Value[0]);
        this.tauntDuration = skillData.CoolDown;
    }

    getEffects(): Effect[] {
        return [this.tauntEffect];
    }

    install(target: EffectTarget): void {
        this.target = target;
    }

    work(target: EffectTarget): void {
        this.tauntEffect.cast(target);
        setTimeout(() => {
            this.tauntEffect.remove();
        }, this.tauntDuration);
    }
}