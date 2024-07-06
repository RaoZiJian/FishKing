import { _decorator } from 'cc';
import { LvMengActor } from '../Actors/LvMengActor';
import { Mediator } from './Mediator';
import { lvmeng } from '../Data/LvMeng';
import { LvMengStateMachine } from '../StateMachine/LvMengStateMachine';
const { ccclass, property } = _decorator;

@ccclass('LvMengMediator')
export class LvMengMediator extends Mediator {

    protected onLoad(): void {
        this.actor = new LvMengActor();
        this.actor.fetchActor();
    }

    start() {
        this.stateMachine = this.getComponentInChildren(LvMengStateMachine);
    }

    protected updateHpBar(): void {
        const percent = this.actor.hp / lvmeng.hp;
        this.hpBar.progress = percent;
    }

    protected updateRageBar(): void {
        const percent = this.actor.rage / lvmeng.rage;
        this.rageBar.progress = percent;
    }

    update(deltaTime: number) {

    }
}


