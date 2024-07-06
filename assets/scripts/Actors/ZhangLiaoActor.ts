import { zhangliao } from "../Data/ZhangLiao";
import { Actor, ActorId } from "./Actor";

export class ZhangLiaoActor extends Actor {
    public override fetchActor(): void {
        this.id = ActorId.generateActorId();
        this.name = zhangliao.name;
        this.hp = zhangliao.hp;
        this.attackShake = zhangliao.attackShake;
        this.attackAfterShake = zhangliao.attackAfterShake;
        this.attack = zhangliao.attack;
        this.rage = zhangliao.rage;
        this.defense = zhangliao.defense;
        this.speed = zhangliao.speed;
        this.damageIncrease = zhangliao.damageIncrease;
        this.damageDecrease = zhangliao.damageDecrease;
        this.skillDamage = zhangliao.skillDamage;
        this.skillDecrease = zhangliao.skillDecrease;
        this.amorDecrease = zhangliao.amorDecrease;
        this.amorDecreaseResistance = zhangliao.amorDecreaseResistance;
        this.criticalHitRate = zhangliao.criticalHitRate;
        this.criticalResistance = zhangliao.criticalResistance;
        this.criticalDamage = zhangliao.criticalDamage;
        this.criticalDamageResistance = zhangliao.criticalDamageResistance;
        this.controlHit = zhangliao.controlHit;
        this.controlResistance = zhangliao.controlResistance;
        this.gridBlock = zhangliao.gridBlock;
        this.precise = zhangliao.precise;
    }
}


