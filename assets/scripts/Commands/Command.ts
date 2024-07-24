import { director, Node, Vec3, Animation, log } from 'cc';
import { ClickBullet } from '../ClickBullet';


export class Command {

    private _isFinished = false;
    public get isFinished() {
        return this._isFinished;
    }
    public set isFinished(value) {
        this._isFinished = value;
    }


    private _duration: number = 0;
    /**
     * 命令持续时间
     */
    public get duration(): number {
        return this._duration;
    }
    public set duration(value: number) {
        this._duration = value;
    }

    public onComplete?: () => void;

    execute(): void {

    }

    protected complete(): void {
        this.isFinished = true;
        if (this.onComplete) {
            this.onComplete();
        }
    }

}

export class CommandQueue {
    private commands: Command[];
    private currentCommandIndex: number = 0;

    constructor(commands: Command[]) {
        this.commands = commands;
    }

    addCommand(command: Command) {
        if (command) {
            this.commands.push(command);
        }
    }

    execute(): void {
        this._executeNextCommand();
    }

    private _executeNextCommand(): void {
        if (this.currentCommandIndex < this.commands.length) {
            const command = this.commands[this.currentCommandIndex];
            command.onComplete = () => {
                this.currentCommandIndex++;
                this._executeNextCommand();
            };
            command.execute();
        }
    }
}

export class FireBulletCommand extends Command {
    private _start: Vec3;
    public get start(): Vec3 {
        return this._start;
    }
    public set start(value: Vec3) {
        this._start = value;
    }

    private _end: Node;
    public get end(): Node {
        return this._end;
    }
    public set end(value: Node) {
        this._end = value;
    }

    private _bullet: Node;
    public get bullet(): Node {
        return this._bullet;
    }
    public set bullet(value: Node) {
        this._bullet = value;
    }

    constructor(start: Vec3, end: Node, bullet: Node) {
        super();
        this.start = start;
        this.end = end;
        this.bullet = bullet;
        this.duration = 0;
    }

    execute(): void {
        let clickBullet = this.bullet.getComponent(ClickBullet);
        if (clickBullet) {
            clickBullet.fire(this.start, this.end);
        }
        this.complete();
    }
}

export class FireBulletExplodeCommand extends Command {

    private _location: Vec3;
    node: any;
    public get location(): Vec3 {
        return this._location;
    }
    public set location(value: Vec3) {
        this._location = value;
    }

    private _explosion: Node;
    public get explosion(): Node {
        return this._explosion;
    }
    public set explosion(value: Node) {
        this._explosion = value;
    }

    constructor(location: Vec3, bomb: Node) {
        super();
        this.location = location;
        this.explosion = bomb;
        this.duration = this.explosion.getComponent(Animation).defaultClip.duration;
    }

    execute(): void {
        let canvas = director.getScene().getChildByName('Canvas');
        canvas.addChild(this.explosion);
        this.explosion.worldPosition = this.location;
        let ani = this.explosion.getComponent(Animation);
        ani.play('bulletExplode');
        let aniState = ani.getState('bulletExplode');
        aniState.on('stop', (event) => {
            this.explosion.destroy();
        }, this);
        this.complete();
    }
}