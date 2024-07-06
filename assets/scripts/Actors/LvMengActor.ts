import { lvmeng } from "../Data/LvMeng";
import { Actor, ActorId } from "./Actor";

export class LvMengActor extends Actor {
    public override fetchActor(): void {
        this.id = ActorId.generateActorId();
        this.name = lvmeng.name;
        this.hp = lvmeng.hp;
        this.attackShake = lvmeng.attackShake;
        this.attackAfterShake = lvmeng.attackAfterShake;
        this.attack = lvmeng.attack;
        this.rage = lvmeng.rage;
        this.defense = lvmeng.defense;
        this.speed = lvmeng.speed;
        this.damageIncrease = lvmeng.damageIncrease;
        this.damageDecrease = lvmeng.damageDecrease;
        this.skillDamage = lvmeng.skillDamage;
        this.skillDecrease = lvmeng.skillDecrease;
        this.amorDecrease = lvmeng.amorDecrease;
        this.amorDecreaseResistance = lvmeng.amorDecreaseResistance;
        this.criticalHitRate = lvmeng.criticalHitRate;
        this.criticalResistance = lvmeng.criticalResistance;
        this.criticalDamage = lvmeng.criticalDamage;
        this.criticalDamageResistance = lvmeng.criticalDamageResistance;
        this.controlHit = lvmeng.controlHit;
        this.controlResistance = lvmeng.controlResistance;
        this.gridBlock = lvmeng.gridBlock;
        this.precise = lvmeng.precise;
    }
}


