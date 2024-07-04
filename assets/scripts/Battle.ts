import { _decorator, Component, Node } from 'cc';
import { Actor } from './Actors/Actor';
import { Mediator } from './Mediator/Mediator';
import { Command } from './Commands/Command';
const { ccclass, property } = _decorator;

@ccclass('Battle')
export class Battle extends Component {

    @property(Mediator)
    leftFish: Mediator;

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
    }

    initFishes() {
        this.teamLeft.push(this.leftFish);
        this.teamRight.push(this.rightFish);
    }

    getAliveActors(team: Array<Mediator>) {
        return team.filter(mediator => mediator.isAlive);
    }

    getNextActor() {
        const allActors = [...this.teamLeft, ...this.teamRight];
        allActors.sort((a, b) => b.actor.speed - a.actor.speed);
        return allActors.find(mediator => mediator.isAlive);
    }

    isMemeberFromLeft(target:Mediator): boolean {
        return this.teamLeft.some(member=>member.actor.id===target.actor.id)
    }

    _battleLoop() {

    }

    runBattle() {
        while (this.getAliveActors(this.teamLeft).length > 0 && this.getAliveActors(this.teamRight).length > 0) {
            const currentActor = this.getNextActor();
            if(this.isMemeberFromLeft(currentActor)){
                const target = this.getAliveActors(this.teamRight)[0];
                if(target){

                }
            }
        }
    }

    update(deltaTime: number) {

    }
}


