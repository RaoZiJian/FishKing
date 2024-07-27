import { log } from "cc";
import { FishActorId } from "../Constants";
import { CrabActor } from "./CrabActor";
import { LvMengActor } from "./LvMengActor";
import { octopusActor } from "./OctopusActor";
import { PrianhaActor } from "./PiranhaActor";
import { ZhangLiaoActor } from "./ZhangLiaoActor";
import { ZhaoYunActor } from "./ZhaoYunActor";

export class ActorFactory {
    static creatActorByID(id: number) {
        switch (id) {
            case FishActorId.Crab:
                return new CrabActor();
            case FishActorId.LvMeng:
                return new LvMengActor();
            case FishActorId.Octopus:
                return new octopusActor();
            case FishActorId.Prianha:
                return new PrianhaActor();
            case FishActorId.ZhangLiao:
                return new ZhangLiaoActor();
            case FishActorId.ZhaoYun:
                return new ZhaoYunActor();
            default:
                log("cannot find this actor id" + id);
        }
    }
}