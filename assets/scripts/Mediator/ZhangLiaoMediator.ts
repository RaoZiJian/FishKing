import { _decorator } from 'cc';
import { Mediator } from './Mediator';
import { ZhangLiaoActor } from '../Actors/ZhangLiaoActor';
import { ZhangLiaoStateMachine } from '../StateMachine/ZhangLiaoStateMachine';
import { EffectTarget } from '../Skill/EffectTarget';
const { ccclass, property } = _decorator;

@ccclass('ZhangLiaoMediator')
export class ZhangLiaoMediator extends Mediator {
    protected onLoad(): void {
        this.actor = new ZhangLiaoActor();
        this.actor.fetchActor();
        this.effectTarget = new EffectTarget(this);
    }

    start() {
        this.stateMachine = this.getComponentInChildren(ZhangLiaoStateMachine);
        this.stateMachine.mediator = this;
    }

    update(deltaTime: number) {

    }
}


