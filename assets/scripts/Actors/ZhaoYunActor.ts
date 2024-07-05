import { zhaoyun } from "../Data/ZhaoYun";
import { Actor, ActorId } from "./Actor";

export class ZhaoYunActor extends Actor {
    public override fetchActor(): void {
        this.id = ActorId.generateActorId();
        this.name = zhaoyun.name;
        this.hp = zhaoyun.hp;
        this.attackShake = zhaoyun.attackShake;
        this.attackAfterShake = zhaoyun.attackAfterShake;
        this.attack = zhaoyun.attack;
        this.rage = zhaoyun.rage;
        this.defense = zhaoyun.defense;
        this.speed = zhaoyun.speed;
        this.damageIncrease = zhaoyun.damageIncrease;
        this.damageDecrease = zhaoyun.damageDecrease;
        this.skillDamage = zhaoyun.skillDamage;
        this.skillDecrease = zhaoyun.skillDecrease;
        this.amorDecrease = zhaoyun.amorDecrease;
        this.amorDecreaseResistance = zhaoyun.amorDecreaseResistance;
        this.criticalHitRate = zhaoyun.criticalHitRate;
        this.criticalResistance = zhaoyun.criticalResistance;
        this.criticalDamage = zhaoyun.criticalDamage;
        this.criticalDamageResistance = zhaoyun.criticalDamageResistance;
        this.controlHit = zhaoyun.controlHit;
        this.controlResistance = zhaoyun.controlResistance;
        this.gridBlock = zhaoyun.gridBlock;
        this.precise = zhaoyun.precise;
    }
}


