import { _decorator } from 'cc';
import { Mediator } from './Mediator';
import { HuangZhongActor } from '../Actors/HuangZhongActor';
import { EffectTarget } from '../Skill/EffectTarget';
import { HuangZhongStateMachine } from '../StateMachine/HuangZhongStateMachine';
const { ccclass } = _decorator;

@ccclass('HuangZhongMediator')
export class HuangZhongMediator extends Mediator {
    protected onLoad(): void {
        this.actor = new HuangZhongActor();
        this.actor.fetchActor();
        this.effectTarget = new EffectTarget(this);
    }

    start() {
        this.stateMachine = this.getComponentInChildren(HuangZhongStateMachine);
        this.stateMachine.mediator = this;
    }

    update(deltaTime: number) {

    }
}


