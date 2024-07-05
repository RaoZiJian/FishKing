export class ActorId {

    static _id: number = 0;

    static generateActorId(): number {

        this._id++;
        return this._id;
    }
}

export class Actor {

    /**
     * 从表里读取和初始化数据
     */
    public fetchActor(): void {
    }

    /**
     * ID
     */
    private _id: number = -1;
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    /**
     * 名称
     */
    private _name: string = '';
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    /**
     * 攻击前摇时间 单位秒
     */
    private _attackShake: number = 0.1;
    public get attackShake(): number {
        return this._attackShake;
    }
    public set attackShake(value: number) {
        this._attackShake = value;
    }

    /**
     * 攻击后摇时间 单位秒
     */
    private _attackAfterShake: number = 0.1;
    public get attackAfterShake(): number {
        return this._attackAfterShake;
    }
    public set attackAfterShake(value: number) {
        this._attackAfterShake = value;
    }


    /**
     * 攻击力
     */
    private _attack: number = 0;
    public get attack(): number {
        return this._attack;
    }
    public set attack(value: number) {
        this._attack = value;
    }

    /**
     * 血量
     */
    private _hp: number = 100;
    public get hp(): number {
        return this._hp;
    }
    public set hp(value: number) {
        this._hp = value;
    }

    /**
     * 怒气值
     */
    private _rage: number = 100;
    public get rage(): number {
        return this._rage;
    }
    public set rage(value: number) {
        this._rage = value;
    }


    /**
     * 防御
     */
    private _defense: number = 0;
    public get defense(): number {
        return this._defense;
    }
    public set defense(value: number) {
        this._defense = value;
    }

    /**
     * 速度
     */
    private _speed: number = 0;
    public get speed(): number {
        return this._speed;
    }
    public set speed(value: number) {
        this._speed = value;
    }

    /**
     * 增伤
     */
    private _damageIncrease: number = 0;
    public get damageIncrease(): number {
        return this._damageIncrease;
    }
    public set damageIncrease(value: number) {
        this._damageIncrease = value;
    }

    /**
     * 减伤
     */
    private _damageDecrease: number = 0;
    public get damageDecrease(): number {
        return this._damageDecrease;
    }
    public set damageDecrease(value: number) {
        this._damageDecrease = value;
    }

    /**
     * 技能伤害
     */
    private _skillDamage: number = 0;
    public get skillDamage(): number {
        return this._skillDamage;
    }
    public set skillDamage(value: number) {
        this._skillDamage = value;
    }

    /**
     * 技能减伤
     */
    private _skillDecrease: number = 0;
    public get skillDecrease(): number {
        return this._skillDecrease;
    }
    public set skillDecrease(value: number) {
        this._skillDecrease = value;
    }

    /**
     * 破甲
     */
    private _amorDecrease: number = 0;
    public get amorDecrease(): number {
        return this._amorDecrease;
    }
    public set amorDecrease(value: number) {
        this._amorDecrease = value;
    }

    /**
     * 破甲抵抗
     */
    private _amorDecreaseResistance: number = 0;
    public get amorDecreaseResistance(): number {
        return this._amorDecreaseResistance;
    }
    public set amorDecreaseResistance(value: number) {
        this._amorDecreaseResistance = value;
    }

    /**
     * 暴击
     */
    private _criticalHitRate: number = 0;
    public get criticalHitRate(): number {
        return this._criticalHitRate;
    }
    public set criticalHitRate(value: number) {
        this._criticalHitRate = value;
    }

    /**
     * 暴击抵抗
     */
    private _criticalResistance: number = 0;
    public get criticalResistance(): number {
        return this._criticalResistance;
    }
    public set criticalResistance(value: number) {
        this._criticalResistance = value;
    }


    /**
     * 暴击伤害
     */
    private _criticalDamage: number = 0;
    public get criticalDamage(): number {
        return this._criticalDamage;
    }
    public set criticalDamage(value: number) {
        this._criticalDamage = value;
    }

    /**
     * 暴击伤害抵抗
     */
    private _criticalDamageResistance: number = 0;
    public get criticalDamageResistance(): number {
        return this._criticalDamageResistance;
    }
    public set criticalDamageResistance(value: number) {
        this._criticalDamageResistance = value;
    }


    /**
     * 控制命中
     */
    private _controlHit: number = 0;
    public get controlHit(): number {
        return this._controlHit;
    }
    public set controlHit(value: number) {
        this._controlHit = value;
    }

    /**免控
     * 
     */
    private _controlResistance: number = 0;
    public get controlResistance(): number {
        return this._controlResistance;
    }
    public set controlResistance(value: number) {
        this._controlResistance = value;
    }

    /**
     * 格挡
     */
    private _gridBlock: number = 0;
    public get gridBlock(): number {
        return this._gridBlock;
    }
    public set gridBlock(value: number) {
        this._gridBlock = value;
    }

    /**
     * 精准
     */
    private _precise: number = 0;
    public get precise(): number {
        return this._precise;
    }
    public set precise(value: number) {
        this._precise = value;
    }
}