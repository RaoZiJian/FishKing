import { _decorator, Component, Node } from 'cc';
import { ActorStateMichine, CharacterState } from './ActorStateMachine';
const { ccclass, property } = _decorator;

@ccclass('XiaoQiaoStateMachine')
export class XiaoQiaoStateMachine extends ActorStateMichine {
    start() {
        this.changeState(CharacterState.IDLE);
    }

    update(deltaTime: number) {
        
    }
}


