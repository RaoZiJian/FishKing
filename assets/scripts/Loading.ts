import { _decorator, Component, UIOpacity } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Loading')
export class Loading extends Component {

    @property({ type: UIOpacity })
    opacity: UIOpacity;

    start() {
        this.opacity.opacity = 0;
    }

    update(deltaTime: number) {

    }
}


