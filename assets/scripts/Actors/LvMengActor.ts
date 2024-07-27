import { log } from "cc";
import { FishActorId } from "../Constants";
import GameTsCfg from "../Data/export/client/GameTsCfg";
import { skillDataList } from "../Data/SkillData";
import { Actor, ActorId } from "./Actor";

export class LvMengActor extends Actor {
    public override fetchActor(): void {
        this.uuuId = ActorId.generateActorId();
        const gameCfg = GameTsCfg.actor;
        this.cfg = gameCfg[FishActorId.LvMeng];
        if(this.cfg){
            this.parseCfg();
        }else{
            log("cannot find lvmeng config");
        }
    }
}


