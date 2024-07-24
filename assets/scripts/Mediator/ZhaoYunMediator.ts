import { _decorator} from 'cc';
import { ZhaoYunActor } from '../Actors/ZhaoYunActor';
import { ZhaoYunStateMachine } from '../StateMachine/ZhaoYunStateMachine';
import { Mediator } from './Mediator';
import { zhaoyun } from '../Data/ZhaoYun';
import { EffectTarget } from '../Skill/EffectTarget';
const { ccclass } = _decorator;

@ccclass('ZhaoYunMediator')
export class ZhaoYunMediator extends Mediator {
    protected onLoad(): void {
        this.actor = new ZhaoYunActor();
        this.actor.fetchActor();
        this.effectTarget = new EffectTarget(this);
    }

    start() {
        this.stateMachine = this.getComponentInChildren(ZhaoYunStateMachine);
        this.stateMachine.mediator = this;
    }

    protected updateHpBar(): void {
        const percent = this.actor.hp / zhaoyun.hp;
        this.hpBar.progress = percent;
    }

    protected updateRageBar(): void {
        const percent = this.actor.rage / zhaoyun.rage;
        this.rageBar.progress = percent;
    }

    update(deltaTime: number) {

    }
}


