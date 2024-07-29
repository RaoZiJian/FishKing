import { _decorator, Component, log, Node } from 'cc';
import { Actor, ActorId } from './Actor';
import GameTsCfg from '../Data/export/client/GameTsCfg';
import { FishActorId } from '../Constants';
const { ccclass, property } = _decorator;

@ccclass('XiaoQiaoActor')
export class XiaoQiaoActor extends Actor {
    public override fetchActor(): void {
        this.uuuId = ActorId.generateActorId();
        const gameCfg = GameTsCfg.actor;
        this.cfg = gameCfg[FishActorId.XiaoQiao];
        if(this.cfg){
            this.parseCfg();
        }else{
            log("cannot find prianha config");
        }

    }
}


