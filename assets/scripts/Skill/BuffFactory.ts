import { SkillData } from "../Data/SkillData";
import { Buff } from "./Buff";
import { TauntBuff } from "./TauntBuff";

export class BuffFactory {
    static createBuff(skillData: SkillData): Buff {
        switch (skillData.Id) {
            default:
                break;
        }

        return null;
    }
}


