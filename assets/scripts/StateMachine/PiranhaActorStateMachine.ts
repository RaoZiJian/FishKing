import { _decorator } from 'cc';
import { ActorStateMichine, CharacterState } from './ActorStateMachine';
const { ccclass, property } = _decorator;

@ccclass('PiranhaActorStateMachine')
export class PiranhaActorStateMachine extends ActorStateMichine {
    start() {
        this.changeState(CharacterState.IDLE);
    }

    update(deltaTime: number) {

    }
}


