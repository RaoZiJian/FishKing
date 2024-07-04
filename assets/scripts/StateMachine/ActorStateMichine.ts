import { _decorator, Component, Animation } from 'cc';
const { ccclass, property } = _decorator;

// Define the states
export const CharacterState = {
    IDLE: 'idle',
    WALKING: 'walking',
    ATTACKING: 'attacking',
    CASTING: 'casting',
    HURT: 'hurt',
    EMPTY: 'empty',
};


@ccclass('ActorStateMichine')
export class ActorStateMichine extends Component {

    @property(Animation)
    animationComponent: Animation = null;

    currentState: string = CharacterState.EMPTY;

    start() {
    }

    changeState(newState) {
        if (this.currentState !== newState) {
            this.currentState = newState;
            this.playAnimationForState(newState);
        }
    }

    getAnimationDuration(state){
        const animation = this.animationComponent.clips.find(ani=>ani.name == state)
        if(animation){
            return animation.duration;
        }
    }

    playAnimationForState(state) {
        this.animationComponent.play(state);
    }
}
