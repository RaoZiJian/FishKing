import { _decorator, Component, Node } from 'cc';
import { ActorStateMichine, CharacterState } from './ActorStateMachine';
const { ccclass, property } = _decorator;

@ccclass('LvMengStateMachine')
export class LvMengStateMachine extends ActorStateMichine {
    start() {
        this.changeState(CharacterState.IDLE);
    }

    update(deltaTime: number) {
        
    }

    protected playAnimationForCasting(): void {
    }
}


