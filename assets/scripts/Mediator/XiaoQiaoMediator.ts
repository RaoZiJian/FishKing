import { _decorator, Node, tween, UIOpacity } from 'cc';
import { Mediator } from './Mediator';
import { XiaoQiaoActor } from '../Actors/XiaoQiaoActor';
import { EffectTarget } from '../Skill/EffectTarget';
import { XiaoQiaoStateMachine } from '../StateMachine/XiaoQiaoStateMachine';
import { CharacterState } from '../StateMachine/ActorStateMachine';
const { ccclass, property } = _decorator;

@ccclass('XiaoQiaoMediator')
export class XiaoQiaoMediator extends Mediator {

    @property(Node)
    light: Node;
    protected onLoad(): void {
        this.actor = new XiaoQiaoActor();
        this.actor.fetchActor();
        this.effectTarget = new EffectTarget(this);
    }

    playLightEffect(duration: number) {
        this.light.getComponent(UIOpacity).opacity = 255;

        tween(this.light)
        .by(duration, {angle: 360}, {easing:'sineInOut'})
        .call(()=>{
            this.light.getComponent(UIOpacity).opacity = 0;
        })
        .start();
    }

    start() {
        this.light.getComponent(UIOpacity).opacity = 0;
        this.stateMachine = this.getComponentInChildren(XiaoQiaoStateMachine);
        this.stateMachine.mediator = this;
    }

    update(deltaTime: number) {

    }

    healing(): void {
        this.stateMachine.changeState(CharacterState.HEALING);
        const duration = this.stateMachine.getAnimationDuration(CharacterState.HEALING);
        this.playLightEffect(duration);
    }
}


