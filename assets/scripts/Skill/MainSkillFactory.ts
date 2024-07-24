import { log } from "cc";
import { SkillData } from "../Data/SkillData";
import { Mediator } from "../Mediator/Mediator";
import { JumpHitSkill, TauntSkill } from "./MainSkill";

export class MainSkillFactory {
    static createMainSkill(skill: SkillData, caster: Mediator, targets: Mediator[]) {
        switch (skill.Id) {
            case 10001:
                return new TauntSkill(skill, caster);
                break;
            case 10002:
                return new JumpHitSkill(skill, caster, targets);
            default:
                log("can not find this skill " + skill.Id);
                return null;
        }
    }
}