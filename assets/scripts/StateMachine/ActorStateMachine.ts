import { _decorator, Component, Animation, log } from 'cc';
import { Mediator } from '../Mediator/Mediator';
import { MainSkillFactory } from '../Skill/MainSkillFactory';
const { ccclass, property } = _decorator;

// Define the states
export const CharacterState = {
    IDLE: 'idle',
    WALKING: 'walking',
    ATTACKING: 'attacking',
    SHOOTING: 'shooting',
    CASTING: 'casting',
    HURT: 'hurt',
    DYING: 'dying',
    EMPTY: 'empty',
};


@ccclass('ActorStateMichine')
export class ActorStateMichine extends Component {

    @property(Animation)
    animationComponent: Animation = null;

    currentState: string = CharacterState.EMPTY;

    private _mediator: Mediator;
    public get mediator(): Mediator {
        return this._mediator;
    }
    public set mediator(value: Mediator) {
        this._mediator = value;
    }

    start() {

    }

    changeState(newState) {
        if (this.currentState !== newState) {
            this.currentState = newState;
            if (this.currentState != CharacterState.CASTING) {
                this.playAnimationForState(newState);
            }
        }
    }

    getAnimationDuration(state) {
        const animation = this.animationComponent.clips.find(ani => ani.name == state)
        if (animation) {
            return animation.duration;
        } else {
            return this.animationComponent.defaultClip.duration;
        }
    }

    castingMainSkill(target: Mediator) {
        let mainSkill = MainSkillFactory.createMainSkill(this.mediator.actor.mainSkill, this.mediator, [target]);
        mainSkill.useSkill();
    }


    playAnimationForState(state) {
        let clips = this.animationComponent.clips;
        if (clips.filter(clip => clip.name == state).length > 0) {
            this.animationComponent.play(state);
        } else {
            this.animationComponent.play(CharacterState.IDLE);
            log("Cannot find state animation " + state);
        }
    }
}
