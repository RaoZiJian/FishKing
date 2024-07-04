import { _decorator, Component, Node } from 'cc';
import { ActorStateMichine, CharacterState } from './ActorStateMichine';
const { ccclass, property } = _decorator;

@ccclass('PiranhaActorStateMachine')
export class PiranhaActorStateMachine extends ActorStateMichine {
    start() {
        this.changeState(CharacterState.IDLE);
    }

    update(deltaTime: number) {
        
    }
}


