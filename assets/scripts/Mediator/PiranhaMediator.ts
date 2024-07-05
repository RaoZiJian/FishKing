import { _decorator } from 'cc';
import { Mediator } from './Mediator';
import { PiranhaActorStateMachine } from '../StateMachine/PiranhaActorStateMachine';
import { PrianhaActor } from '../Actors/PiranhaActor';
import { prianha } from '../Data/Piranha';
const { ccclass, property } = _decorator;

@ccclass('PiranhaMediator')
export class PiranhaMediator extends Mediator {

    protected onLoad(): void {
        this.actor = new PrianhaActor();
        this.actor.fetchActor();
    }

    start() {
        this.stateMachine = this.getComponentInChildren(PiranhaActorStateMachine)
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


