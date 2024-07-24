import { _decorator} from 'cc';
import { Mediator } from './Mediator';
import { octopusActor } from '../Actors/OctopusActor';
import { OctopusStateMachine } from '../StateMachine/OctopusStateMachine';
import { octopus } from '../Data/Octopus';
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

    protected updateHpBar(): void {
        const percent = this.actor.hp / octopus.hp;
        this.hpBar.progress = percent;
    }

    protected updateRageBar(): void {
        const percent = this.actor.rage / octopus.rage;
        this.rageBar.progress = percent;
    }


    update(deltaTime: number) {
        
    }
}


