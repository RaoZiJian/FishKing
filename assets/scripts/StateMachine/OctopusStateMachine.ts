import { _decorator } from 'cc';
import { ActorStateMichine, CharacterState } from './ActorStateMachine';
const { ccclass } = _decorator;

@ccclass('OctopusStateMachine')
export class OctopusStateMachine extends ActorStateMichine {
    start() {
        this.changeState(CharacterState.IDLE);
    }

    update(deltaTime: number) {
        
    }
}


