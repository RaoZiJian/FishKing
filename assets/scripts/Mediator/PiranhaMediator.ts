import { _decorator } from 'cc';
import { Mediator } from './Mediator';
import { PiranhaActorStateMachine } from '../StateMachine/PiranhaActorStateMachine';
import { PrianhaActor } from '../Actors/PiranhaActor';
import { EffectTarget } from '../Skill/EffectTarget';
const { ccclass } = _decorator;

@ccclass('PiranhaMediator')
export class PiranhaMediator extends Mediator {
    protected onLoad(): void {
        this.actor = new PrianhaActor();
        this.actor.fetchActor();
        this.effectTarget = new EffectTarget(this);
    }

    start() {
        this.stateMachine = this.getComponentInChildren(PiranhaActorStateMachine)
        this.stateMachine.mediator = this;
    }

    update(deltaTime: number) {

    }
}


