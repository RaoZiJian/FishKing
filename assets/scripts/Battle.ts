import { _decorator, Component, log, Node, UITransform, Vec3 } from 'cc';
import { Actor } from './Actors/Actor';
import { Mediator } from './Mediator/Mediator';
import { Command, CommandQueue } from './Commands/Command';
import { AttackCommand, MoveCommand } from './Commands/ActorCommands';
import { Constants } from './Constants';
const { ccclass, property } = _decorator;

@ccclass('Battle')
export class Battle extends Component {

    @property(Mediator)
    leftFish: Mediator;

    @property(Mediator)
    leftFish2: Mediator;

    @property(Mediator)
    rightFish: Mediator;

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

    start() {
        this.initFishes();
        setTimeout(() => {
            let loopActors = this._getBattleLoopActors();
            this.runBattle(loopActors);
        }, 1000)
    }

    initFishes() {
        this.teamLeft.push(this.leftFish);
        this.teamLeft.push(this.leftFish2);
        this.teamRight.push(this.rightFish);
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
        return this.teamLeft.some(member => member.actor.id === target.actor.id)
    }

    _battleLoop() {

    }

    runBattle(actors: Mediator[]) {
        let duration = 0;
        let leftAliveActors = this.getAliveActors(this.teamLeft);
        let rightAliveActors = this.getAliveActors(this.teamRight);

        if (leftAliveActors.length > 0 && rightAliveActors.length > 0) {
            let combatCommands = [];
            const attacker = this.getNextActor(actors);
            let defender: Mediator = null;
            const isLeft = this.isMemeberFromLeft(attacker);
            if (isLeft) {
                defender = rightAliveActors[0];
            } else {
                defender = leftAliveActors[0];
            }

            if (attacker && defender) {

                const beginPos = new Vec3(attacker.node.position);
                const targetPos = attacker.node.parent.getComponent(UITransform).convertToNodeSpaceAR(defender.node.worldPosition);

                let x = targetPos.x - defender.getComponent(UITransform).contentSize.width;
                if (!isLeft) {
                    x = targetPos.x + defender.getComponent(UITransform).contentSize.width
                }
                const y = targetPos.y

                const moveTo = new MoveCommand(attacker, new Vec3(x, y, 0), Constants.AttakingWalkTime);
                const attack = new AttackCommand(attacker, defender);
                const moveBack = new MoveCommand(attacker, beginPos, Constants.AttakingWalkTime);
                combatCommands.push(moveTo);
                combatCommands.push(attack);
                combatCommands.push(moveBack);
                const commandQueue = new CommandQueue(combatCommands);
                commandQueue.execute();

                duration += (moveTo.duration + attack.duration + moveBack.duration) * 1000;

                setTimeout(() => {
                    const index = actors.indexOf(attacker);
                    actors.splice(index, 1);
                    if (actors.length === 0) {
                        actors = this._getBattleLoopActors();
                    }
                    this.runBattle(actors);
                }, duration);
            }
        }
    }

    update(deltaTime: number) {

    }
}


