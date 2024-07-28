import { log } from "cc";
import { FishActorId } from "../Constants";
import GameTsCfg from "../Data/export/client/GameTsCfg";
import { Actor, ActorId } from "./Actor";

export class ZhaoYunActor extends Actor {
    public override fetchActor(): void {
        this.uuuId = ActorId.generateActorId();
        const gameCfg = GameTsCfg.actor;
        this.cfg = gameCfg[FishActorId.ZhaoYun];
        if (this.cfg) {
            this.parseCfg();
        } else {
            log("cannot find zhaoyun config");
        }

    }
}


