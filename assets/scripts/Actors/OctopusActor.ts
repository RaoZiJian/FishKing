import { octopus } from "../Data/Octopus";
import { Actor, ActorId } from "./Actor";

export class octopusActor extends Actor {
    public override fetchActor(): void {
        this.id = ActorId.generateActorId();
        this.name = octopus.name;
        this.hp = octopus.hp;
        this.attackShake = octopus.attackShake;
        this.attackAfterShake = octopus.attackAfterShake;
        this.attack = octopus.attack;
        this.rage = octopus.rage;
        this.defense = octopus.defense;
        this.speed = octopus.speed;
        this.damageIncrease = octopus.damageIncrease;
        this.damageDecrease = octopus.damageDecrease;
        this.skillDamage = octopus.skillDamage;
        this.skillDecrease = octopus.skillDecrease;
        this.amorDecrease = octopus.amorDecrease;
        this.amorDecreaseResistance = octopus.amorDecreaseResistance;
        this.criticalHitRate = octopus.criticalHitRate;
        this.criticalResistance = octopus.criticalResistance;
        this.criticalDamage = octopus.criticalDamage;
        this.criticalDamageResistance = octopus.criticalDamageResistance;
        this.controlHit = octopus.controlHit;
        this.controlResistance = octopus.controlResistance;
        this.gridBlock = octopus.gridBlock;
        this.precise = octopus.precise;
    }
}


