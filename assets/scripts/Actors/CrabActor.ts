import { crab } from "../Data/Crab";
import { Actor } from "./Actor";

export class CrabActor extends Actor {
    fetchActor(): void {
        this.name = crab.name;
        this.hp = crab.hp;
        this.attackShake = crab.attackShake;
        this.attackAfterShake = crab.attackAfterShake;
        this.attack = crab.attack;
        this.rage = crab.rage;
        this.defense = crab.defense;
        this.speed = crab.speed;
        this.damageIncrease = crab.damageIncrease;
        this.damageDecrease = crab.damageDecrease;
        this.skillDamage = crab.skillDamage;
        this.skillDecrease = crab.skillDecrease;
        this.amorDecrease = crab.amorDecrease;
        this.amorDecreaseResistance = crab.amorDecreaseResistance;
        this.criticalHitRate = crab.criticalHitRate;
        this.criticalResistance = crab.criticalResistance;
        this.criticalDamage = crab.criticalDamage;
        this.criticalDamageResistance = crab.criticalDamageResistance;
        this.controlHit = crab.controlHit;
        this.controlResistance = crab.controlResistance;
        this.gridBlock = crab.gridBlock;
        this.precise = crab.precise;
    }
}


