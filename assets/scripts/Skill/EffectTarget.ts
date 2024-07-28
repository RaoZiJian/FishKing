import { _decorator, Component, Node } from 'cc';
import { Buff } from './Buff';
import { Mediator } from '../Mediator/Mediator';
const { ccclass } = _decorator;

@ccclass('EffectTarget')
export class EffectTarget {
    buffList: Buff[] = [];

    private _mediator: Mediator;
    public get mediator(): Mediator {
        return this._mediator;
    }
    public set mediator(value: Mediator) {
        this._mediator = value;
    }

    constructor(mediator: Mediator) {
        this.mediator = mediator;
    }

    addBuff(buff: Buff) {
        buff.install(this);
        this.buffList.push(buff);
    }

    removeBuff(buff: Buff) {
        this.buffList = this.buffList.filter((b) => b !== buff);
    }

    castMainSkill() {

    }
}