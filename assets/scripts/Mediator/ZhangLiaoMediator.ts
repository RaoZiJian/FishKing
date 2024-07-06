import { _decorator } from 'cc';
import { Mediator } from './Mediator';
import { ZhangLiaoActor } from '../Actors/ZhangLiaoActor';
import { ZhangLiaoStateMachine } from '../StateMachine/ZhangLiaoStateMachine';
import { zhangliao } from '../Data/ZhangLiao';
const { ccclass, property } = _decorator;

@ccclass('ZhangLiaoMediator')
export class ZhangLiaoMediator extends Mediator {
    protected onLoad(): void {
        this.actor = new ZhangLiaoActor();
        this.actor.fetchActor();
    }

    start() {
        this.stateMachine = this.getComponentInChildren(ZhangLiaoStateMachine)
    }

    protected updateHpBar(): void {
        const percent = this.actor.hp / zhangliao.hp;
        this.hpBar.progress = percent;
    }

    protected updateRageBar(): void {
        const percent = this.actor.rage / zhangliao.rage;
        this.rageBar.progress = percent;
    }

    update(deltaTime: number) {

    }
}


