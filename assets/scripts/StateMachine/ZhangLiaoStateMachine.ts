import { _decorator } from 'cc';
import { ActorStateMichine, CharacterState } from './ActorStateMachine';
const { ccclass } = _decorator;

@ccclass('ZhangLiaoStateMachine')
export class ZhangLiaoStateMachine extends ActorStateMichine {
    start() {
        this.changeState(CharacterState.IDLE);
    }

    update(deltaTime: number) {
        
    }
}


