import { director, instantiate, Prefab, resources, Vec3 } from "cc";
import { RES_URL } from "../ResourceUrl";
import { Mediator } from "../Mediator/Mediator";
import { hitAnimation } from "./SkillAnimation/hitAnimation";

export class DamageFactory {
    static showDamage(target: Mediator, damage: number) {
        resources.load(RES_URL.damagePrefab, Prefab, (error, prefab) => {
            if (prefab) {
                let damagePrefab = instantiate(prefab);
                if (damagePrefab) {
                    let hit = damagePrefab.getComponent(hitAnimation);
                    const canvas = director.getScene().getChildByName('Canvas');
                    canvas.addChild(damagePrefab);
                    hit.node.worldPosition = new Vec3(target.node.worldPosition.x, target.node.worldPosition.y + 80, 0);
                    hit.showDamage(damage);
                }
            }
        });
    }
}