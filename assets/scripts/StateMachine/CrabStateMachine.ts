import { _decorator } from 'cc';
import { ActorStateMichine, CharacterState } from './ActorStateMachine';
const { ccclass, property } = _decorator;

@ccclass('CrabStateMachine')
export class CrabStateMachine extends ActorStateMichine {
    start() {
        this.changeState(CharacterState.IDLE);
    }

    update(deltaTime: number) {

    }
}


