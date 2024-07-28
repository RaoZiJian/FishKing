import { log } from "cc";
import { Mediator } from "../Mediator/Mediator";
import { JumpHitSkill, SkillData, TauntSkill } from "./MainSkill";

export class MainSkillFactory {
    static createMainSkill(skill: SkillData, caster: Mediator, targets: Mediator[]) {
        switch (skill.Id) {
            case 1:
                return new TauntSkill(skill, caster);
                break;
            case 2:
                return new JumpHitSkill(skill, caster, targets);
            default:
                log("can not find this skill " + skill.Id);
                return null;
        }
    }
}