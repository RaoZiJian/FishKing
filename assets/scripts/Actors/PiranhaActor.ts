import { prianha } from "../Data/Piranha";
import { Actor, ActorId } from "./Actor";

export class PrianhaActor extends Actor {
    public override fetchActor(): void {
        this.id = ActorId.generateActorId();
        this.name = prianha.name;
        this.hp = prianha.hp;
        this.attackShake = prianha.attackShake;
        this.attackAfterShake = prianha.attackAfterShake;
        this.attack = prianha.attack;
        this.rage = prianha.rage;
        this.defense = prianha.defense;
        this.speed = prianha.speed;
        this.damageIncrease = prianha.damageIncrease;
        this.damageDecrease = prianha.damageDecrease;
        this.skillDamage = prianha.skillDamage;
        this.skillDecrease = prianha.skillDecrease;
        this.amorDecrease = prianha.amorDecrease;
        this.amorDecreaseResistance = prianha.amorDecreaseResistance;
        this.criticalHitRate = prianha.criticalHitRate;
        this.criticalResistance = prianha.criticalResistance;
        this.criticalDamage = prianha.criticalDamage;
        this.criticalDamageResistance = prianha.criticalDamageResistance;
        this.controlHit = prianha.controlHit;
        this.controlResistance = prianha.controlResistance;
        this.gridBlock = prianha.gridBlock;
        this.precise = prianha.precise;
        this.taunt = prianha.taunt;
    }
}


