// skillData.ts
export interface SkillData {
    Id: number;
    Name: string;
    Animation: string;
    CoolDown: number;
    Value: number[];
    NeedMove: boolean;
}

/**
 * 模拟嘲讽技能表导出
 */
export const skillDataList: SkillData[] = [
    {
        Id: 10001,
        Name: "Taunt",
        Animation: "taunt",
        CoolDown: 5,
        Value: [10],
        NeedMove: false
    },
    {
        Id: 10002,
        Name: "JumpHit",
        Animation: "jump_hit_animation",
        CoolDown: 3,
        Value: [],
        NeedMove: true
    }
];
