import { _decorator, Canvas, Component, director, instantiate, log, Node, Prefab, resources, UIOpacity, UITransform, Vec3 } from 'cc';
import { Mediator } from './Mediator/Mediator';
import { Command, CommandQueue } from './Commands/Command';
import { MeleeAttackCommand, MainSkillCommand, MoveCommand, RangedAttackCommand, HealCommand } from './Commands/ActorCommands';
import { AttackType, Constants } from './Constants';
import { RES_URL } from './ResourceUrl';
import { CrabMediator } from './Mediator/CrabMediator';
import { PiranhaMediator } from './Mediator/PiranhaMediator';
import { ZhaoYunMediator } from './Mediator/ZhaoYunMediator';
import { LvMengMediator } from './Mediator/LvMengMediator';
import { OctopusMediator } from './Mediator/OctopusMediator';
import { ZhangLiaoMediator } from './Mediator/ZhangLiaoMediator';
import { MainSkillFactory } from './Skill/MainSkillFactory';
import { HuangZhongMediator } from './Mediator/HuangZhongMediator';
import { XiaoQiaoMediator } from './Mediator/XiaoQiaoMediator';
import GameTsCfg from './Data/export/client/GameTsCfg';
import { Utils } from './Utils';
const { ccclass, property } = _decorator;

@ccclass('Battle')
export class Battle extends Component {

    @property({ type: [Node] })
    rightFishs: Node[] = [];

    @property({ type: [Node] })
    leftFishs: Node[] = [];

    @property(UIOpacity)
    loading: UIOpacity;

    private _teamLeft: Array<Mediator> = [];
    public get teamLeft(): Array<Mediator> {
        return this._teamLeft;
    }
    public set teamLeft(value: Array<Mediator>) {
        this._teamLeft = value;
    }

    private _teamRight: Array<Mediator> = [];
    public get teamRight(): Array<Mediator> {
        return this._teamRight;
    }
    public set teamRight(value: Array<Mediator>) {
        this._teamRight = value;
    }

    private _resourceLoaded: number = 0;
    private _allPrefabs: number = 0;
    private _battleNotBegin: boolean = true;

    protected onLoad(): void {
        this._fetchMyFishes();
        this._fetchCurrentStage();
    }

    private _currentStage: number;
    public get currentStage(): number {
        return this._currentStage;
    }
    public set currentStage(value: number) {
        this._currentStage = value;
    }


    _fetchMyFishes() {
        // 从服务器拉取数据，目前使用假数据
        // fetch("http://127.0.0.1:8080").then((response: Response) => {
        //     if(response){
        //         this.initMyFishes();
        //     }
        // }).then((value) => {
        //     console.log(value);
        // })
    }

    _fetchCurrentStage() {
        // 从服务器拉取数据，目前使用假数据
        // fetch("http://127.0.0.1:8080").then((response: Response) => {
        //     if(response){
        //         this.currentStage = response.currentStage;
        //     }
        // }).then((value) => {
        //     console.log(value);
        // })
    }

    start() {
        this.loading.opacity = 255;
        this.currentStage = 1;
        this.initMyFishes();
        this.initEnemyFishes();
    }

    initMyFishes() {
        resources.load(RES_URL.huangzhongActor, Prefab, (error, prefab) => {
            if (prefab) {
                let actor = instantiate(prefab);
                if (actor) {
                    this.node.addChild(actor);
                    actor.position = this.leftFishs[0].position;
                    this.teamLeft.push(actor.getComponent(HuangZhongMediator));
                    this._resourceLoaded++;
                }
            }
        });

        resources.load(RES_URL.crabActor, Prefab, (error, prefab) => {
            if (prefab) {
                let actor = instantiate(prefab);
                if (actor) {
                    this.node.addChild(actor);
                    actor.position = this.leftFishs[1].position;
                    this.teamLeft.push(actor.getComponent(CrabMediator));
                    this._resourceLoaded++;
                }
            }
        });

        resources.load(RES_URL.zhaoYunActor, Prefab, (error, prefab) => {
            if (prefab) {
                let actor = instantiate(prefab);
                if (actor) {
                    this.node.addChild(actor);
                    actor.position = this.leftFishs[2].position;
                    this.teamLeft.push(actor.getComponent(ZhaoYunMediator));
                    this._resourceLoaded++;
                }
            }
        });

        resources.load(RES_URL.lvMengActor, Prefab, (error, prefab) => {
            if (prefab) {
                let actor = instantiate(prefab);
                if (actor) {
                    this.node.addChild(actor);
                    actor.position = this.leftFishs[3].position;
                    this.teamLeft.push(actor.getComponent(LvMengMediator));
                    this._resourceLoaded++;
                }
            }
        });

        resources.load(RES_URL.xiaoqiaoActor, Prefab, (error, prefab) => {
            if (prefab) {
                let actor = instantiate(prefab);
                if (actor) {
                    this.node.addChild(actor);
                    actor.position = this.leftFishs[4].position;
                    this.teamLeft.push(actor.getComponent(XiaoQiaoMediator));
                    this._resourceLoaded++;
                }
            }
        });
    }

    initEnemyFishes() {
        const stageCfg = GameTsCfg.stage[this.currentStage];
        const actorIds = Utils.parseString(stageCfg.actors);

        for (let index = 0; index < actorIds.length; index++) {
            const id = actorIds[index];
            const url = GameTsCfg.actor[id]?.prefab;
            if (url) {
                resources.load(url, Prefab, (error, prefab) => {
                    if (prefab) {
                        let actor = instantiate(prefab);
                        if (actor) {
                            this.node.addChild(actor);
                            actor.position = this.rightFishs[index].position;
                            let medaitor = actor.getComponent(Mediator);
                            medaitor.setDireactionReverse();
                            this.teamRight.push(medaitor);
                            this._resourceLoaded++;
                        }
                    }
                });
            }
        }

        this._allPrefabs = 5 + actorIds.length;
    }

    getAliveActors(team: Array<Mediator>) {
        return team.filter(mediator => mediator.isAlive);
    }

    getNextActor(mediators: Mediator[]) {
        return mediators.find(mediator => mediator.isAlive);
    }

    getLowestHPActor(medaitors: Mediator[]): Mediator {
        let sortActors = medaitors.sort((a, b) => (a.actor.hp / a.actor.cfg.hp) - (b.actor.hp / b.actor.cfg.hp));
        return sortActors[0];
    }

    removeDeadActors(targets: Mediator[]): Mediator[] {
        targets.sort((a, b) => b.actor.speed - a.actor.speed);
        return targets.filter(mediator => mediator.isAlive);
    }

    isMemeberFromLeft(target: Mediator): boolean {
        return this.teamLeft.some(member => member.actor.uuuId === target.actor.uuuId)
    }

    _battleLoop() {

    }

    canUseSkill(attacker: Mediator): boolean {
        if (attacker.actor.mainSkill) {
            if (attacker.actor.rage >= attacker.actor.mainSkill.RageCost) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }


    sortAliveActorByTaunt(team: Array<Mediator>) {
        let aliveActors = this.getAliveActors(team);
        return aliveActors.sort((a, b) => { return b.actor.taunt - a.actor.taunt });
    }

    runBattle(actors: Mediator[]) {
        let duration = 0;
        let leftAliveActors = this.getAliveActors(this.teamLeft);
        let rightAliveActors = this.getAliveActors(this.teamRight);

        if (leftAliveActors.length > 0 && rightAliveActors.length > 0) {
            let combatCommands = [];
            const attacker = this.getNextActor(actors);
            const isLeft = this.isMemeberFromLeft(attacker);
            let defender: Mediator = null;
            if (isLeft) {
                defender = this.sortAliveActorByTaunt(rightAliveActors)[0];
            } else {
                defender = this.sortAliveActorByTaunt(leftAliveActors)[0];
            }
            if (attacker && defender) {

                const beginPos = new Vec3(attacker.node.position);
                const targetPos = attacker.node.parent.getComponent(UITransform).convertToNodeSpaceAR(defender.node.worldPosition);

                let x = targetPos.x - defender.getComponent(UITransform).contentSize.width;
                if (!isLeft) {
                    x = targetPos.x + defender.getComponent(UITransform).contentSize.width
                }
                const y = targetPos.y
                let moveTo = new MoveCommand(attacker, new Vec3(x, y, 0), Constants.AttakingWalkTime);
                let moveBack = new MoveCommand(attacker, beginPos, Constants.AttakingWalkTime);

                if (this.canUseSkill(attacker)) {
                    let mainSkillData = attacker.actor.mainSkill;
                    //是否是对自己释放，不需要移动意味着对自己释放
                    if (!mainSkillData.NeedMove) {
                        let mainSkill = MainSkillFactory.createMainSkill(mainSkillData, attacker, [attacker]);
                        let skillCommand = new MainSkillCommand(mainSkill);
                        duration += skillCommand.duration;
                        combatCommands.push(skillCommand);
                    } else {
                        duration += moveTo.duration;
                        combatCommands.push(moveTo);
                        let mainSkill = null;
                        if (isLeft) {
                            mainSkill = MainSkillFactory.createMainSkill(mainSkillData, attacker, rightAliveActors);
                        } else {
                            mainSkill = MainSkillFactory.createMainSkill(mainSkillData, attacker, leftAliveActors);
                        }
                        let skillCommand = new MainSkillCommand(mainSkill);
                        duration += skillCommand.duration;
                        combatCommands.push(skillCommand);

                        duration += moveBack.duration;
                        combatCommands.push(moveBack);
                    }
                } else {
                    if (attacker.actor.attackType == AttackType.MeleeAttack) {
                        const attack = new MeleeAttackCommand(attacker, defender);
                        combatCommands.push(moveTo);
                        combatCommands.push(attack);
                        combatCommands.push(moveBack);
                        duration += moveTo.duration;
                        duration += attack.duration;
                        duration += moveBack.duration;
                    } else if (attacker.actor.attackType == AttackType.RangedAttack) {
                        let shouldReverse = false;
                        if (isLeft) {
                            shouldReverse = true;
                        }
                        const shooting = new RangedAttackCommand(attacker, defender, RES_URL.hzArrow, shouldReverse);
                        duration += shooting.duration;
                        combatCommands.push(shooting);
                    } else {
                        let lowestHPActor: Mediator = null;
                        if (isLeft) {
                            lowestHPActor = this.getLowestHPActor(leftAliveActors);
                        } else {
                            lowestHPActor = this.getLowestHPActor(rightAliveActors);
                        }

                        const heal = new HealCommand(attacker, lowestHPActor);
                        duration += heal.duration;
                        combatCommands.push(heal);
                    }
                }
            }

            const commandQueue = new CommandQueue(combatCommands);
            commandQueue.execute();

            this.scheduleOnce(() => {
                actors = actors.filter((element) => element.actor.uuuId !== attacker.actor.uuuId);
                actors = this.removeDeadActors(actors);
                this.teamLeft = this.removeDeadActors(this.teamLeft);
                this.teamRight = this.removeDeadActors(this.teamRight);
                if (actors.length === 0) {
                    const allActors = [...this.teamLeft, ...this.teamRight];
                    actors = this.removeDeadActors(allActors);
                }
                this.runBattle(actors);
            }, duration);
        }
    }

    update(deltaTime: number) {
        if (this._allPrefabs == this._resourceLoaded) {
            if (this._battleNotBegin) {
                this.loading.opacity = 0;
                this.runBattle(this.removeDeadActors([...this.teamLeft, ...this.teamRight]));
                this._battleNotBegin = false;
            }
        }
    }
}


