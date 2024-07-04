import { _decorator, Component, Node } from 'cc';
import { ActorStateMichine, CharacterState } from './ActorStateMichine';
const { ccclass, property } = _decorator;

@ccclass('CrabStateMachine')
export class CrabStateMachine extends ActorStateMichine {
    start() {
        this.changeState(CharacterState.IDLE);
    }

    update(deltaTime: number) {
        
    }
}


