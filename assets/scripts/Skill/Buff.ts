import { _decorator } from 'cc';
import { EffectTarget } from './EffectTarget';
import { Effect, EffectContainer, SingleHealingEffect, SingleTauntEffect } from './Effect';
import { SkillData } from './MainSkill';

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
        this.tauntEffect = new SingleTauntEffect(skillData.Value);
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
        this.target.mediator.scheduleOnce(() => {
            this.tauntEffect.remove();
        }, this.tauntDuration);
    }
}

export class SingleHealingBuff extends Buff {

    private _healingHp: number;
    public get healingHp(): number {
        return this._healingHp;
    }
    public set healingHp(value: number) {
        this._healingHp = value;
    }

    private _healingEffect: SingleHealingEffect;
    public get healingEffect(): SingleHealingEffect {
        return this._healingEffect;
    }
    public set healingEffect(value: SingleHealingEffect) {
        this._healingEffect = value;
    }


    constructor(healingHp: number) {
        super();
        this.healingHp = healingHp;
        this.healingEffect = new SingleHealingEffect(healingHp);
    }

    getEffects(): Effect[] {
        return [this.healingEffect];
    }
    install(target: EffectTarget): void {
        this.target = target;
    }
    work(target: EffectTarget): void {
        this.healingEffect.cast(target);
    }
}