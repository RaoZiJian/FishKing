import { _decorator, AudioClip } from 'cc';
import { LvMengActor } from '../Actors/LvMengActor';
import { Mediator } from './Mediator';
import { LvMengStateMachine } from '../StateMachine/LvMengStateMachine';
import { EffectTarget } from '../Skill/EffectTarget';
const { ccclass } = _decorator;

@ccclass('LvMengMediator')
export class LvMengMediator extends Mediator {

    protected onLoad(): void {
        this.actor = new LvMengActor();
        this.actor.fetchActor();
        this.effectTarget = new EffectTarget(this);
    }

    start() {
        this.stateMachine = this.getComponentInChildren(LvMengStateMachine);
        this.stateMachine.mediator = this;
    }

    update(deltaTime: number) {

    }
}


