import { _decorator, Component, instantiate, Node, NodeEventType, Prefab, resources, UITransform, Vec3 } from 'cc';
import { RES_URL } from './ResourceUrl';
import { CommandQueue, FireBulletCommand } from './Commands/Command';
import { AttackCommand, MoveCommand } from './Commands/ActorCommands';
import { CrabStateMachine } from './StateMachine/CrabStateMachine';
import { CrabMediator } from './Mediator/CrabMediator';
import { PiranhaMediator } from './Mediator/PiranhaMediator';
const { ccclass, property } = _decorator;

@ccclass('FireBulletArea')
export class FireBulletArea extends Component {

    @property({ type: Node })
    leftFish: Node;

    @property({ type: Node })
    rightFish: Node;

    start() {
        this.node.on(NodeEventType.MOUSE_DOWN, (event) => {
            resources.load(RES_URL.clickBullet, Prefab, (error, prefab) => {
                let bulletNode = instantiate(prefab);
                bulletNode = instantiate(prefab);
                this.node.addChild(bulletNode);

                if (bulletNode) {
                    bulletNode.active = true;
                    const bulletCommand = new FireBulletCommand(event.getUILocation(), this.rightFish, bulletNode);
                    bulletCommand.execute();

                    const crabMediator = this.leftFish.getComponent(CrabMediator);
                    const piranhaMedaitor = this.rightFish.getComponent(PiranhaMediator);
                    const beginPos = new Vec3(crabMediator.node.position);

                    const targetPos = this.rightFish.parent.getComponent(UITransform).convertToNodeSpaceAR(this.rightFish.worldPosition);
                    const x = targetPos.x - this.rightFish.getComponent(UITransform).contentSize.width * Math.abs(this.rightFish.scale.x);
                    const y = targetPos.y
                    
                    const moveTo = new MoveCommand(crabMediator, new Vec3(x, y, 0));
                    const attack = new AttackCommand(crabMediator, piranhaMedaitor);
                    const moveBack = new MoveCommand(crabMediator, beginPos);
                    const commandQueue = new CommandQueue([moveTo, attack, moveBack]);
                    commandQueue.execute();
                }
            });
        }, this);
    }

    update(deltaTime: number) {

    }
}


