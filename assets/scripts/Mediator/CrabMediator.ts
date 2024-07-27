import { _decorator, Component, Node } from 'cc';
import { Mediator } from './Mediator';
import { CrabStateMachine } from '../StateMachine/CrabStateMachine';
import { CrabActor } from '../Actors/CrabActor';
import { EffectTarget } from '../Skill/EffectTarget';
const { ccclass } = _decorator;

@ccclass('CrabMediator')
export class CrabMediator extends Mediator {

    protected onLoad(): void {
        this.actor = new CrabActor();
        this.actor.fetchActor();
        this.effectTarget = new EffectTarget(this);
    }

    start() {
        this.stateMachine = this.getComponentInChildren(CrabStateMachine);
    }

    update(deltaTime: number) {

    }
}


