import { _decorator, Component, Node } from 'cc';
import { Mediator } from './Mediator';
import { CrabStateMachine } from '../StateMachine/CrabStateMachine';
import { CrabActor } from '../Actors/CrabActor';
import { crab } from '../Data/Crab';
const { ccclass, property } = _decorator;

@ccclass('CrabMediator')
export class CrabMediator extends Mediator {

    protected onLoad(): void {
        this.actor = new CrabActor();
        this.actor.fetchActor();
    }

    start() {
        this.stateMachine = this.getComponentInChildren(CrabStateMachine);
    }

    protected updateHpBar(): void {
        const percent = this.actor.hp / crab.hp;
        this.hpBar.progress = percent;
    }

    protected updateRageBar(): void {
        const percent = this.actor.rage / crab.rage;
        this.rageBar.progress = percent;
    }

    update(deltaTime: number) {

    }
}


