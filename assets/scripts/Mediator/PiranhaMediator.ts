import { _decorator } from 'cc';
import { Mediator } from './Mediator';
import { PiranhaActorStateMachine } from '../StateMachine/PiranhaActorStateMachine';
import { PrianhaActor } from '../Actors/PiranhaActor';
import { prianha } from '../Data/Piranha';
import { EffectTarget } from '../Skill/EffectTarget';
const { ccclass, property } = _decorator;

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

    protected updateHpBar(): void {
        const percent = this.actor.hp / prianha.hp;
        this.hpBar.progress = percent;
    }

    protected updateRageBar(): void {
        const percent = this.actor.rage / prianha.rage;
        this.rageBar.progress = percent;
    }

    update(deltaTime: number) {

    }
}


