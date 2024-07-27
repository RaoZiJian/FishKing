import { _decorator } from 'cc';
import { Mediator } from './Mediator';
import { octopusActor } from '../Actors/OctopusActor';
import { OctopusStateMachine } from '../StateMachine/OctopusStateMachine';
import { EffectTarget } from '../Skill/EffectTarget';
const { ccclass } = _decorator;

@ccclass('OctopusMediator')
export class OctopusMediator extends Mediator {

    protected onLoad(): void {
        this.actor = new octopusActor();
        this.actor.fetchActor();
        this.effectTarget = new EffectTarget(this);
    }

    start() {
        this.stateMachine = this.getComponentInChildren(OctopusStateMachine);
        this.stateMachine.mediator = this;
    }

    update(deltaTime: number) {

    }
}


