import { _decorator, Canvas, Component, director, instantiate, log, Node, Prefab, resources, UIOpacity, UITransform, Vec3 } from 'cc';
import { Mediator } from './Mediator/Mediator';
import { Command, CommandQueue } from './Commands/Command';
import { AttackCommand, MainSkillCommand, MoveCommand } from './Commands/ActorCommands';
import { Constants } from './Constants';
import { RES_URL } from './ResourceUrl';
import { CrabMediator } from './Mediator/CrabMediator';
import { PiranhaMediator } from './Mediator/PiranhaMediator';
import { ZhaoYunMediator } from './Mediator/ZhaoYunMediator';
import { LvMengMediator } from './Mediator/LvMengMediator';
import { OctopusMediator } from './Mediator/OctopusMediator';
import { ZhangLiaoMediator } from './Mediator/ZhangLiaoMediator';
import { MainSkillFactory } from './Skill/MainSkillFactory';
const { ccclass, property } = _decorator;

@ccclass('Battle')
export class Battle extends Component {

    @property(Node)
    leftFish1: Node;

    @property(Node)
    leftFish2: Node;

    @property(Node)
    leftFish3: Node;

    @property(Node)
    rightFish1: Node;

    @property(Node)
    rightFish2: Node;

    @property(Node)
    rightFish3: Node;

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

    private _commandLog: Array<Command> = [];
    public get commandLog(): Array<Command> {
        return this._commandLog;
    }

    private _resourceLoaded: number = 0;
    private _allPrefabs: number = 0;
    private _battleNotBegin: boolean = true;

    protected onLoad(): void {
        this._fetchMyFishes();
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

    start() {
        this.loading.opacity = 255;
        this.initMyFishes();
        this.initEnemyFishes();
    }

    initMyFishes() {
        this._allPrefabs = 6;
        let canvas = director.getScene().getComponentInChildren(Canvas);
        let parent = canvas.node.getChildByName('BattleField');
        resources.load(RES_URL.crabActor, Prefab, (error, prefab) => {
            if (prefab) {
                let actor = instantiate(prefab);
                if (actor) {
                    parent.addChild(actor);
                    actor.position = this.leftFish1.position;
                    this.teamLeft.push(actor.getComponent(CrabMediator));
                    this._resourceLoaded++;
                }
            }
        });

        resources.load(RES_URL.zhaoYunActor, Prefab, (error, prefab) => {
            if (prefab) {
                let actor = instantiate(prefab);
                if (actor) {
                    parent.addChild(actor);
                    actor.position = this.leftFish2.position;
                    this.teamLeft.push(actor.getComponent(ZhaoYunMediator));
                    this._resourceLoaded++;
                }
            }
        });

        resources.load(RES_URL.lvMengActor, Prefab, (error, prefab) => {
            if (prefab) {
                let actor = instantiate(prefab);
                if (actor) {
                    parent.addChild(actor);
                    actor.position = this.leftFish3.position;
                    this.teamLeft.push(actor.getComponent(LvMengMediator));
                    this._resourceLoaded++;
                }
            }
        });
    }

    initEnemyFishes() {
        this._allPrefabs = 6;
        let canvas = director.getScene().getComponentInChildren(Canvas);
        let parent = canvas.node.getChildByName('BattleField');

        resources.load(RES_URL.piranhaActor, Prefab, (error, prefab) => {
            if (prefab) {
                let actor = instantiate(prefab);
                if (actor) {
                    parent.addChild(actor);
                    actor.position = this.rightFish1.position;
                    let medaitor = actor.getComponent(PiranhaMediator);
                    medaitor.setDireactionReverse();
                    this.teamRight.push(medaitor);
                    this._resourceLoaded++;
                }
            }
        });

        resources.load(RES_URL.octopusActor, Prefab, (error, prefab) => {
            if (prefab) {
                let actor = instantiate(prefab);
                if (actor) {
                    parent.addChild(actor);
                    actor.position = this.rightFish2.position;
                    let medaitor = actor.getComponent(OctopusMediator);
                    medaitor.setDireactionReverse();
                    this.teamRight.push(medaitor);
                    this._resourceLoaded++;
                }
            }
        });

        resources.load(RES_URL.zhangliaoActor, Prefab, (error, prefab) => {
            if (prefab) {
                let actor = instantiate(prefab);
                if (actor) {
                    parent.addChild(actor);
                    actor.position = this.rightFish3.position;
                    let medaitor = actor.getComponent(ZhangLiaoMediator);
                    medaitor.setDireactionReverse();
                    this.teamRight.push(medaitor);
                    this._resourceLoaded++;
                }
            }
        });
    }

    getAliveActors(team: Array<Mediator>) {
        return team.filter(mediator => mediator.isAlive);
    }

    getNextActor(mediators: Mediator[]) {
        return mediators.find(mediator => mediator.isAlive);
    }

    _getBattleLoopActors(): Mediator[] {
        const allActors = [...this.teamLeft, ...this.teamRight];
        allActors.sort((a, b) => b.actor.speed - a.actor.speed);
        return allActors.filter(mediator => mediator.isAlive);
    }

    isMemeberFromLeft(target: Mediator): boolean {
        return this.teamLeft.some(member => member.actor.uuuId === target.actor.uuuId)
    }

    _battleLoop() {

    }

    canUseSkill(attacker: Mediator): boolean {

        if (attacker.actor.mainSkill) {
            return true;
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
                    const attack = new AttackCommand(attacker, defender);
                    combatCommands.push(moveTo);
                    combatCommands.push(attack);
                    combatCommands.push(moveBack);
                    duration += moveTo.duration;
                    duration += attack.duration;
                    duration += moveBack.duration;
                }
            }

            const commandQueue = new CommandQueue(combatCommands);
            commandQueue.execute();

            this.scheduleOnce(() => {
                const index = actors.indexOf(attacker);
                actors.splice(index, 1);
                if (actors.length === 0) {
                    actors = this._getBattleLoopActors();
                }
                this.runBattle(actors);
            }, duration);
        }
    }

    update(deltaTime: number) {
        if (this._allPrefabs == this._resourceLoaded) {
            if (this._battleNotBegin) {
                this.loading.opacity = 0;
                let loopActors = this._getBattleLoopActors();
                this.runBattle(loopActors);
                this._battleNotBegin = false;
            }
        }
    }
}


