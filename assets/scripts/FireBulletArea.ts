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
                }
            });
        }, this);
    }

    update(deltaTime: number) {

    }
}

