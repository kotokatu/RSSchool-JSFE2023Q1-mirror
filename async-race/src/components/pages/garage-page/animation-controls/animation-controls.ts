import { Button } from '../../../button/button';
import { BaseComponent } from '../../../base-component';

type AnimationControlsParams = {
    startButtonContent: string;
    stopButtonContent: string;
    onStart: () => void;
    onStop: () => void;
};

export default class AnimationControls extends BaseComponent {
    startBtn: Button;
    stopBtn: Button;
    onStart: () => void;
    onStop: () => void;
    constructor(params: AnimationControlsParams) {
        super({ classNames: ['animation-controls'] });
        this.onStart = params.onStart;
        this.onStop = params.onStop;
        this.startBtn = new Button({
            parent: this,
            classNames: ['button-start'],
            content: params.startButtonContent,
            onClick: () => this.handleStartBtnClick(),
        });
        this.stopBtn = new Button({
            parent: this,
            classNames: ['button-stop'],
            content: params.stopButtonContent,
            onClick: () => this.handleStopBtnClick(),
        });
        this.stopBtn.disable();
    }

    handleStartBtnClick() {
        this.onStart();
    }

    handleStopBtnClick() {
        this.onStop();
    }

    switchButtonsState() {
        this.startBtn.changeState();
        this.stopBtn.changeState();
    }
}
