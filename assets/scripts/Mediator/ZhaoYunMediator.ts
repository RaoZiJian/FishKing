import { _decorator } from 'cc';
import { ZhaoYunActor } from '../Actors/ZhaoYunActor';
import { ZhaoYunStateMachine } from '../StateMachine/ZhaoYunStateMachine';
import { Mediator } from './Mediator';
import { EffectTarget } from '../Skill/EffectTarget';
const { ccclass } = _decorator;

@ccclass('ZhaoYunMediator')
export class ZhaoYunMediator extends Mediator {
    protected onLoad(): void {
        this.actor = new ZhaoYunActor();
        this.actor.fetchActor();
        this.effectTarget = new EffectTarget(this);
    }

    start() {
        this.stateMachine = this.getComponentInChildren(ZhaoYunStateMachine);
        this.stateMachine.mediator = this;
    }

    update(deltaTime: number) {

    }
}


