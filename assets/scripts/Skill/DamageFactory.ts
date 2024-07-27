import { instantiate, Prefab, resources, Vec3 } from "cc";
import { SkillData } from "../Data/SkillData";
import { Buff } from "./Buff";
import { RES_URL } from "../ResourceUrl";
import { Mediator } from "../Mediator/Mediator";
import { hitAnimation } from "./SkillAnimation/hitAnimation";

export class DamageFactory {
    static showDamage(target:Mediator, damage:number){
        resources.load(RES_URL.damagePrefab, Prefab, (error, prefab)=>{
            if(prefab){
                let damagePrefab = instantiate(prefab);
                if(damagePrefab){
                    let hit = damagePrefab.getComponent(hitAnimation);
                    hit.reverse = target.isDirecationReverse;
                    target.node.addChild(damagePrefab);
                    hit.node.position = new Vec3(hit.node.position.x, 80, 0);
                    hit.showDamage(damage);
                }
            }
        });
    }
}