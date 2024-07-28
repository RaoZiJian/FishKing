import { _decorator } from 'cc';
import { ActorStateMichine, CharacterState } from './ActorStateMachine';
const { ccclass, property } = _decorator;

@ccclass('HuangZhongStateMachine')
export class HuangZhongStateMachine extends ActorStateMichine {
    start() {
        this.changeState(CharacterState.IDLE);
    }

    update(deltaTime: number) {

    }
}


