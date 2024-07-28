import { _decorator, Component, log, Node } from 'cc';
import { Actor, ActorId } from './Actor';
import GameTsCfg from '../Data/export/client/GameTsCfg';
import { FishActorId } from '../Constants';

export class HuangZhongActor extends Actor {
    public override fetchActor(): void {
        this.uuuId = ActorId.generateActorId();
        const gameCfg = GameTsCfg.actor;
        this.cfg = gameCfg[FishActorId.HuangZhong];
        if(this.cfg){
            this.parseCfg();
        }else{
            log("cannot find huangzhong config");
        }
    }
}


